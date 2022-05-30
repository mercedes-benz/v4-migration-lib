import { Instantiable } from '../Instantiable.abstract'
const defaultAuthMessage = 'Ocean Protocol Authentication'
const defaultExpirationTime = 30 * 24 * 60 * 60 * 1000 // 30 days
const localStorageKey = 'SquidTokens'
/**
 * Tokens submodule of Ocean Protocol.
 */
export class OceanAuth extends Instantiable {
  /**
   * Returns the instance of OceanAuth.
   * @return {Promise<OceanAuth>}
   */
  static async getInstance(config) {
    const instance = new OceanAuth()
    instance.setInstanceConfig(config)
    return instance
  }
  /**
   * Returns a token for a account.
   * @param  {Account} account Signer account.
   * @return {Promise<string>} Token
   */
  async get(account) {
    const time = Math.floor(Date.now() / 1000)
    const message = `${this.getMessage()}\n${time}`
    try {
      const signature = await this.ocean.utils.signature.signText(
        message,
        account.getId(),
        account.getPassword()
      )
      return `${signature}-${time}`
    } catch {
      throw new Error('User denied the signature.')
    }
  }
  /**
   * Returns the address of signed token.
   * @param  {string}          token Token.
   * @return {Promise<string>}       Signer address.
   */
  async check(token) {
    const expiration = this.getExpiration()
    const [signature, timestamp] = token.split('-')
    const message = `${this.getMessage()}\n${timestamp}`
    if (+timestamp * 1000 + expiration < Date.now()) {
      return `0x${'0'.repeat(40)}`
    }
    return this.web3.utils.toChecksumAddress(
      await this.ocean.utils.signature.verifyText(message, signature)
    )
  }
  /**
   * Generates and stores the token for a account.
   * @param {Account} account Signer account.
   */
  async store(account) {
    const token = await this.get(account)
    this.writeToken(account.getId(), token)
  }
  /**
   * Returns a stored token.
   * @param {Account} account Signer account.
   */
  async restore(account) {
    let token
    try {
      token = this.readToken(account.getId())
    } catch {
      return
    }
    if (!token) {
      return
    }
    const signer = await this.check(token)
    if (signer.toLowerCase() !== account.getId().toLowerCase()) {
      return
    }
    return token
  }
  /**
   * Returns if the token is stored and is valid.
   * @param  {Account}          account Signer account.
   * @return {Promise<boolean>}         Is stored and valid.
   */
  async isStored(account) {
    return !!(await this.restore(account))
  }
  writeToken(address, token) {
    const localStorage = this.getLocalStorage()
    const storedTokens = localStorage.getItem(localStorageKey)
    const tokens = storedTokens ? JSON.parse(storedTokens) : {}
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({
        ...tokens,
        [address]: token
      })
    )
  }
  readToken(address) {
    const localStorage = this.getLocalStorage()
    const storedTokens = localStorage.getItem(localStorageKey)
    const tokens = storedTokens ? JSON.parse(storedTokens) : {}
    return tokens[address]
  }
  getLocalStorage() {
    try {
      localStorage.getItem('')
    } catch {
      throw new Error(
        'LocalStorage is not supported. This feature is only available on browsers.'
      )
    }
    return localStorage
  }
  getMessage() {
    return this.config.authMessage || defaultAuthMessage
  }
  getExpiration() {
    return this.config.authTokenExpiration || defaultExpirationTime
  }
}
//# sourceMappingURL=OceanAuth.js.map
