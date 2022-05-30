import { DDO } from '../ddo/DDO'
import defaultDDOContractABI from '@oceanprotocol/contracts/artifacts/Metadata.json'
import { didZeroX, getFairGasPrice, setContractDefaults } from '../utils'
// Using limited, compress-only version
// See https://github.com/LZMA-JS/LZMA-JS#but-i-dont-want-to-use-web-workers
import { LZMA } from 'lzma/src/lzma-c'
/**
 * Provides an interface with Metadata Cache.
 * Metadata Cache provides an off-chain database store for metadata about data assets.
 */
export class OnChainMetadata {
  GASLIMIT_DEFAULT = 1000000
  DDOContractAddress
  DDOContractABI
  web3
  DDOContract = null
  logger
  metadataCache
  config
  /**
   * Instantiate OnChainMetadata Store for on-chain interaction.
   */
  constructor(
    web3,
    logger,
    DDOContractAddress = null,
    DDOContractABI = null,
    metadataCache,
    config
  ) {
    this.web3 = web3
    this.config = config
    this.DDOContractAddress = DDOContractAddress
    this.DDOContractABI = DDOContractABI || defaultDDOContractABI.abi
    if (web3)
      this.DDOContract = setContractDefaults(
        new this.web3.eth.Contract(
          this.DDOContractABI,
          this.DDOContractAddress
        ),
        this.config
      )
    this.logger = logger
    this.metadataCache = metadataCache
  }
  /**
   * Compress DDO using xz/lzma2
   */
  async compressDDO(data) {
    // see https://github.com/LZMA-JS/LZMA-JS/issues/44
    LZMA.disableEndMark = true
    const compressed = LZMA.compress(data, 9)
    // return this.getHex(compressed)
    return compressed
  }
  /**
   * Publish a new DDO
   * @param {String} did
   * @param {DDO} ddo
   * @param {String} consumerAccount
   * @param {Boolean} encrypt If the DDO should be encrypted
   * @param {Boolean} validate If the DDO should be validated against Aqua prior to publish
   * @return {Promise<TransactionReceipt>} exchangeId
   */
  async publish(did, ddo, consumerAccount, encrypt = false, validate = true) {
    if (validate) {
      const valid = await this.metadataCache.validateMetadata(ddo)
      if (!valid.valid) {
        throw new Error(`DDO has failed validation`)
      }
    }
    const rawData = await this.prepareRawData(ddo, encrypt)
    if (!rawData) {
      throw new Error(`Could not prepare raw data for publish`)
    } else
      return this.publishRaw(
        didZeroX(did),
        rawData.flags,
        rawData.data,
        consumerAccount
      )
  }
  /**
   * Update DDO
   * @param {String} did
   * @param {DDO} ddo
   * @param {String} consumerAccount
   * @param {Boolean} encrypt If the DDO should be encrypted
   * @param {Boolean} validate If the DDO should be validated against Aqua prior to publish
   * @return {Promise<TransactionReceipt>} exchangeId
   */
  async update(did, ddo, consumerAccount, encrypt = false, validate = true) {
    if (validate) {
      const valid = await this.metadataCache.validateMetadata(ddo)
      if (!valid.valid) {
        throw new Error(`DDO has failed validation`)
      }
    }
    const rawData = await this.prepareRawData(ddo, encrypt)
    if (!rawData) {
      throw new Error(`Could not prepare raw data for udate`)
    } else
      return this.updateRaw(
        didZeroX(did),
        rawData.flags,
        rawData.data,
        consumerAccount
      )
  }
  /**
   * Prepare onchain data
   * @param {Any} ddo
   * @param {Boolean} encrypt Should encrypt the ddo
   * @return {Promise<rawMetadata>} Raw metadata bytes
   */
  async prepareRawData(ddo, encrypt = false) {
    let flags = 0
    let data = DDO.serialize(ddo)
    if (encrypt === false) {
      data = await this.compressDDO(data)
      flags = flags | 1
      data = this.getHex(data)
    } else {
      data = await this.metadataCache.encryptDDO(data)
      if (!data) return null
      flags = flags | 2
    }
    return { flags, data }
  }
  /**
   * Raw publish ddo
   * @param {String} did
   * @param {Any} flags
   * @param {Any} ddo
   * @param {String} consumerAccount
   * @return {Promise<TransactionReceipt>} exchangeId
   */
  async publishRaw(did, flags, data, consumerAccount) {
    if (!this.DDOContract) {
      this.logger.error('ERROR: Missing DDOContract')
      return null
    }
    const gasLimitDefault = this.GASLIMIT_DEFAULT
    let estGas
    try {
      estGas = await this.DDOContract.methods
        .create(didZeroX(did), flags, data)
        .estimateGas({ from: consumerAccount }, (err, estGas) =>
          err ? gasLimitDefault : estGas
        )
    } catch (e) {
      estGas = gasLimitDefault
    }
    try {
      const trxReceipt = await this.DDOContract.methods
        .create(didZeroX(did), flags, data)
        .send({
          from: consumerAccount,
          gas: estGas + 1,
          gasPrice: await getFairGasPrice(this.web3, this.config)
        })
      return trxReceipt
    } catch (e) {
      this.logger.error(`ERROR: Failed to publish raw DDO : ${e.message}`)
      return null
    }
  }
  /**
   * Raw update of a ddo
   * @param {String} did
   * @param {Any} flags
   * @param {Any} ddo
   * @param {String} consumerAccount
   * @return {Promise<TransactionReceipt>} exchangeId
   */
  async updateRaw(did, flags, data, consumerAccount) {
    if (!this.DDOContract) {
      this.logger.error('ERROR: Missing DDOContract')
      return null
    }
    const gasLimitDefault = this.GASLIMIT_DEFAULT
    let estGas
    try {
      estGas = await this.DDOContract.methods
        .update(didZeroX(did), flags, data)
        .estimateGas({ from: consumerAccount }, (err, estGas) =>
          err ? gasLimitDefault : estGas
        )
    } catch (e) {
      estGas = gasLimitDefault
    }
    try {
      const trxReceipt = await this.DDOContract.methods
        .update(didZeroX(did), flags, data)
        .send({
          from: consumerAccount,
          gas: estGas + 1,
          gasPrice: await getFairGasPrice(this.web3, this.config)
        })
      return trxReceipt
    } catch (e) {
      this.logger.error(`ERROR: Failed to update raw DDO : ${e.message}`)
      return null
    }
  }
  /**
   * Transfer Ownership of a DDO
   * @param {String} did
   * @param {String} newOwner
   * @param {String} consumerAccount
   * @return {Promise<TransactionReceipt>} exchangeId
   */
  async transferOwnership(did, newOwner, consumerAccount) {
    if (!this.DDOContract) return null
    try {
      const trxReceipt = await this.DDOContract.methods
        .transferOwnership(didZeroX(did), newOwner)
        .send({
          from: consumerAccount
        })
      return trxReceipt
    } catch (e) {
      this.logger.error(
        `ERROR: Failed to transfer DDO ownership : ${e.message}`
      )
      return null
    }
  }
  getHex(message) {
    const hexChar = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F'
    ]
    let hex = ''
    try {
      for (let i = 0; i < message.length; i++) {
        hex +=
          '' + hexChar[(message[i] >> 4) & 0x0f] + hexChar[message[i] & 0x0f]
      }
    } catch (e) {
      this.logger.error(`ERROR: Failed to get hex message value : ${e.message}`)
    }
    const hexMessage = '0x' + hex
    return hexMessage
  }
}
//# sourceMappingURL=OnChainMetaData.js.map
