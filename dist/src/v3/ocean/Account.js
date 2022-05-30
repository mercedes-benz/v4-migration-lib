import { Instantiable } from '../Instantiable.abstract'
import Decimal from 'decimal.js'
/**
 * Account information.
 */
export default class Account extends Instantiable {
  id
  password
  token
  constructor(id = '0x0', config) {
    super()
    this.id = id
    if (config) {
      this.setInstanceConfig(config)
    }
  }
  getId() {
    return this.id
  }
  setId(id) {
    this.id = id
  }
  /**
   * Set account password.
   * @param {string} password Password for account.
   */
  setPassword(password) {
    this.password = password
  }
  /**
   * Returns account password.
   * @return {string} Account password.
   */
  getPassword() {
    return this.password
  }
  // TODO - Check with Samer if authentificate is still needed or we can use sign
  /**
       * Set account token.
       * @param {string} token Token for account.
       
      public setToken(token: string): void {
          this.token = token
      }
      */
  /**
       * Returns account token.
       * @return {Promise<string>} Account token.
       
      public async getToken(): Promise<string> {
          return this.token || this.ocean.auth.restore(this)
      }
      */
  /**
       * Returns if account token is stored.
       * @return {Promise<boolean>} Is stored.
       
      public isTokenStored(): Promise<boolean> {
          return this.ocean.auth.isStored(this)
      }
      */
  /**
       * Authenticate the account.
       
      public authenticate() {
          return this.ocean.auth.store(this)
      }
      */
  /**
   * Balance of Any Token (converted from wei).
   * @return {Promise<string>}
   */
  async getTokenBalance(TokenAdress) {
    if (TokenAdress === null) return null
    const minABI = [
      {
        constant: true,
        inputs: [
          {
            name: '_owner',
            type: 'address'
          }
        ],
        name: 'balanceOf',
        outputs: [
          {
            name: 'balance',
            type: 'uint256'
          }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      }
    ]
    let result = null
    const decimals = await this.getTokenDecimals(TokenAdress)
    try {
      const token = new this.web3.eth.Contract(minABI, TokenAdress, {
        from: this.id
      })
      const balance = await token.methods.balanceOf(this.id).call()
      result = new Decimal(balance).div(10 ** decimals).toString()
    } catch (e) {
      this.logger.error(`ERROR: Failed to get the balance: ${e.message}`)
    }
    return result
  }
  /**
   * Decimals of Any Token
   * @return {Promise<number>}
   */
  async getTokenDecimals(TokenAdress) {
    let decimals = 18
    if (TokenAdress === null) return decimals
    const minABI = [
      {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint8' }],
        type: 'function'
      }
    ]
    try {
      const token = new this.web3.eth.Contract(minABI, TokenAdress, {
        from: this.id
      })
      decimals = await token.methods.decimals().call()
    } catch (e) {
      this.logger.error(`ERROR: Failed to get decimals : ${e.message}`)
    }
    return decimals
  }
  /**
   * Balance of Ocean Token. (converted from wei).
   * @return {Promise<string>}
   */
  async getOceanBalance() {
    return this.getTokenBalance(this.config.oceanTokenAddress)
  }
  /**
   * Symbol of a Token
   * @return {Promise<string>}
   */
  async getTokenSymbol(TokenAdress) {
    // TO DO
    return ''
  }
  /**
   * Balance of Ether.(converted from wei).
   * @return {Promise<string>}
   */
  async getEtherBalance() {
    const result = await this.web3.eth.getBalance(this.id, 'latest')
    return this.web3.utils.fromWei(result)
  }
}
//# sourceMappingURL=Account.js.map
