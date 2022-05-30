import { Instantiable } from '../Instantiable.abstract'
export default class ContractHandler extends Instantiable {
  static getContract(what, networkId) {
    return ContractHandler.contracts.get(this.getHash(what, networkId))
  }
  static setContract(what, networkId, contractInstance) {
    ContractHandler.contracts.set(
      this.getHash(what, networkId),
      contractInstance
    )
  }
  static hasContract(what, networkId) {
    return ContractHandler.contracts.has(this.getHash(what, networkId))
  }
  static contracts = new Map()
  static getHash(what, networkId) {
    return `${what}/#${networkId}`
  }
  constructor(config) {
    super()
    this.setInstanceConfig(config)
  }
  async get(what, optional = false) {
    const where = (await this.ocean.network.getNetworkName()).toLowerCase()
    const networkId = await this.ocean.network.getNetworkId()
    try {
      return (
        ContractHandler.getContract(what, networkId) ||
        (await this.load(what, where, networkId))
      )
    } catch (err) {
      if (!optional) {
        this.logger.error('Failed to load', what, 'from', where, err)
      }
      throw err
    }
  }
  async load(what, where, networkId) {
    this.logger.debug('Loading', what, 'from', where)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const artifact = require(`@oceanprotocol/contracts/artifacts/${where}/${what}.json`)
    // Logger.log('Loaded artifact', artifact)
    const code = await this.web3.eth.getCode(artifact.address)
    if (code === '0x0') {
      // no code in the blockchain dude
      throw new Error(`No code deployed at address ${artifact.address}, sorry.`)
    }
    const contract = new this.web3.eth.Contract(artifact.abi, artifact.address)
    this.logger.debug(
      'Getting instance of',
      what,
      'from',
      where,
      'at address',
      artifact.address
    )
    ContractHandler.setContract(what, networkId, contract)
    return ContractHandler.getContract(what, networkId)
  }
}
//# sourceMappingURL=ContractHandler.js.map
