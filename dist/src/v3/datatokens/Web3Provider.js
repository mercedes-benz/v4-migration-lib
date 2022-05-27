'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var web3_1 = __importDefault(require('web3'))
var Web3Provider = (function () {
  function Web3Provider() {}
  Web3Provider.getWeb3 = function (config) {
    if (config === void 0) {
      config = {}
    }
    return new web3_1.default(
      config.web3Provider ||
        web3_1.default.givenProvider ||
        new web3_1.default.providers.HttpProvider(config.nodeUri)
    )
  }
  return Web3Provider
})()
exports.default = Web3Provider
//# sourceMappingURL=Web3Provider.js.map