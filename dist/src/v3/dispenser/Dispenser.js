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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.OceanDispenser =
  exports.DispenserCancelMinterProgressStep =
  exports.DispenserMakeMinterProgressStep =
    void 0
var Dispenser_json_1 = __importDefault(
  require('@oceanprotocol/contracts/artifacts/Dispenser.json')
)
var utils_1 = require('../utils')
var decimal_js_1 = __importDefault(require('decimal.js'))
var DispenserMakeMinterProgressStep
;(function (DispenserMakeMinterProgressStep) {
  DispenserMakeMinterProgressStep[
    (DispenserMakeMinterProgressStep['MakeDispenserMinter'] = 0)
  ] = 'MakeDispenserMinter'
  DispenserMakeMinterProgressStep[
    (DispenserMakeMinterProgressStep['AcceptingNewMinter'] = 1)
  ] = 'AcceptingNewMinter'
})(
  (DispenserMakeMinterProgressStep =
    exports.DispenserMakeMinterProgressStep ||
    (exports.DispenserMakeMinterProgressStep = {}))
)
var DispenserCancelMinterProgressStep
;(function (DispenserCancelMinterProgressStep) {
  DispenserCancelMinterProgressStep[
    (DispenserCancelMinterProgressStep['MakeOwnerMinter'] = 0)
  ] = 'MakeOwnerMinter'
  DispenserCancelMinterProgressStep[
    (DispenserCancelMinterProgressStep['AcceptingNewMinter'] = 1)
  ] = 'AcceptingNewMinter'
})(
  (DispenserCancelMinterProgressStep =
    exports.DispenserCancelMinterProgressStep ||
    (exports.DispenserCancelMinterProgressStep = {}))
)
var OceanDispenser = (function () {
  function OceanDispenser(
    web3,
    logger,
    dispenserAddress,
    dispenserABI,
    datatokens,
    config
  ) {
    if (dispenserAddress === void 0) {
      dispenserAddress = null
    }
    if (dispenserABI === void 0) {
      dispenserABI = null
    }
    this.GASLIMIT_DEFAULT = 1000000
    this.contract = null
    this.web3 = web3
    this.config = config
    this.dispenserAddress = dispenserAddress
    this.startBlock = (config && config.startBlock) || 0
    this.dispenserABI = dispenserABI || Dispenser_json_1.default.abi
    this.datatokens = datatokens
    if (web3)
      this.contract = (0, utils_1.setContractDefaults)(
        new this.web3.eth.Contract(this.dispenserABI, this.dispenserAddress),
        this.config
      )
    this.logger = logger
  }
  OceanDispenser.prototype.status = function (dataTokenAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var result, e_1
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3])
            return [4, this.contract.methods.status(dataTokenAddress).call()]
          case 1:
            result = _a.sent()
            result.maxTokens = this.web3.utils.fromWei(result.maxTokens)
            result.maxBalance = this.web3.utils.fromWei(result.maxBalance)
            result.balance = this.web3.utils.fromWei(result.balance)
            return [2, result]
          case 2:
            e_1 = _a.sent()
            this.logger.warn(
              'No dispenser available for data token: '.concat(dataTokenAddress)
            )
            return [3, 3]
          case 3:
            return [2, null]
        }
      })
    })
  }
  OceanDispenser.prototype.activate = function (
    dataToken,
    maxTokens,
    maxBalance,
    address
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var estGas, gasLimitDefault, e_2, trxReceipt, _a, _b, e_3
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            return [
              4,
              this.contract.methods
                .activate(
                  dataToken,
                  this.web3.utils.toWei(maxTokens),
                  this.web3.utils.toWei(maxBalance)
                )
                .estimateGas({ from: address }, function (err, estGas) {
                  return err ? gasLimitDefault : estGas
                })
            ]
          case 2:
            estGas = _d.sent()
            return [3, 4]
          case 3:
            e_2 = _d.sent()
            estGas = gasLimitDefault
            return [3, 4]
          case 4:
            trxReceipt = null
            _d.label = 5
          case 5:
            _d.trys.push([5, 8, , 9])
            _b = (_a = this.contract.methods.activate(
              dataToken,
              this.web3.utils.toWei(maxTokens),
              this.web3.utils.toWei(maxBalance)
            )).send
            _c = {
              from: address,
              gas: estGas + 1
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 6:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 7:
            trxReceipt = _d.sent()
            return [3, 9]
          case 8:
            e_3 = _d.sent()
            this.logger.error(
              'ERROR: Failed to activate dispenser: '.concat(e_3.message)
            )
            return [3, 9]
          case 9:
            return [2, trxReceipt]
        }
      })
    })
  }
  OceanDispenser.prototype.deactivate = function (dataToken, address) {
    return __awaiter(this, void 0, void 0, function () {
      var estGas, gasLimitDefault, e_4, trxReceipt, _a, _b, e_5
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            return [
              4,
              this.contract.methods
                .deactivate(dataToken)
                .estimateGas({ from: address }, function (err, estGas) {
                  return err ? gasLimitDefault : estGas
                })
            ]
          case 2:
            estGas = _d.sent()
            return [3, 4]
          case 3:
            e_4 = _d.sent()
            estGas = gasLimitDefault
            return [3, 4]
          case 4:
            trxReceipt = null
            _d.label = 5
          case 5:
            _d.trys.push([5, 8, , 9])
            _b = (_a = this.contract.methods.deactivate(dataToken)).send
            _c = {
              from: address,
              gas: estGas + 1
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 6:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 7:
            trxReceipt = _d.sent()
            return [3, 9]
          case 8:
            e_5 = _d.sent()
            this.logger.error(
              'ERROR: Failed to deactivate dispenser: '.concat(e_5.message)
            )
            return [3, 9]
          case 9:
            return [2, trxReceipt]
        }
      })
    })
  }
  OceanDispenser.prototype.makeMinter = function (dataToken, address) {
    var _this = this
    return new utils_1.SubscribablePromise(function (observer) {
      return __awaiter(_this, void 0, void 0, function () {
        var estGas, gasLimitDefault, minterTx, e_6, trxReceipt, _a, _b, e_7
        var _c
        return __generator(this, function (_d) {
          switch (_d.label) {
            case 0:
              observer.next(DispenserMakeMinterProgressStep.MakeDispenserMinter)
              gasLimitDefault = this.GASLIMIT_DEFAULT
              return [
                4,
                this.datatokens.proposeMinter(
                  dataToken,
                  this.dispenserAddress,
                  address
                )
              ]
            case 1:
              minterTx = _d.sent()
              if (!minterTx) {
                return [2, null]
              }
              observer.next(DispenserMakeMinterProgressStep.AcceptingNewMinter)
              _d.label = 2
            case 2:
              _d.trys.push([2, 4, , 5])
              return [
                4,
                this.contract.methods
                  .acceptMinter(dataToken)
                  .estimateGas({ from: address }, function (err, estGas) {
                    return err ? gasLimitDefault : estGas
                  })
              ]
            case 3:
              estGas = _d.sent()
              return [3, 5]
            case 4:
              e_6 = _d.sent()
              estGas = gasLimitDefault
              return [3, 5]
            case 5:
              trxReceipt = null
              _d.label = 6
            case 6:
              _d.trys.push([6, 9, , 10])
              _b = (_a = this.contract.methods.acceptMinter(dataToken)).send
              _c = {
                from: address,
                gas: estGas + 1
              }
              return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
            case 7:
              return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
            case 8:
              trxReceipt = _d.sent()
              return [3, 10]
            case 9:
              e_7 = _d.sent()
              this.logger.error(
                'ERROR: Failed to accept minter role: '.concat(e_7.message)
              )
              return [3, 10]
            case 10:
              return [2, trxReceipt]
          }
        })
      })
    })
  }
  OceanDispenser.prototype.cancelMinter = function (dataToken, address) {
    var _this = this
    return new utils_1.SubscribablePromise(function (observer) {
      return __awaiter(_this, void 0, void 0, function () {
        var estGas, gasLimitDefault, e_8, trxReceipt, _a, _b, e_9, minterTx
        var _c
        return __generator(this, function (_d) {
          switch (_d.label) {
            case 0:
              observer.next(DispenserCancelMinterProgressStep.MakeOwnerMinter)
              gasLimitDefault = this.GASLIMIT_DEFAULT
              _d.label = 1
            case 1:
              _d.trys.push([1, 3, , 4])
              return [
                4,
                this.contract.methods
                  .removeMinter(dataToken)
                  .estimateGas({ from: address }, function (err, estGas) {
                    return err ? gasLimitDefault : estGas
                  })
              ]
            case 2:
              estGas = _d.sent()
              return [3, 4]
            case 3:
              e_8 = _d.sent()
              estGas = gasLimitDefault
              return [3, 4]
            case 4:
              trxReceipt = null
              _d.label = 5
            case 5:
              _d.trys.push([5, 8, , 9])
              _b = (_a = this.contract.methods.removeMinter(dataToken)).send
              _c = {
                from: address,
                gas: estGas + 1
              }
              return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
            case 6:
              return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
            case 7:
              trxReceipt = _d.sent()
              return [3, 9]
            case 8:
              e_9 = _d.sent()
              this.logger.error(
                'ERROR: Failed to remove minter role: '.concat(e_9.message)
              )
              return [3, 9]
            case 9:
              if (!trxReceipt) {
                return [2, null]
              }
              observer.next(
                DispenserCancelMinterProgressStep.AcceptingNewMinter
              )
              return [4, this.datatokens.approveMinter(dataToken, address)]
            case 10:
              minterTx = _d.sent()
              return [2, minterTx]
          }
        })
      })
    })
  }
  OceanDispenser.prototype.dispense = function (dataToken, address, amount) {
    if (amount === void 0) {
      amount = '1'
    }
    return __awaiter(this, void 0, void 0, function () {
      var estGas, gasLimitDefault, e_10, trxReceipt, _a, _b, e_11
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            return [
              4,
              this.contract.methods
                .dispense(dataToken, this.web3.utils.toWei(amount))
                .estimateGas({ from: address }, function (err, estGas) {
                  return err ? gasLimitDefault : estGas
                })
            ]
          case 2:
            estGas = _d.sent()
            return [3, 4]
          case 3:
            e_10 = _d.sent()
            estGas = gasLimitDefault
            return [3, 4]
          case 4:
            trxReceipt = null
            _d.label = 5
          case 5:
            _d.trys.push([5, 8, , 9])
            _b = (_a = this.contract.methods.dispense(
              dataToken,
              this.web3.utils.toWei(amount)
            )).send
            _c = {
              from: address,
              gas: estGas + 1
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 6:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 7:
            trxReceipt = _d.sent()
            return [3, 9]
          case 8:
            e_11 = _d.sent()
            this.logger.error(
              'ERROR: Failed to dispense tokens: '.concat(e_11.message)
            )
            return [3, 9]
          case 9:
            return [2, trxReceipt]
        }
      })
    })
  }
  OceanDispenser.prototype.ownerWithdraw = function (dataToken, address) {
    return __awaiter(this, void 0, void 0, function () {
      var estGas, gasLimitDefault, e_12, trxReceipt, _a, _b, e_13
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            return [
              4,
              this.contract.methods
                .ownerWithdraw(dataToken)
                .estimateGas({ from: address }, function (err, estGas) {
                  return err ? gasLimitDefault : estGas
                })
            ]
          case 2:
            estGas = _d.sent()
            return [3, 4]
          case 3:
            e_12 = _d.sent()
            estGas = gasLimitDefault
            return [3, 4]
          case 4:
            trxReceipt = null
            _d.label = 5
          case 5:
            _d.trys.push([5, 8, , 9])
            _b = (_a = this.contract.methods.ownerWithdraw(dataToken)).send
            _c = {
              from: address,
              gas: estGas + 1
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 6:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 7:
            trxReceipt = _d.sent()
            return [3, 9]
          case 8:
            e_13 = _d.sent()
            this.logger.error(
              'ERROR: Failed to withdraw tokens: '.concat(e_13.message)
            )
            return [3, 9]
          case 9:
            return [2, trxReceipt]
        }
      })
    })
  }
  OceanDispenser.prototype.isDispensable = function (
    dataToken,
    address,
    amount
  ) {
    if (amount === void 0) {
      amount = '1'
    }
    return __awaiter(this, void 0, void 0, function () {
      var status, userBalance, _a, contractBalance
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4, this.status(dataToken)]
          case 1:
            status = _b.sent()
            if (!status) return [2, false]
            if (status.active === false) return [2, false]
            _a = decimal_js_1.default.bind
            return [4, this.datatokens.balance(dataToken, address)]
          case 2:
            userBalance = new (_a.apply(decimal_js_1.default, [
              void 0,
              _b.sent()
            ]))()
            if (userBalance.greaterThanOrEqualTo(status.maxBalance))
              return [2, false]
            if (
              new decimal_js_1.default(String(amount)).greaterThan(
                status.maxTokens
              )
            )
              return [2, false]
            contractBalance = new decimal_js_1.default(status.balance)
            if (
              contractBalance.greaterThanOrEqualTo(amount) ||
              status.isTrueMinter === true
            )
              return [2, true]
            return [2, false]
        }
      })
    })
  }
  return OceanDispenser
})()
exports.OceanDispenser = OceanDispenser
//# sourceMappingURL=Dispenser.js.map
