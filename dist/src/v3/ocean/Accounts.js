import Account from './Account'
import { Instantiable } from '../Instantiable.abstract'
/**
 * Account submodule of Ocean Protocol.
 */
export class Accounts extends Instantiable {
  /**
   * Returns the instance of OceanAccounts.
   * @return {Promise<OceanAccounts>}
   */
  static async getInstance(config) {
    const instance = new Accounts()
    instance.setInstanceConfig(config)
    return instance
  }
  /**
   * Returns the list of accounts.
   * @return {Promise<Account[]>}
   */
  async list() {
    // retrieve eth accounts
    const ethAccounts = await this.web3.eth.getAccounts()
    const accountPromises = ethAccounts.map(
      (address) => new Account(address, this.instanceConfig)
    )
    return Promise.all(accountPromises)
  }
  /**
   * Return account balance for a given ERC20 token
   * @param  {String}          TokenAddress .
   * @param  {Account}          account Account instance.
   * @return {Promise<String>}         Token balance.
   */
  getTokenBalance(TokenAddress, account) {
    return account.getTokenBalance(TokenAddress)
  }
  /**
   * Return account balance for a Ocean Tokens
   * @param  {Account}          account Account instance.
   * @return {Promise<String>}         Ocean Token balance.
   */
  getOceanBalance(account) {
    return account.getOceanBalance()
  }
  /**
   * Return account balance in ETH
   * @param  {Account}          account Account instance.
   * @return {Promise<String>}         Ether  balance.
   */
  getEtherBalance(account) {
    return account.getEtherBalance()
  }
}
//# sourceMappingURL=Accounts.js.map
