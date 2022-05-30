import { noZeroX } from '../utils'
const prefix = 'did:op:'
/**
 * Decentralized ID.
 */
export default class DID {
  /**
   * Parses a DID from a string.
   * @param  {string} didString DID in string.
   * @return {DID}
   */
  static parse(didString) {
    if (didString instanceof DID) {
      didString = didString.getDid()
    }
    let did
    const didMatch = didString.match(/^did:op:([a-f0-9]{40})$/i)
    if (didMatch) {
      did = new DID(didMatch[1])
    }
    if (!did) {
      throw new Error(`Parsing DID failed, ${didString}`)
    }
    return did
  }
  /**
   * Generate a new DID.
   * @param  {string} dataTokenAddress Address of data token to use for DID.
   * @return {DID}
   */
  static generate(dataTokenAddress) {
    return new DID(noZeroX(dataTokenAddress))
  }
  /**
   * ID.
   * @type {string}
   */
  id
  constructor(id) {
    this.id = id
  }
  /**
   * Returns the DID.
   * @return {string}
   */
  getDid() {
    return `${prefix}${this.id}`
  }
  /**
   * Returns the ID.
   * @return {string}
   */
  getId() {
    return this.id
  }
}
//# sourceMappingURL=DID.js.map
