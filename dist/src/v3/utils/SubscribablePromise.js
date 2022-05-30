import { SubscribableObserver } from './SubscribableObserver'
export class SubscribablePromise {
  observer = new SubscribableObserver()
  promise = Object.assign(
    new Promise((resolve, reject) => {
      setTimeout(() => {
        this.observer.subscribe(undefined, resolve, reject)
      }, 0)
    }),
    this
  )
  constructor(executor) {
    // Defear
    setTimeout(() => this.init(executor), 1)
  }
  subscribe(onNext) {
    return this.observer.subscribe(onNext)
  }
  next(onNext) {
    this.observer.subscribe(onNext)
    return this
  }
  then(onfulfilled, onrejected) {
    return Object.assign(this.promise.then(onfulfilled, onrejected), this)
  }
  catch(onrejected) {
    return Object.assign(this.promise.catch(onrejected), this)
  }
  finally(onfinally) {
    return Object.assign(this.promise.finally(onfinally), this)
  }
  init(executor) {
    const execution = executor(this.observer)
    Promise.resolve(execution)
      .then((result) => {
        if (typeof execution.then === 'function') {
          this.observer.complete(result)
        }
      })
      .catch((result) => {
        if (typeof execution.then === 'function') {
          this.observer.error(result)
        }
      })
  }
}
//# sourceMappingURL=SubscribablePromise.js.map
