'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.SignatureUtils = void 0
var SignatureUtils = (function () {
  function SignatureUtils(web3, logger) {
    this.web3 = web3
    this.logger = logger
  }
  SignatureUtils.prototype.signText = function (text, publicKey, password) {
    return __awaiter(this, void 0, void 0, function () {
      var isMetaMask, e_1, e2_1
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            isMetaMask =
              this.web3 &&
              this.web3.currentProvider &&
              this.web3.currentProvider.isMetaMask
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 8])
            return [4, this.web3.eth.personal.sign(text, publicKey, password)]
          case 2:
            return [2, _a.sent()]
          case 3:
            e_1 = _a.sent()
            if (isMetaMask) {
              throw e_1
            }
            this.logger.warn('Error on personal sign.')
            this.logger.warn(e_1)
            _a.label = 4
          case 4:
            _a.trys.push([4, 6, , 7])
            return [4, this.web3.eth.sign(text, publicKey)]
          case 5:
            return [2, _a.sent()]
          case 6:
            e2_1 = _a.sent()
            this.logger.error('Error on sign.')
            this.logger.error(e2_1)
            throw new Error('Error executing personal sign')
          case 7:
            return [3, 8]
          case 8:
            return [2]
        }
      })
    })
  }
  SignatureUtils.prototype.signWithHash = function (text, publicKey, password) {
    return __awaiter(this, void 0, void 0, function () {
      var hash, isMetaMask, e_2, e2_2
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            hash = this.web3.utils.utf8ToHex(text)
            isMetaMask =
              this.web3 &&
              this.web3.currentProvider &&
              this.web3.currentProvider.isMetaMask
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 8])
            return [4, this.web3.eth.personal.sign(hash, publicKey, password)]
          case 2:
            return [2, _a.sent()]
          case 3:
            e_2 = _a.sent()
            if (isMetaMask) {
              throw e_2
            }
            this.logger.warn('Error on personal sign.')
            this.logger.warn(e_2)
            _a.label = 4
          case 4:
            _a.trys.push([4, 6, , 7])
            return [4, this.web3.eth.sign(hash, publicKey)]
          case 5:
            return [2, _a.sent()]
          case 6:
            e2_2 = _a.sent()
            this.logger.error('Error on sign.')
            this.logger.error(e2_2)
            throw new Error('Error executing personal sign')
          case 7:
            return [3, 8]
          case 8:
            return [2]
        }
      })
    })
  }
  SignatureUtils.prototype.verifyText = function (text, signature) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2, this.web3.eth.personal.ecRecover(text, signature)]
      })
    })
  }
  SignatureUtils.prototype.getHash = function (message) {
    return __awaiter(this, void 0, void 0, function () {
      var hex, i, hexMessage
      return __generator(this, function (_a) {
        hex = ''
        for (i = 0; i < message.length; i++) {
          hex += '' + message.charCodeAt(i).toString(16)
        }
        hexMessage = '0x' + hex
        return [2, hexMessage]
      })
    })
  }
  SignatureUtils.prototype.signForAquarius = function (message, account) {
    return __awaiter(this, void 0, void 0, function () {
      var hash, isMetaMask
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.getHash(message)]
          case 1:
            hash = _a.sent()
            isMetaMask =
              this.web3 &&
              this.web3.currentProvider &&
              this.web3.currentProvider.isMetaMask
            try {
              return [
                2,
                this.web3.eth.personal.sign(
                  hash,
                  account.getId(),
                  account.getPassword()
                )
              ]
            } catch (e) {
              if (isMetaMask) {
                throw e
              }
              this.logger.warn('Error on personal sign.')
              this.logger.warn(e)
              return [2, null]
            }
            return [2]
        }
      })
    })
  }
  return SignatureUtils
})()
exports.SignatureUtils = SignatureUtils
//# sourceMappingURL=SignatureUtils.js.map
