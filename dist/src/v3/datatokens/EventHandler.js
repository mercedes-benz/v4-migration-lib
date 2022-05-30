import { ContractEvent } from './ContractEvent'
import { Instantiable } from '../Instantiable.abstract'
export class EventHandler extends Instantiable {
  get count() {
    return this.events.size
  }
  events = new Set()
  lastBlock
  interval = 200
  polling = false
  lastTimeout
  constructor(config) {
    super()
    this.setInstanceConfig(config)
  }
  subscribe(callback) {
    this.events.add(callback)
    this.checkBlock()
    return {
      unsubscribe: () => this.unsubscribe(callback)
    }
  }
  unsubscribe(callback) {
    this.events.delete(callback)
    if (!this.count) {
      clearTimeout(this.lastTimeout)
      delete this.lastBlock
      this.polling = false
    }
  }
  getEvent(contract, eventName, filter) {
    return new ContractEvent(this, contract, eventName, filter)
  }
  async checkBlock(isInterval, n = 0) {
    const blockNumber = await this.web3.eth.getBlockNumber()
    if ((this.polling && !isInterval) || !this.count) {
      return
    }
    this.polling = true
    if (!this.lastBlock) {
      this.lastBlock = blockNumber
    }
    if (this.lastBlock !== blockNumber) {
      this.events.forEach((fn) => fn(this.lastBlock + 1))
      this.lastBlock = blockNumber
    }
    this.lastTimeout = global.setTimeout(
      () => this.checkBlock(true, n++),
      this.interval
    )
  }
}
//# sourceMappingURL=EventHandler.js.map
