export class SubscribableObserver {
  completed = false
  subscriptions = new Set()
  subscribe(onNext, onComplete, onError) {
    if (this.completed) {
      throw new Error('Observer completed.')
    }
    const subscription = { onNext, onComplete, onError }
    this.subscriptions.add(subscription)
    return {
      unsubscribe: () => this.subscriptions.delete(subscription)
    }
  }
  next(next) {
    this.emit('onNext', next)
  }
  complete(resolve) {
    this.emit('onComplete', resolve)
    this.unsubscribe()
  }
  error(error) {
    this.emit('onError', error)
    this.unsubscribe()
  }
  emit(type, value) {
    Array.from(this.subscriptions)
      .map((subscription) => subscription[type])
      .filter((callback) => callback && typeof callback === 'function')
      .forEach((callback) => callback(value))
  }
  unsubscribe() {
    this.completed = true
    this.subscriptions.clear()
  }
}
//# sourceMappingURL=SubscribableObserver.js.map
