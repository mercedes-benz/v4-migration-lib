export class ContractEvent {
  eventEmitter
  contract
  eventName
  filter
  // eslint-disable-next-line no-useless-constructor
  constructor(eventEmitter, contract, eventName, filter) {
    this.eventEmitter = eventEmitter
    this.contract = contract
    this.eventName = eventName
    this.filter = filter
  }
  subscribe(callback) {
    const onEvent = async (blockNumber) => {
      const events = await this.contract.getEventData(this.eventName, {
        filter: this.filter,
        fromBlock: blockNumber,
        toBlock: 'latest'
      })
      if (events.length) {
        callback(events)
      }
    }
    this.eventEmitter.subscribe(onEvent)
    return {
      unsubscribe: () => this.eventEmitter.unsubscribe(onEvent)
    }
  }
  once(callback) {
    return new Promise((resolve) => {
      const subscription = this.subscribe((events) => {
        subscription.unsubscribe()
        if (callback) {
          callback(events)
        }
        resolve(events)
      })
    })
  }
}
//# sourceMappingURL=ContractEvent.js.map
