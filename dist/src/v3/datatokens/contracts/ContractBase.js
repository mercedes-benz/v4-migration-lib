import ContractHandler from '../ContractHandler'
import { Instantiable } from '../../Instantiable.abstract'
export class ContractBase extends Instantiable {
  optional
  static instance = null
  contractName
  contract = null
  get address() {
    return this.contract.options.address
  }
  constructor(contractName, optional = false) {
    super()
    this.optional = optional
    this.contractName = contractName
  }
  async getEventData(eventName, options) {
    if (!this.contract.events[eventName]) {
      throw new Error(
        `Event "${eventName}" not found on contract "${this.contractName}"`
      )
    }
    return this.contract.getPastEvents(eventName, options)
  }
  getPastEvents(eventName, filter) {
    return this.getEventData(eventName, {
      filter,
      fromBlock: 0,
      toBlock: 'latest'
    })
  }
  getAddress() {
    return this.contract.options.address
  }
  getSignatureOfMethod(methodName) {
    const foundMethod = this.searchMethod(methodName)
    return foundMethod.signature
  }
  getInputsOfMethod(methodName) {
    const foundMethod = this.searchMethod(methodName)
    return foundMethod.inputs
  }
  async init(config) {
    this.setInstanceConfig(config)
    const contractHandler = new ContractHandler(config)
    this.contract = await contractHandler.get(this.contractName, this.optional)
  }
  async getFromAddress(from) {
    if (!from) {
      from = (await this.web3.eth.getAccounts())[0]
    }
    return from
  }
  async sendFrom(name, args, from) {
    from = await this.getFromAddress(from)
    return this.send(name, from, args)
  }
  async send(name, from, args) {
    if (!this.contract.methods[name]) {
      throw new Error(
        `Method "${name}" is not part of contract "${this.contractName}"`
      )
    }
    // Logger.log(name, args)
    const method = this.contract.methods[name]
    try {
      const methodInstance = method(...args)
      const estimatedGas = await methodInstance.estimateGas(args, {
        from
      })
      const tx = methodInstance.send({
        from,
        gas: estimatedGas
      })
      return tx
    } catch (err) {
      const mappedArgs = this.searchMethod(name, args).inputs.map(
        (input, i) => {
          return {
            name: input.name,
            value: args[i]
          }
        }
      )
      this.logger.error('-'.repeat(40))
      this.logger.error(
        `Sending transaction "${name}" on contract "${this.contractName}" failed.`
      )
      this.logger.error(`Error: ${err.message}`)
      this.logger.error(`From: ${from}`)
      this.logger.error(`Parameters: ${JSON.stringify(mappedArgs, null, 2)}`)
      this.logger.error('-'.repeat(40))
      throw err
    }
  }
  async call(name, args, from) {
    if (!this.contract.methods[name]) {
      throw new Error(
        `Method ${name} is not part of contract ${this.contractName}`
      )
    }
    // Logger.log(name)
    try {
      const method = this.contract.methods[name](...args)
      return method.call(from ? { from } : null)
    } catch (err) {
      this.logger.error(
        `Calling method "${name}" on contract "${this.contractName}" failed. Args: ${args}`,
        err
      )
      throw err
    }
  }
  // protected getEvent(eventName: string, filter: { [key: string]: any }) {
  //     if (!this.contract.events[eventName]) {
  //         throw new Error(
  //             `Event ${eventName} is not part of contract ${this.contractName}`
  //         )
  //     }
  //     return this.ocean.keeper.utils.eventHandler.getEvent(this, eventName, filter)
  // }
  searchMethod(methodName, args = []) {
    const methods = this.contract.options.jsonInterface
      .map((method) => ({
        ...method,
        signature: method.signature
      }))
      .filter((method) => method.name === methodName)
    const foundMethod =
      methods.find(({ inputs }) => inputs.length === args.length) || methods[0]
    if (!foundMethod) {
      throw new Error(
        `Method "${methodName}" is not part of contract "${this.contractName}"`
      )
    }
    return foundMethod
  }
}
export default ContractBase
//# sourceMappingURL=ContractBase.js.map
