export class Config {
  /**
   * Ethereum node URL.
   * @type {string}
   */
  nodeUri
  /**
   * Address of Provider.
   * @type {string}
   */
  providerAddress
  /**
   * Metadata Store URL.
   * @type {string}
   */
  metadataCacheUri
  /**
   * Provider URL.
   * @type {string}
   */
  providerUri
  /**
   * Role-based access control URL.
   * @type {string}
   */
  rbacUri
  /**
   * Web3 Provider.
   * @type {any}
   */
  web3Provider
  /**
   * Ocean Token address
   * @type {string}
   */
  oceanTokenAddress
  /**
   * Factory address
   * @type {string}
   */
  factoryAddress
  /**
   * Factory ABI
   * @type {string}
   */
  factoryABI
  /**
   * datatokens ABI
   * @type {string}
   */
  datatokensABI
  /**
   * Pool Factory address
   * @type {string}
   */
  poolFactoryAddress
  /**
   * Pool Factory ABI
   * @type {string}
   */
  poolFactoryABI
  /**
   * Pool ABI
   * @type {string}
   */
  poolABI
  /**
   * FixedRateExchangeAddress
   * @type {string}
   */
  fixedRateExchangeAddress
  /**
   * FixedRateExchangeAddressABI
   * @type {any}
   */
  fixedRateExchangeAddressABI
  /**
   * DispenserAddress
   * @type {string}
   */
  dispenserAddress
  /**
   * DispenserABI
   * @type {any}
   */
  dispenserABI
  /**
   * DDOContractAddress
   * @type {string}
   */
  metadataContractAddress
  /**
   * DDOContractABI
   * @type {any}
   */
  metadataContractABI
  /**
   * block number of the deployment
   * @type {number}
   */
  startBlock
  /**
   * Log level.
   * @type {boolean | LogLevel}
   */
  verbose
  /**
   * Message shown when the user creates its own token.
   * @type {string}
   */
  authMessage
  /**
   * Token expiration time in ms.
   * @type {number}
   */
  authTokenExpiration
  // Parity config
  parityUri
  threshold
  /**
   * HTTP request timeout
   * @type {number}
   */
  requestTimeout
}
export default Config
//# sourceMappingURL=Config.js.map
