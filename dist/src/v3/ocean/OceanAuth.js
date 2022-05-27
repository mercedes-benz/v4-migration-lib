'use strict'
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]
        }
      return extendStatics(d, b)
    }
    return function (d, b) {
      if (typeof b !== 'function' && b !== null)
        throw new TypeError(
          'Class extends value ' + String(b) + ' is not a constructor or null'
        )
      extendStatics(d, b)
      function __() {
        this.constructor = d
      }
      d.prototype =
        b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
    }
  })()
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
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
exports.OceanAuth = void 0
var Instantiable_abstract_1 = require('../Instantiable.abstract')
var defaultAuthMessage = 'Ocean Protocol Authentication'
var defaultExpirationTime = 30 * 24 * 60 * 60 * 1000
var localStorageKey = 'SquidTokens'
var OceanAuth = (function (_super) {
  __extends(OceanAuth, _super)
  function OceanAuth() {
    return (_super !== null && _super.apply(this, arguments)) || this
  }
  OceanAuth.getInstance = function (config) {
    return __awaiter(this, void 0, void 0, function () {
      var instance
      return __generator(this, function (_a) {
        instance = new OceanAuth()
        instance.setInstanceConfig(config)
        return [2, instance]
      })
    })
  }
  OceanAuth.prototype.get = function (account) {
    return __awaiter(this, void 0, void 0, function () {
      var time, message, signature, _a
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            time = Math.floor(Date.now() / 1000)
            message = ''.concat(this.getMessage(), '\n').concat(time)
            _b.label = 1
          case 1:
            _b.trys.push([1, 3, , 4])
            return [
              4,
              this.ocean.utils.signature.signText(
                message,
                account.getId(),
                account.getPassword()
              )
            ]
          case 2:
            signature = _b.sent()
            return [2, ''.concat(signature, '-').concat(time)]
          case 3:
            _a = _b.sent()
            throw new Error('User denied the signature.')
          case 4:
            return [2]
        }
      })
    })
  }
  OceanAuth.prototype.check = function (token) {
    return __awaiter(this, void 0, void 0, function () {
      var expiration, _a, signature, timestamp, message, _b, _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            expiration = this.getExpiration()
            ;(_a = token.split('-')), (signature = _a[0]), (timestamp = _a[1])
            message = ''.concat(this.getMessage(), '\n').concat(timestamp)
            if (+timestamp * 1000 + expiration < Date.now()) {
              return [2, '0x'.concat('0'.repeat(40))]
            }
            _c = (_b = this.web3.utils).toChecksumAddress
            return [
              4,
              this.ocean.utils.signature.verifyText(message, signature)
            ]
          case 1:
            return [2, _c.apply(_b, [_d.sent()])]
        }
      })
    })
  }
  OceanAuth.prototype.store = function (account) {
    return __awaiter(this, void 0, void 0, function () {
      var token
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.get(account)]
          case 1:
            token = _a.sent()
            this.writeToken(account.getId(), token)
            return [2]
        }
      })
    })
  }
  OceanAuth.prototype.restore = function (account) {
    return __awaiter(this, void 0, void 0, function () {
      var token, signer
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            try {
              token = this.readToken(account.getId())
            } catch (_b) {
              return [2]
            }
            if (!token) {
              return [2]
            }
            return [4, this.check(token)]
          case 1:
            signer = _a.sent()
            if (signer.toLowerCase() !== account.getId().toLowerCase()) {
              return [2]
            }
            return [2, token]
        }
      })
    })
  }
  OceanAuth.prototype.isStored = function (account) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.restore(account)]
          case 1:
            return [2, !!_a.sent()]
        }
      })
    })
  }
  OceanAuth.prototype.writeToken = function (address, token) {
    var _a
    var localStorage = this.getLocalStorage()
    var storedTokens = localStorage.getItem(localStorageKey)
    var tokens = storedTokens ? JSON.parse(storedTokens) : {}
    localStorage.setItem(
      localStorageKey,
      JSON.stringify(
        __assign(__assign({}, tokens), ((_a = {}), (_a[address] = token), _a))
      )
    )
  }
  OceanAuth.prototype.readToken = function (address) {
    var localStorage = this.getLocalStorage()
    var storedTokens = localStorage.getItem(localStorageKey)
    var tokens = storedTokens ? JSON.parse(storedTokens) : {}
    return tokens[address]
  }
  OceanAuth.prototype.getLocalStorage = function () {
    try {
      localStorage.getItem('')
    } catch (_a) {
      throw new Error(
        'LocalStorage is not supported. This feature is only available on browsers.'
      )
    }
    return localStorage
  }
  OceanAuth.prototype.getMessage = function () {
    return this.config.authMessage || defaultAuthMessage
  }
  OceanAuth.prototype.getExpiration = function () {
    return this.config.authTokenExpiration || defaultExpirationTime
  }
  return OceanAuth
})(Instantiable_abstract_1.Instantiable)
exports.OceanAuth = OceanAuth
//# sourceMappingURL=OceanAuth.js.map