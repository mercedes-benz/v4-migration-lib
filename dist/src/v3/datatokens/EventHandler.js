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
exports.EventHandler = void 0
var ContractEvent_1 = require('./ContractEvent')
var Instantiable_abstract_1 = require('../Instantiable.abstract')
var EventHandler = (function (_super) {
  __extends(EventHandler, _super)
  function EventHandler(config) {
    var _this = _super.call(this) || this
    _this.events = new Set()
    _this.interval = 200
    _this.polling = false
    _this.setInstanceConfig(config)
    return _this
  }
  Object.defineProperty(EventHandler.prototype, 'count', {
    get: function () {
      return this.events.size
    },
    enumerable: false,
    configurable: true
  })
  EventHandler.prototype.subscribe = function (callback) {
    var _this = this
    this.events.add(callback)
    this.checkBlock()
    return {
      unsubscribe: function () {
        return _this.unsubscribe(callback)
      }
    }
  }
  EventHandler.prototype.unsubscribe = function (callback) {
    this.events.delete(callback)
    if (!this.count) {
      clearTimeout(this.lastTimeout)
      delete this.lastBlock
      this.polling = false
    }
  }
  EventHandler.prototype.getEvent = function (contract, eventName, filter) {
    return new ContractEvent_1.ContractEvent(this, contract, eventName, filter)
  }
  EventHandler.prototype.checkBlock = function (isInterval, n) {
    if (n === void 0) {
      n = 0
    }
    return __awaiter(this, void 0, void 0, function () {
      var blockNumber
      var _this = this
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.web3.eth.getBlockNumber()]
          case 1:
            blockNumber = _a.sent()
            if ((this.polling && !isInterval) || !this.count) {
              return [2]
            }
            this.polling = true
            if (!this.lastBlock) {
              this.lastBlock = blockNumber
            }
            if (this.lastBlock !== blockNumber) {
              this.events.forEach(function (fn) {
                return fn(_this.lastBlock + 1)
              })
              this.lastBlock = blockNumber
            }
            this.lastTimeout = global.setTimeout(function () {
              return _this.checkBlock(true, n++)
            }, this.interval)
            return [2]
        }
      })
    })
  }
  return EventHandler
})(Instantiable_abstract_1.Instantiable)
exports.EventHandler = EventHandler
//# sourceMappingURL=EventHandler.js.map