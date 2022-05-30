export class SignatureUtils {
  web3
  logger
  constructor(web3, logger) {
    this.web3 = web3
    this.logger = logger
  }
  async signText(text, publicKey, password) {
    const isMetaMask =
      this.web3 &&
      this.web3.currentProvider &&
      this.web3.currentProvider.isMetaMask
    try {
      return await this.web3.eth.personal.sign(text, publicKey, password)
    } catch (e) {
      if (isMetaMask) {
        throw e
      }
      this.logger.warn('Error on personal sign.')
      this.logger.warn(e)
      try {
        return await this.web3.eth.sign(text, publicKey)
      } catch (e2) {
        this.logger.error('Error on sign.')
        this.logger.error(e2)
        throw new Error('Error executing personal sign')
      }
    }
  }
  async signWithHash(text, publicKey, password) {
    const hash = this.web3.utils.utf8ToHex(text)
    const isMetaMask =
      this.web3 &&
      this.web3.currentProvider &&
      this.web3.currentProvider.isMetaMask
    try {
      return await this.web3.eth.personal.sign(hash, publicKey, password)
    } catch (e) {
      if (isMetaMask) {
        throw e
      }
      this.logger.warn('Error on personal sign.')
      this.logger.warn(e)
      try {
        return await this.web3.eth.sign(hash, publicKey)
      } catch (e2) {
        this.logger.error('Error on sign.')
        this.logger.error(e2)
        throw new Error('Error executing personal sign')
      }
    }
  }
  async verifyText(text, signature) {
    return this.web3.eth.personal.ecRecover(text, signature)
  }
  async getHash(message) {
    let hex = ''
    for (let i = 0; i < message.length; i++) {
      hex += '' + message.charCodeAt(i).toString(16)
    }
    const hexMessage = '0x' + hex
    return hexMessage
  }
  async signForAquarius(message, account) {
    const hash = await this.getHash(message)
    const isMetaMask =
      this.web3 &&
      this.web3.currentProvider &&
      this.web3.currentProvider.isMetaMask
    try {
      return this.web3.eth.personal.sign(
        hash,
        account.getId(),
        account.getPassword()
      )
    } catch (e) {
      if (isMetaMask) {
        throw e
      }
      this.logger.warn('Error on personal sign.')
      this.logger.warn(e)
      return null
    }
  }
}
//# sourceMappingURL=SignatureUtils.js.map
