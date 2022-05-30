import { setContractDefaults, getFairGasPrice } from '../utils'
import jsonFactoryABI from '@oceanprotocol/contracts/artifacts/BFactory.json'
export class PoolFactory {
  GASLIMIT_DEFAULT = 1000000
  web3 = null
  factoryABI
  factoryAddress
  logger
  config
  constructor(web3, logger, factoryABI = null, factoryAddress = null, config) {
    this.web3 = web3
    if (factoryABI) this.factoryABI = factoryABI
    else this.factoryABI = jsonFactoryABI.abi
    if (factoryAddress) {
      this.factoryAddress = factoryAddress
    }
    this.logger = logger
    this.config = config
  }
  /**
   * Creates a new pool
   */
  async createPool(account) {
    if (this.web3 === null) {
      this.logger.error('ERROR: Web3 object is null')
      return null
    }
    if (this.factoryAddress === null) {
      this.logger.error('ERROR: bfactoryAddress is null')
      return null
    }
    const factory = setContractDefaults(
      new this.web3.eth.Contract(this.factoryABI, this.factoryAddress, {
        from: account
      }),
      this.config
    )
    let txid = null
    const gasLimitDefault = this.GASLIMIT_DEFAULT
    let estGas
    try {
      estGas = await factory.methods
        .newBPool()
        .estimateGas({ from: account }, (err, estGas) =>
          err ? gasLimitDefault : estGas
        )
    } catch (e) {
      this.logger.log('Error estimate gas newBPool')
      this.logger.log(e)
      estGas = gasLimitDefault
    }
    try {
      txid = await factory.methods.newBPool().send({
        from: account,
        gas: estGas + 1,
        gasPrice: await getFairGasPrice(this.web3, this.config)
      })
      // pooladdress = transactiondata.events.BPoolRegistered.returnValues[0]
    } catch (e) {
      this.logger.error(`ERROR: Failed to create new pool: ${e.message}`)
    }
    return txid
  }
}
//# sourceMappingURL=PoolFactory.js.map
