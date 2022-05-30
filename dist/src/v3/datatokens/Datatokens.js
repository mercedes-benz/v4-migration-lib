import defaultFactoryABI from '@oceanprotocol/contracts/artifacts/DTFactory.json'
import defaultDatatokensABI from '@oceanprotocol/contracts/artifacts/DataTokenTemplate.json'
import { getFairGasPrice, setContractDefaults } from '../utils'
import BigNumber from 'bignumber.js'
import Decimal from 'decimal.js'
import { generateDatatokenName } from '../utils/Datatokens'
/**
 * Provides an interface to DataTokens
 */
export class DataTokens {
  GASLIMIT_DEFAULT = 1000000
  factoryAddress
  factoryABI
  datatokensABI
  web3
  logger
  startBlock
  config
  /**
   * Instantiate DataTokens (independently of Ocean).
   * @param {String} factoryAddress
   * @param {AbiItem | AbiItem[]} factoryABI
   * @param {AbiItem | AbiItem[]} datatokensABI
   * @param {Web3} web3
   */
  constructor(factoryAddress, factoryABI, datatokensABI, web3, logger, config) {
    this.factoryAddress = factoryAddress
    this.factoryABI = factoryABI || defaultFactoryABI.abi
    this.datatokensABI = datatokensABI || defaultDatatokensABI.abi
    this.web3 = web3
    this.logger = logger
    this.config = config
    this.startBlock = (config && config.startBlock) || 0
  }
  /**
   * Generate new datatoken name & symbol from a word list
   * @return {<{ name: String; symbol: String }>} datatoken name & symbol. Produces e.g. "Endemic Jellyfish Token" & "ENDJEL-45"
   */
  generateDtName(wordList) {
    const { name, symbol } = generateDatatokenName(wordList)
    return { name, symbol }
  }
  /**
   * Create new datatoken
   * @param {String} metadataCacheUri
   * @param {String} address
   * @param {String} cap Maximum cap (Number) - will be converted to wei
   * @param {String} name Token name
   * @param {String} symbol Token symbol
   * @return {Promise<string>} datatoken address
   */
  async create(metadataCacheUri, address, cap, name, symbol) {
    if (!cap) cap = '1000'
    // Generate name & symbol if not present
    if (!name || !symbol) {
      ;({ name, symbol } = this.generateDtName())
    }
    // Create factory contract object
    const factory = setContractDefaults(
      new this.web3.eth.Contract(this.factoryABI, this.factoryAddress, {
        from: address
      }),
      this.config
    )
    const gasLimitDefault = this.GASLIMIT_DEFAULT
    let estGas
    try {
      estGas = await factory.methods
        .createToken(metadataCacheUri, name, symbol, this.web3.utils.toWei(cap))
        .estimateGas({ from: address }, (err, estGas) =>
          err ? gasLimitDefault : estGas
        )
    } catch (e) {
      estGas = gasLimitDefault
    }
    // Invoke createToken function of the contract
    const trxReceipt = await factory.methods
      .createToken(metadataCacheUri, name, symbol, this.web3.utils.toWei(cap))
      .send({
        from: address,
        gas: estGas + 1,
        gasPrice: await getFairGasPrice(this.web3, this.config)
      })
    let tokenAddress = null
    try {
      tokenAddress = trxReceipt.events.TokenCreated.returnValues[0]
    } catch (e) {
      this.logger.error(`ERROR: Failed to create datatoken : ${e.message}`)
    }
    return tokenAddress
  }
  /**
   * Approve
   * @param {String} dataTokenAddress
   * @param {String} toAddress
   * @param {string} amount Number of datatokens, as number. Will be converted to wei
   * @param {String} address
   * @return {Promise<TransactionReceipt>} transactionId
   */
  async approve(dataTokenAddress, spender, amount, address) {
    const datatoken = setContractDefaults(
      new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress, {
        from: address
      }),
      this.config
    )
    const gasLimitDefault = this.GASLIMIT_DEFAULT
    let estGas
    try {
      estGas = await datatoken.methods
        .approve(spender, this.web3.utils.toWei(amount))
        .estimateGas({ from: address }, (err, estGas) =>
          err ? gasLimitDefault : estGas
        )
    } catch (e) {
      estGas = gasLimitDefault
    }
    const trxReceipt = await datatoken.methods
      .approve(spender, this.web3.utils.toWei(amount))
      .send({
        from: address,
        gas: estGas + 1,
        gasPrice: await getFairGasPrice(this.web3, this.config)
      })
    return trxReceipt
  }
  /**
   * Mint
   * @param {String} dataTokenAddress
   * @param {String} address
   * @param {String} amount Number of datatokens, as number. Will be converted to wei
   * @param {String} toAddress   - only if toAddress is different from the minter
   * @return {Promise<TransactionReceipt>} transactionId
   */
  async mint(dataTokenAddress, address, amount, toAddress) {
    const datatoken = setContractDefaults(
      new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress, {
        from: address
      }),
      this.config
    )
    const capAvailble = await this.getCap(dataTokenAddress)
    if (new Decimal(capAvailble).gte(amount)) {
      const gasLimitDefault = this.GASLIMIT_DEFAULT
      let estGas
      try {
        estGas = await datatoken.methods
          .mint(toAddress || address, this.web3.utils.toWei(amount))
          .estimateGas({ from: address }, (err, estGas) =>
            err ? gasLimitDefault : estGas
          )
      } catch (e) {
        estGas = gasLimitDefault
      }
      const trxReceipt = await datatoken.methods
        .mint(toAddress || address, this.web3.utils.toWei(amount))
        .send({
          from: address,
          gas: estGas + 1,
          gasPrice: await getFairGasPrice(this.web3, this.config)
        })
      return trxReceipt
    } else {
      throw new Error(`Mint amount exceeds cap available`)
    }
  }
  /**
   * Transfer as number from address to toAddress
   * @param {String} dataTokenAddress
   * @param {String} toAddress
   * @param {String} amount Number of datatokens, as number. Will be converted to wei
   * @param {String} address
   * @return {Promise<TransactionReceipt>} transactionId
   */
  async transfer(dataTokenAddress, toAddress, amount, address) {
    return this.transferToken(dataTokenAddress, toAddress, amount, address)
  }
  /**
   * Transfer as number from address to toAddress
   * @param {String} dataTokenAddress
   * @param {String} toAddress
   * @param {String} amount Number of datatokens, as number. Will be converted to wei
   * @param {String} address
   * @return {Promise<TransactionReceipt>} transactionId
   */
  async transferToken(dataTokenAddress, toAddress, amount, address) {
    const weiAmount = this.web3.utils.toWei(amount)
    return this.transferWei(dataTokenAddress, toAddress, weiAmount, address)
  }
  /**
   * Transfer in wei from address to toAddress
   * @param {String} dataTokenAddress
   * @param {String} toAddress
   * @param {String} amount Number of datatokens, as number. Expressed as wei
   * @param {String} address
   * @return {Promise<TransactionReceipt>} transactionId
   */
  async transferWei(dataTokenAddress, toAddress, amount, address) {
    const datatoken = setContractDefaults(
      new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress, {
        from: address
      }),
      this.config
    )
    const gasLimitDefault = this.GASLIMIT_DEFAULT
    let estGas
    try {
      estGas = await datatoken.methods
        .transfer(toAddress, amount)
        .estimateGas({ from: address }, (err, estGas) =>
          err ? gasLimitDefault : estGas
        )
    } catch (e) {
      estGas = gasLimitDefault
    }
    const trxReceipt = await datatoken.methods
      .transfer(toAddress, amount)
      .send({
        from: address,
        gas: estGas + 1,
        gasPrice: await getFairGasPrice(this.web3, this.config)
      })
    return trxReceipt
  }
  /**
   * Transfer from fromAddress to address  (needs an Approve operation before)
   * @param {String} dataTokenAddress
   * @param {String} fromAddress
   * @param {String} amount Number of datatokens, as number. Will be converted to wei
   * @param {String} address
   * @return {Promise<string>} transactionId
   */
  async transferFrom(dataTokenAddress, fromAddress, amount, address) {
    const datatoken = setContractDefaults(
      new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress, {
        from: address
      }),
      this.config
    )
    const gasLimitDefault = this.GASLIMIT_DEFAULT
    let estGas
    try {
      estGas = await datatoken.methods
        .transferFrom(fromAddress, address, this.web3.utils.toWei(amount))
        .estimateGas({ from: address }, (err, estGas) =>
          err ? gasLimitDefault : estGas
        )
    } catch (e) {
      estGas = gasLimitDefault
    }
    const trxReceipt = await datatoken.methods
      .transferFrom(fromAddress, address, this.web3.utils.toWei(amount))
      .send({
        from: address,
        gas: estGas + 1,
        gasPrice: await getFairGasPrice(this.web3, this.config)
      })
    return trxReceipt
  }
  /**
   * Get Address Balance for datatoken
   * @param {String} dataTokenAddress
   * @param {String} address
   * @return {Promise<String>} balance  Number of datatokens. Will be converted from wei
   */
  async balance(dataTokenAddress, address) {
    const datatoken = setContractDefaults(
      new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress, {
        from: address
      }),
      this.config
    )
    const balance = await datatoken.methods.balanceOf(address).call()
    return this.web3.utils.fromWei(balance)
  }
  /**
   * Get Alloance
   * @param {String } dataTokenAddress
   * @param {String} owner
   * @param {String} spender
   */
  async allowance(dataTokenAddress, owner, spender) {
    const datatoken = setContractDefaults(
      new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress, {
        from: spender
      }),
      this.config
    )
    const trxReceipt = await datatoken.methods.allowance(owner, spender).call()
    return this.web3.utils.fromWei(trxReceipt)
  }
  /** Get Blob
   * @param {String} dataTokenAddress
   * @return {Promise<string>} string
   */
  async getBlob(dataTokenAddress) {
    const datatoken = setContractDefaults(
      new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress),
      this.config
    )
    const trxReceipt = await datatoken.methods.blob().call()
    return trxReceipt
  }
  /** Get Name
   * @param {String} dataTokenAddress
   * @return {Promise<string>} string
   */
  async getName(dataTokenAddress) {
    const datatoken = setContractDefaults(
      new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress),
      this.config
    )
    const trxReceipt = await datatoken.methods.name().call()
    return trxReceipt
  }
  /** Get Symbol
   * @param {String} dataTokenAddress
   * @return {Promise<string>} string
   */
  async getSymbol(dataTokenAddress) {
    const datatoken = setContractDefaults(
      new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress),
      this.config
    )
    const trxReceipt = await datatoken.methods.symbol().call()
    return trxReceipt
  }
  /** Get Cap
   * @param {String} dataTokenAddress
   * @return {Promise<string>} string
   */
  async getCap(dataTokenAddress) {
    const datatoken = setContractDefaults(
      new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress),
      this.config
    )
    const trxReceipt = await datatoken.methods.cap().call()
    return this.web3.utils.fromWei(trxReceipt)
  }
  /** Convert to wei
   * @param {String} amount
   * @return {Promise<string>} string
   */
  toWei(amount) {
    return this.web3.utils.toWei(amount)
  }
  /** Convert from wei
   * @param {String} amount
   * @return {Promise<string>} string
   */
  fromWei(amount) {
    return this.web3.utils.fromWei(amount)
  }
  /** Start Order
   * @param {String} dataTokenAddress
   * @param {String} consumer consumer Address
   * @param {String} amount
   * @param {Number} serviceId
   * @param {String} mpFeeAddress
   * @param {String} address consumer Address
   * @return {Promise<string>} string
   */
  async startOrder(
    dataTokenAddress,
    consumer,
    amount,
    serviceId,
    mpFeeAddress,
    address
  ) {
    const datatoken = setContractDefaults(
      new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress, {
        from: address
      }),
      this.config
    )
    if (!mpFeeAddress)
      mpFeeAddress = '0x0000000000000000000000000000000000000000'
    try {
      const gasLimitDefault = this.GASLIMIT_DEFAULT
      let estGas
      try {
        estGas = await datatoken.methods
          .startOrder(
            consumer,
            this.web3.utils.toWei(amount),
            String(serviceId),
            mpFeeAddress
          )
          .estimateGas({ from: address }, (err, estGas) =>
            err ? gasLimitDefault : estGas
          )
      } catch (e) {
        estGas = gasLimitDefault
      }
      const trxReceipt = await datatoken.methods
        .startOrder(
          consumer,
          this.web3.utils.toWei(amount),
          String(serviceId),
          mpFeeAddress
        )
        .send({
          from: address,
          gas: estGas + 1,
          gasPrice: await getFairGasPrice(this.web3, this.config)
        })
      return trxReceipt
    } catch (e) {
      this.logger.error(`ERROR: Failed to start order : ${e.message}`)
      throw new Error(`Failed to start order: ${e.message}`)
    }
  }
  /** Search and return txid for a previous valid order with the same params
   * @param {String} dataTokenAddress
   * @param {String} amount
   * @param {String} did
   * @param {Number} serviceId
   * @param {Number} timeout service timeout
   * @param {String} address consumer Address
   * @return {Promise<string>} string
   */
  // Note that getPreviousValidOrders() only works on Eth (see: https://github.com/oceanprotocol/ocean.js/issues/741)
  async getPreviousValidOrders(
    dataTokenAddress,
    amount,
    serviceId,
    timeout,
    address
  ) {
    const datatoken = setContractDefaults(
      new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress, {
        from: address
      }),
      this.config
    )
    let fromBlock
    if (timeout > 0) {
      const lastBlock = await this.web3.eth.getBlockNumber()
      fromBlock = lastBlock - timeout
      if (fromBlock < this.startBlock) fromBlock = this.startBlock
    } else {
      fromBlock = this.startBlock
    }
    const events = await datatoken.getPastEvents('OrderStarted', {
      filter: { consumer: address },
      fromBlock,
      toBlock: 'latest'
    })
    for (let i = 0; i < events.length; i++) {
      if (
        String(events[i].returnValues.amount) ===
          this.web3.utils.toWei(String(amount)) &&
        String(events[i].returnValues.serviceId) === String(serviceId) &&
        events[i].returnValues.consumer.toLowerCase() === address.toLowerCase()
      ) {
        if (timeout === 0) return events[i].transactionHash
        const blockDetails = await this.web3.eth.getBlock(events[i].blockHash)
        const expiry = new BigNumber(blockDetails.timestamp).plus(timeout)
        const unixTime = new BigNumber(Math.floor(Date.now() / 1000))
        if (unixTime.isLessThan(expiry)) return events[i].transactionHash
      }
    }
    return null
  }
  getStartOrderEventSignature() {
    const abi = this.datatokensABI
    const eventdata = abi.find(function (o) {
      if (o.name === 'OrderStarted' && o.type === 'event') return o
    })
    const topic = this.web3.eth.abi.encodeEventSignature(eventdata)
    return topic
  }
  /**
   * Purpose a new minter
   * @param {String} dataTokenAddress
   * @param {String} newMinter
   * @param {String} address - only current minter can call this
   * @return {Promise<string>} transactionId
   */
  async proposeMinter(dataTokenAddress, newMinterAddress, address) {
    const datatoken = setContractDefaults(
      new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress, {
        from: address
      }),
      this.config
    )
    const gasLimitDefault = this.GASLIMIT_DEFAULT
    let estGas
    try {
      estGas = await datatoken.methods
        .proposeMinter(newMinterAddress)
        .estimateGas({ from: address }, (err, estGas) =>
          err ? gasLimitDefault : estGas
        )
    } catch (e) {
      estGas = gasLimitDefault
    }
    try {
      const trxReceipt = await datatoken.methods
        .proposeMinter(newMinterAddress)
        .send({
          from: address,
          gas: estGas + 1,
          gasPrice: await getFairGasPrice(this.web3, this.config)
        })
      return trxReceipt
    } catch (e) {
      this.logger.error('ERROR: Propose minter failed')
      return null
    }
  }
  /**
   * Approve minter role
   * @param {String} dataTokenAddress
   * @param {String} address - only proposad minter can call this
   * @return {Promise<string>} transactionId
   */
  async approveMinter(dataTokenAddress, address) {
    const datatoken = setContractDefaults(
      new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress, {
        from: address
      }),
      this.config
    )
    const gasLimitDefault = this.GASLIMIT_DEFAULT
    let estGas
    try {
      estGas = await datatoken.methods
        .approveMinter()
        .estimateGas({ from: address }, (err, estGas) =>
          err ? gasLimitDefault : estGas
        )
    } catch (e) {
      estGas = gasLimitDefault
    }
    try {
      const trxReceipt = await datatoken.methods.approveMinter().send({
        from: address,
        gas: estGas + 1,
        gasPrice: await getFairGasPrice(this.web3, this.config)
      })
      return trxReceipt
    } catch (e) {
      return null
    }
  }
  /** Check if an address has the minter role
   * @param {String} dataTokenAddress
   * * @param {String} address
   * @return {Promise<string>} string
   */
  async isMinter(dataTokenAddress, address) {
    const datatoken = setContractDefaults(
      new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress),
      this.config
    )
    const trxReceipt = await datatoken.methods.isMinter(address).call()
    return trxReceipt
  }
}
//# sourceMappingURL=Datatokens.js.map
