import defaultFixedRateExchangeABI from '@oceanprotocol/contracts/artifacts/FixedRateExchange.json'
import BigNumber from 'bignumber.js'
import {
  SubscribablePromise,
  getFairGasPrice,
  setContractDefaults
} from '../utils'
const MAX_AWAIT_PROMISES = 10
export var FixedRateCreateProgressStep
;(function (FixedRateCreateProgressStep) {
  FixedRateCreateProgressStep[
    (FixedRateCreateProgressStep['CreatingExchange'] = 0)
  ] = 'CreatingExchange'
  FixedRateCreateProgressStep[
    (FixedRateCreateProgressStep['ApprovingDatatoken'] = 1)
  ] = 'ApprovingDatatoken'
})(FixedRateCreateProgressStep || (FixedRateCreateProgressStep = {}))
export class OceanFixedRateExchange {
  GASLIMIT_DEFAULT = 1000000
  /** Ocean related functions */
  oceanAddress = null
  fixedRateExchangeAddress
  fixedRateExchangeABI
  web3
  contract = null
  logger
  datatokens
  startBlock
  config
  /**
   * Instantiate FixedRateExchange
   * @param {any} web3
   * @param {String} fixedRateExchangeAddress
   * @param {any} fixedRateExchangeABI
   * @param {String} oceanAddress
   */
  constructor(
    web3,
    logger,
    fixedRateExchangeAddress = null,
    fixedRateExchangeABI = null,
    oceanAddress = null,
    datatokens,
    config
  ) {
    this.web3 = web3
    this.fixedRateExchangeAddress = fixedRateExchangeAddress
    this.config = config
    this.startBlock = (config && config.startBlock) || 0
    this.fixedRateExchangeABI =
      fixedRateExchangeABI || defaultFixedRateExchangeABI.abi
    this.oceanAddress = oceanAddress
    this.datatokens = datatokens
    if (web3)
      this.contract = setContractDefaults(
        new this.web3.eth.Contract(
          this.fixedRateExchangeABI,
          this.fixedRateExchangeAddress
        ),
        this.config
      )
    this.logger = logger
  }
  /**
   * Creates new exchange pair between Ocean Token and data token.
   * @param {String} dataToken Data Token Contract Address
   * @param {Number} rate exchange rate
   * @param {String} address User address
   * @param {String} amount Optional, amount of datatokens to be approved for the exchange
   * @return {Promise<TransactionReceipt>} TransactionReceipt
   */
  create(dataToken, rate, address, amount) {
    return this.createExchange(
      this.oceanAddress,
      dataToken,
      rate,
      address,
      amount
    )
  }
  /**
   * Creates new exchange pair between Ocean Token and data token.
   * @param {String} dataToken Data Token Contract Address
   * @param {Number} rate exchange rate
   * @param {String} address User address
   * @param {String} amount Optional, amount of datatokens to be approved for the exchange
   * @return {Promise<TransactionReceipt>} TransactionReceipt
   */
  createExchange(baseToken, dataToken, rate, address, amount) {
    return new SubscribablePromise(async (observer) => {
      observer.next(FixedRateCreateProgressStep.CreatingExchange)
      let estGas
      const gasLimitDefault = this.GASLIMIT_DEFAULT
      try {
        estGas = await this.contract.methods
          .create(baseToken, dataToken, this.web3.utils.toWei(rate))
          .estimateGas({ from: address }, (err, estGas) =>
            err ? gasLimitDefault : estGas
          )
      } catch (e) {
        estGas = gasLimitDefault
      }
      let exchangeId = null
      let trxReceipt = null
      try {
        trxReceipt = await this.contract.methods
          .create(baseToken, dataToken, this.web3.utils.toWei(rate))
          .send({
            from: address,
            gas: estGas + 1,
            gasPrice: await getFairGasPrice(this.web3, this.config)
          })
        exchangeId = trxReceipt.events.ExchangeCreated.returnValues[0]
      } catch (e) {
        this.logger.error(`ERROR: Failed to create new exchange: ${e.message}`)
      }
      if (amount && exchangeId) {
        observer.next(FixedRateCreateProgressStep.ApprovingDatatoken)
        this.datatokens.approve(
          dataToken,
          this.fixedRateExchangeAddress,
          amount,
          address
        )
      }
      return trxReceipt
    })
  }
  /**
   * Creates unique exchange identifier.
   * @param {String} dataToken Data Token Contract Address
   * @param {String} owner Owner of the exchange
   * @return {Promise<string>} exchangeId
   */
  async generateExchangeId(dataToken, owner) {
    const exchangeId = await this.contract.methods
      .generateExchangeId(this.oceanAddress, dataToken, owner)
      .call()
    return exchangeId
  }
  /**
   * Atomic swap
   * @param {String} exchangeId ExchangeId
   * @param {Number} dataTokenAmount Amount of Data Tokens
   * @param {String} address User address
   * @return {Promise<TransactionReceipt>} transaction receipt
   */
  async buyDT(exchangeId, dataTokenAmount, address) {
    const gasLimitDefault = this.GASLIMIT_DEFAULT
    let estGas
    try {
      estGas = await this.contract.methods
        .swap(exchangeId, this.web3.utils.toWei(String(dataTokenAmount)))
        .estimateGas({ from: address }, (err, estGas) =>
          err ? gasLimitDefault : estGas
        )
    } catch (e) {
      estGas = gasLimitDefault
    }
    try {
      const trxReceipt = await this.contract.methods
        .swap(exchangeId, this.web3.utils.toWei(String(dataTokenAmount)))
        .send({
          from: address,
          gas: estGas + 1,
          gasPrice: await getFairGasPrice(this.web3, this.config)
        })
      return trxReceipt
    } catch (e) {
      this.logger.error(`ERROR: Failed to buy datatokens: ${e.message}`)
      return null
    }
  }
  /**
   * Gets total number of exchanges
   * @param {String} exchangeId ExchangeId
   * @param {Number} dataTokenAmount Amount of Data Tokens
   * @return {Promise<Number>} no of available exchanges
   */
  async getNumberOfExchanges() {
    const numExchanges = await this.contract.methods
      .getNumberOfExchanges()
      .call()
    return numExchanges
  }
  /**
   * Set new rate
   * @param {String} exchangeId ExchangeId
   * @param {Number} newRate New rate
   * @param {String} address User account
   * @return {Promise<TransactionReceipt>} transaction receipt
   */
  async setRate(exchangeId, newRate, address) {
    const gasLimitDefault = this.GASLIMIT_DEFAULT
    let estGas
    try {
      estGas = await this.contract.methods
        .setRate(exchangeId, this.web3.utils.toWei(String(newRate)))
        .estimateGas({ from: address }, (err, estGas) =>
          err ? gasLimitDefault : estGas
        )
    } catch (e) {
      estGas = gasLimitDefault
    }
    const trxReceipt = await this.contract.methods
      .setRate(exchangeId, this.web3.utils.toWei(String(newRate)))
      .send({
        from: address,
        gas: estGas + 1,
        gasPrice: await getFairGasPrice(this.web3, this.config)
      })
    return trxReceipt
  }
  /**
   * Activate an exchange
   * @param {String} exchangeId ExchangeId
   * @param {String} address User address
   * @return {Promise<TransactionReceipt>} transaction receipt
   */
  async activate(exchangeId, address) {
    const exchange = await this.getExchange(exchangeId)
    if (!exchange) return null
    if (exchange.active === true) return null
    const gasLimitDefault = this.GASLIMIT_DEFAULT
    let estGas
    try {
      estGas = await this.contract.methods
        .toggleExchangeState(exchangeId)
        .estimateGas({ from: address }, (err, estGas) =>
          err ? gasLimitDefault : estGas
        )
    } catch (e) {
      estGas = gasLimitDefault
    }
    const trxReceipt = await this.contract.methods
      .toggleExchangeState(exchangeId)
      .send({
        from: address,
        gas: estGas + 1,
        gasPrice: await getFairGasPrice(this.web3, this.config)
      })
    return trxReceipt
  }
  /**
   * Deactivate an exchange
   * @param {String} exchangeId ExchangeId
   * @param {String} address User address
   * @return {Promise<TransactionReceipt>} transaction receipt
   */
  async deactivate(exchangeId, address) {
    const exchange = await this.getExchange(exchangeId)
    if (!exchange) return null
    if (exchange.active === false) return null
    const gasLimitDefault = this.GASLIMIT_DEFAULT
    let estGas
    try {
      estGas = await this.contract.methods
        .toggleExchangeState(exchangeId)
        .estimateGas({ from: address }, (err, estGas) =>
          err ? gasLimitDefault : estGas
        )
    } catch (e) {
      estGas = gasLimitDefault
    }
    const trxReceipt = await this.contract.methods
      .toggleExchangeState(exchangeId)
      .send({
        from: address,
        gas: estGas + 1,
        gasPrice: await getFairGasPrice(this.web3, this.config)
      })
    return trxReceipt
  }
  /**
   * Get Rate
   * @param {String} exchangeId ExchangeId
   * @return {Promise<string>} Rate (converted from wei)
   */
  async getRate(exchangeId) {
    const weiRate = await this.contract.methods.getRate(exchangeId).call()
    return this.web3.utils.fromWei(weiRate)
  }
  /**
   * Get Supply
   * @param {String} exchangeId ExchangeId
   * @return {Promise<string>} Rate (converted from wei)
   */
  async getSupply(exchangeId) {
    const weiRate = await this.contract.methods.getSupply(exchangeId).call()
    return this.web3.utils.fromWei(weiRate)
  }
  /**
   * getOceanNeeded
   * @param {String} exchangeId ExchangeId
   * @param {Number} dataTokenAmount Amount of Data Tokens
   * @return {Promise<string>} Ocean amount needed
   */
  async getOceanNeeded(exchangeId, dataTokenAmount) {
    const weiRate = await this.contract.methods
      .CalcInGivenOut(exchangeId, this.web3.utils.toWei(dataTokenAmount))
      .call()
    return this.web3.utils.fromWei(weiRate)
  }
  /**
   * Get exchange details
   * @param {String} exchangeId ExchangeId
   * @return {Promise<FixedPricedExchange>} Exchange details
   */
  async getExchange(exchangeId) {
    const result = await this.contract.methods.getExchange(exchangeId).call()
    result.fixedRate = this.web3.utils.fromWei(result.fixedRate)
    result.supply = this.web3.utils.fromWei(result.supply)
    result.exchangeID = exchangeId
    return result
  }
  /**
   * Get all exchanges
   * @param {String} exchangeId ExchangeId
   * @return {Promise<String[]>} Exchanges list
   */
  async getExchanges() {
    return await this.contract.methods.getExchanges().call()
  }
  /**
   * Check if an exchange is active
   * @param {String} exchangeId ExchangeId
   * @return {Promise<Boolean>} Result
   */
  async isActive(exchangeId) {
    const result = await this.contract.methods.isActive(exchangeId).call()
    return result
  }
  /**
   * Calculates how many basetokens are needed to get specifyed amount of datatokens
   * @param {String} exchangeId ExchangeId
   * @param {String} dataTokenAmount dataTokenAmount
   * @return {Promise<String>} Result
   */
  async CalcInGivenOut(exchangeId, dataTokenAmount) {
    const result = await this.contract.methods
      .CalcInGivenOut(exchangeId, this.web3.utils.toWei(dataTokenAmount))
      .call()
    return this.web3.utils.fromWei(result)
  }
  async searchforDT(dataTokenAddress, minSupply) {
    const result = []
    const events = await this.contract.getPastEvents('ExchangeCreated', {
      filter: { datatoken: dataTokenAddress.toLowerCase() },
      fromBlock: this.startBlock,
      toBlock: 'latest'
    })
    let promises = []
    for (let i = 0; i < events.length; i++) {
      promises.push(this.getExchange(events[i].returnValues[0]))
      if (promises.length > MAX_AWAIT_PROMISES || i === events.length - 1) {
        const results = await Promise.all(promises)
        for (let j = 0; j < results.length; j++) {
          const constituents = results[j]
          if (
            constituents.active === true &&
            constituents.dataToken.toLowerCase() ===
              dataTokenAddress.toLowerCase()
          ) {
            const supply = new BigNumber(constituents.supply)
            const required = new BigNumber(minSupply)
            if (supply.gte(required)) {
              result.push(constituents)
            }
          }
        }
        promises = []
      }
    }
    return result
  }
  /**
   * Get all exchanges, filtered by creator(if any)
   * @param {String} account
   * @return {Promise<FixedPricedExchange[]>}
   */
  async getExchangesbyCreator(account) {
    const result = []
    const events = await this.contract.getPastEvents('ExchangeCreated', {
      filter: {},
      fromBlock: this.startBlock,
      toBlock: 'latest'
    })
    for (let i = 0; i < events.length; i++) {
      if (
        !account ||
        events[i].returnValues[3].toLowerCase() === account.toLowerCase()
      )
        result.push(await this.getExchange(events[i].returnValues[0]))
    }
    return result
  }
  /**
   * Get all swaps for an exchange, filtered by account(if any)
   * @param {String} exchangeId
   * @param {String} account
   * @return {Promise<FixedPricedSwap[]>}
   */
  async getExchangeSwaps(exchangeId, account) {
    const result = []
    const events = await this.contract.getPastEvents('Swapped', {
      filter: { exchangeId: exchangeId },
      fromBlock: this.startBlock,
      toBlock: 'latest'
    })
    for (let i = 0; i < events.length; i++) {
      if (
        !account ||
        events[i].returnValues[1].toLowerCase() === account.toLowerCase()
      )
        result.push(this.getEventData(events[i]))
    }
    return result
  }
  /**
   * Get all swaps for an account
   * @param {String} account
   * @return {Promise<FixedPricedSwap[]>}
   */
  async getAllExchangesSwaps(account) {
    const result = []
    const events = await this.contract.getPastEvents('ExchangeCreated', {
      filter: {},
      fromBlock: this.startBlock,
      toBlock: 'latest'
    })
    for (let i = 0; i < events.length; i++) {
      const swaps = await this.getExchangeSwaps(
        events[i].returnValues[0],
        account
      )
      swaps.forEach((swap) => {
        result.push(swap)
      })
    }
    return result
  }
  getEventData(data) {
    const result = {
      exchangeID: data.returnValues[0],
      caller: data.returnValues[1],
      baseTokenAmount: this.web3.utils.fromWei(data.returnValues[2]),
      dataTokenAmount: this.web3.utils.fromWei(data.returnValues[3])
    }
    return result
  }
}
//# sourceMappingURL=FixedRateExchange.js.map
