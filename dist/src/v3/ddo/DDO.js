import Web3Provider from '../datatokens/Web3Provider'
/**
 * DID Descriptor Object.
 * Contains all the data related to an asset.
 */
export class DDO {
  /**
   * Serializes the DDO object.
   * @param  {DDO} DDO to be serialized.
   * @return {string} DDO serialized.
   */
  static serialize(ddo) {
    return JSON.stringify(ddo, null, 2)
  }
  /**
   * Deserializes the DDO object.
   * @param  {DDO} DDO to be deserialized.
   * @return {string} DDO deserialized.
   */
  static deserialize(ddoString) {
    const ddo = JSON.parse(ddoString)
    return new DDO(ddo)
  }
  '@context' = 'https://w3id.org/did/v1'
  /**
   * DID, descentralized ID.
   * @type {string}
   */
  id = null
  created
  updated
  dataToken
  publicKey = []
  authentication = []
  service = []
  proof
  price
  isInPurgatory
  purgatoryData
  dataTokenInfo
  credentials
  chainId
  event
  constructor(ddo = {}) {
    Object.assign(this, ddo, {
      created:
        (ddo && ddo.created) ||
        new Date().toISOString().replace(/\.[0-9]{3}/, '')
    })
  }
  shortId() {
    return this.id.replace('did:op:', '')
  }
  /**
   * Finds a service of a DDO by index.
   * @param  {number} Service index.
   * @return {Service} Service.
   */
  findServiceById(index) {
    if (isNaN(index)) {
      throw new Error('index is not set')
    }
    const service = this.service.find((s) => s.index === index)
    return service
  }
  /**
   * Finds a service of a DDO by type.
   * @param  {string} serviceType Service type.
   * @return {Service} Service.
   */
  findServiceByType(serviceType) {
    if (!serviceType) {
      throw new Error('serviceType not set')
    }
    return this.service.find((s) => s.type === serviceType)
  }
  /**
   * Generate the checksum using the current content.
   * @return {string[]} DDO checksum.
   */
  getChecksum() {
    const { attributes } = this.findServiceByType('metadata')
    const { files, name, author, license } = attributes.main
    const values = [
      ...(files || []).map(({ checksum }) => checksum).filter((_) => !!_),
      name,
      author,
      license,
      this.id
    ]
    return (
      Web3Provider.getWeb3()
        .utils.sha3(values.join(''))
        // TODO: security/detect-unsafe-regex
        .replace(/^0x([a-f0-9]{64})(:!.+)?$/i, '0x$1')
    )
  }
  /**
   * Generates and adds a simple hash proof on publicKey
   * @param  {Ocean}          ocean     Ocean instance.
   * @param  {string}         publicKey Public key to be used on personal sign.
   * @return {Promise<void>}
   */
  async addProof(ocean, publicKey, password) {
    if (this.proof) {
      throw new Error('Proof already exists')
    }
    this.proof = {
      created: new Date().toISOString().replace(/\.[0-9]{3}/, ''),
      creator: publicKey,
      type: 'AddressHash',
      signatureValue: Web3Provider.getWeb3()
        .utils.sha3(publicKey)
        // TODO: security/detect-unsafe-regex
        .replace(/^0x([a-f0-9]{64})(:!.+)?$/i, '0x$1')
    }
  }
}
//# sourceMappingURL=DDO.js.map