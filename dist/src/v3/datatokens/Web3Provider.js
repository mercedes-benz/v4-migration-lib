import Web3 from 'web3'
export default class Web3Provider {
  /**
   * Returns Web3 instance.
   * @return {Web3}
   */
  static getWeb3(config = {}) {
    return new Web3(
      config.web3Provider ||
        Web3.givenProvider ||
        new Web3.providers.HttpProvider(config.nodeUri)
    )
  }
}
//# sourceMappingURL=Web3Provider.js.map
