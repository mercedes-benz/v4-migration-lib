import { LoggerInstance } from './utils'
export function generateIntantiableConfigFromConfig(config) {
  return {
    config,
    web3: config.web3Provider,
    logger: LoggerInstance
  }
}
export class Instantiable {
  get ocean() {
    if (!this._ocean) {
      LoggerInstance.error('Ocean instance is not defined.')
    }
    return this._ocean
  }
  get web3() {
    if (!this._web3) {
      LoggerInstance.error('Web3 instance is not defined.')
    }
    return this._web3
  }
  get config() {
    if (!this._config) {
      LoggerInstance.error('Config instance is not defined.')
    }
    return this._config
  }
  get logger() {
    return LoggerInstance
  }
  get instanceConfig() {
    const { ocean, web3, config, logger } = this
    return { ocean, web3, config, logger }
  }
  static async getInstance(config) {
    LoggerInstance.warn(
      'getInstance() methods has needs to be added to child class.'
    )
  }
  static setInstanceConfig(instance, { ocean, config, web3, logger }) {
    instance._ocean = ocean
    instance._config = config
    instance._web3 = web3
    instance._logger = logger
  }
  _ocean
  _web3
  _config
  _logger
  setInstanceConfig(config) {
    Instantiable.setInstanceConfig(this, config)
  }
}
//# sourceMappingURL=Instantiable.abstract.js.map
