export var LogLevel
;(function (LogLevel) {
  LogLevel[(LogLevel['None'] = -1)] = 'None'
  LogLevel[(LogLevel['Error'] = 0)] = 'Error'
  LogLevel[(LogLevel['Warn'] = 1)] = 'Warn'
  LogLevel[(LogLevel['Log'] = 2)] = 'Log'
  LogLevel[(LogLevel['Verbose'] = 3)] = 'Verbose'
})(LogLevel || (LogLevel = {}))
export class Logger {
  logLevel
  constructor(logLevel = LogLevel.Error) {
    this.logLevel = logLevel
  }
  setLevel(logLevel) {
    this.logLevel = logLevel
  }
  bypass(...args) {
    this.dispatch('log', -Infinity, ...args)
  }
  debug(...args) {
    this.dispatch('debug', LogLevel.Verbose, ...args)
  }
  log(...args) {
    this.dispatch('log', LogLevel.Log, ...args)
  }
  warn(...args) {
    this.dispatch('warn', LogLevel.Warn, ...args)
  }
  error(...args) {
    this.dispatch('error', LogLevel.Error, ...args)
  }
  dispatch(verb, level, ...args) {
    if (this.logLevel >= level) {
      console[verb](...args)
    }
  }
}
export const LoggerInstance = new Logger()
export default LoggerInstance
//# sourceMappingURL=Logger.js.map
