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
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i)
          ar[i] = from[i]
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from))
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.DDO = void 0
var Web3Provider_1 = __importDefault(require('../datatokens/Web3Provider'))
var DDO = (function () {
  function DDO(ddo) {
    if (ddo === void 0) {
      ddo = {}
    }
    this['@context'] = 'https://w3id.org/did/v1'
    this.id = null
    this.publicKey = []
    this.authentication = []
    this.service = []
    Object.assign(this, ddo, {
      created:
        (ddo && ddo.created) ||
        new Date().toISOString().replace(/\.[0-9]{3}/, '')
    })
  }
  DDO.serialize = function (ddo) {
    return JSON.stringify(ddo, null, 2)
  }
  DDO.deserialize = function (ddoString) {
    var ddo = JSON.parse(ddoString)
    return new DDO(ddo)
  }
  DDO.prototype.shortId = function () {
    return this.id.replace('did:op:', '')
  }
  DDO.prototype.findServiceById = function (index) {
    if (isNaN(index)) {
      throw new Error('index is not set')
    }
    var service = this.service.find(function (s) {
      return s.index === index
    })
    return service
  }
  DDO.prototype.findServiceByType = function (serviceType) {
    if (!serviceType) {
      throw new Error('serviceType not set')
    }
    return this.service.find(function (s) {
      return s.type === serviceType
    })
  }
  DDO.prototype.getChecksum = function () {
    var attributes = this.findServiceByType('metadata').attributes
    var _a = attributes.main,
      files = _a.files,
      name = _a.name,
      author = _a.author,
      license = _a.license
    var values = __spreadArray(
      __spreadArray(
        [],
        (files || [])
          .map(function (_a) {
            var checksum = _a.checksum
            return checksum
          })
          .filter(function (_) {
            return !!_
          }),
        true
      ),
      [name, author, license, this.id],
      false
    )
    return Web3Provider_1.default
      .getWeb3()
      .utils.sha3(values.join(''))
      .replace(/^0x([a-f0-9]{64})(:!.+)?$/i, '0x$1')
  }
  DDO.prototype.addProof = function (ocean, publicKey, password) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (this.proof) {
          throw new Error('Proof already exists')
        }
        this.proof = {
          created: new Date().toISOString().replace(/\.[0-9]{3}/, ''),
          creator: publicKey,
          type: 'AddressHash',
          signatureValue: Web3Provider_1.default
            .getWeb3()
            .utils.sha3(publicKey)
            .replace(/^0x([a-f0-9]{64})(:!.+)?$/i, '0x$1')
        }
        return [2]
      })
    })
  }
  return DDO
})()
exports.DDO = DDO
//# sourceMappingURL=DDO.js.map
