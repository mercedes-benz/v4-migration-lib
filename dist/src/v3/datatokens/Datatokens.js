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
exports.DataTokens = void 0
var DTFactory_json_1 = __importDefault(
  require('@oceanprotocol/contracts/artifacts/DTFactory.json')
)
var DataTokenTemplate_json_1 = __importDefault(
  require('@oceanprotocol/contracts/artifacts/DataTokenTemplate.json')
)
var utils_1 = require('../utils')
var bignumber_js_1 = __importDefault(require('bignumber.js'))
var decimal_js_1 = __importDefault(require('decimal.js'))
var Datatokens_1 = require('../utils/Datatokens')
var DataTokens = (function () {
  function DataTokens(
    factoryAddress,
    factoryABI,
    datatokensABI,
    web3,
    logger,
    config
  ) {
    this.GASLIMIT_DEFAULT = 1000000
    this.factoryAddress = factoryAddress
    this.factoryABI = factoryABI || DTFactory_json_1.default.abi
    this.datatokensABI = datatokensABI || DataTokenTemplate_json_1.default.abi
    this.web3 = web3
    this.logger = logger
    this.config = config
    this.startBlock = (config && config.startBlock) || 0
  }
  DataTokens.prototype.generateDtName = function (wordList) {
    var _a = (0, Datatokens_1.generateDatatokenName)(wordList),
      name = _a.name,
      symbol = _a.symbol
    return { name: name, symbol: symbol }
  }
  DataTokens.prototype.create = function (
    metadataCacheUri,
    address,
    cap,
    name,
    symbol
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var factory,
        gasLimitDefault,
        estGas,
        e_1,
        trxReceipt,
        _a,
        _b,
        tokenAddress
      var _c, _d
      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            if (!cap) cap = '1000'
            if (!name || !symbol) {
              ;(_c = this.generateDtName()),
                (name = _c.name),
                (symbol = _c.symbol)
            }
            factory = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.factoryABI, this.factoryAddress, {
                from: address
              }),
              this.config
            )
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _e.label = 1
          case 1:
            _e.trys.push([1, 3, , 4])
            return [
              4,
              factory.methods
                .createToken(
                  metadataCacheUri,
                  name,
                  symbol,
                  this.web3.utils.toWei(cap)
                )
                .estimateGas({ from: address }, function (err, estGas) {
                  return err ? gasLimitDefault : estGas
                })
            ]
          case 2:
            estGas = _e.sent()
            return [3, 4]
          case 3:
            e_1 = _e.sent()
            estGas = gasLimitDefault
            return [3, 4]
          case 4:
            _b = (_a = factory.methods.createToken(
              metadataCacheUri,
              name,
              symbol,
              this.web3.utils.toWei(cap)
            )).send
            _d = {
              from: address,
              gas: estGas + 1
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 5:
            return [4, _b.apply(_a, [((_d.gasPrice = _e.sent()), _d)])]
          case 6:
            trxReceipt = _e.sent()
            tokenAddress = null
            try {
              tokenAddress = trxReceipt.events.TokenCreated.returnValues[0]
            } catch (e) {
              this.logger.error(
                'ERROR: Failed to create datatoken : '.concat(e.message)
              )
            }
            return [2, tokenAddress]
        }
      })
    })
  }
  DataTokens.prototype.approve = function (
    dataTokenAddress,
    spender,
    amount,
    address
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var datatoken, gasLimitDefault, estGas, e_2, trxReceipt, _a, _b
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            datatoken = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress, {
                from: address
              }),
              this.config
            )
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            return [
              4,
              datatoken.methods
                .approve(spender, this.web3.utils.toWei(amount))
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
            _b = (_a = datatoken.methods.approve(
              spender,
              this.web3.utils.toWei(amount)
            )).send
            _c = {
              from: address,
              gas: estGas + 1
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 5:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 6:
            trxReceipt = _d.sent()
            return [2, trxReceipt]
        }
      })
    })
  }
  DataTokens.prototype.mint = function (
    dataTokenAddress,
    address,
    amount,
    toAddress
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var datatoken,
        capAvailble,
        gasLimitDefault_1,
        estGas,
        e_3,
        trxReceipt,
        _a,
        _b
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            datatoken = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress, {
                from: address
              }),
              this.config
            )
            return [4, this.getCap(dataTokenAddress)]
          case 1:
            capAvailble = _d.sent()
            if (!new decimal_js_1.default(capAvailble).gte(amount))
              return [3, 8]
            gasLimitDefault_1 = this.GASLIMIT_DEFAULT
            estGas = void 0
            _d.label = 2
          case 2:
            _d.trys.push([2, 4, , 5])
            return [
              4,
              datatoken.methods
                .mint(toAddress || address, this.web3.utils.toWei(amount))
                .estimateGas({ from: address }, function (err, estGas) {
                  return err ? gasLimitDefault_1 : estGas
                })
            ]
          case 3:
            estGas = _d.sent()
            return [3, 5]
          case 4:
            e_3 = _d.sent()
            estGas = gasLimitDefault_1
            return [3, 5]
          case 5:
            _b = (_a = datatoken.methods.mint(
              toAddress || address,
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
            return [2, trxReceipt]
          case 8:
            throw new Error('Mint amount exceeds cap available')
        }
      })
    })
  }
  DataTokens.prototype.transfer = function (
    dataTokenAddress,
    toAddress,
    amount,
    address
  ) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [
          2,
          this.transferToken(dataTokenAddress, toAddress, amount, address)
        ]
      })
    })
  }
  DataTokens.prototype.transferToken = function (
    dataTokenAddress,
    toAddress,
    amount,
    address
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var weiAmount
      return __generator(this, function (_a) {
        weiAmount = this.web3.utils.toWei(amount)
        return [
          2,
          this.transferWei(dataTokenAddress, toAddress, weiAmount, address)
        ]
      })
    })
  }
  DataTokens.prototype.transferWei = function (
    dataTokenAddress,
    toAddress,
    amount,
    address
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var datatoken, gasLimitDefault, estGas, e_4, trxReceipt, _a, _b
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            datatoken = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress, {
                from: address
              }),
              this.config
            )
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            return [
              4,
              datatoken.methods
                .transfer(toAddress, amount)
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
            _b = (_a = datatoken.methods.transfer(toAddress, amount)).send
            _c = {
              from: address,
              gas: estGas + 1
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 5:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 6:
            trxReceipt = _d.sent()
            return [2, trxReceipt]
        }
      })
    })
  }
  DataTokens.prototype.transferFrom = function (
    dataTokenAddress,
    fromAddress,
    amount,
    address
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var datatoken, gasLimitDefault, estGas, e_5, trxReceipt, _a, _b
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            datatoken = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress, {
                from: address
              }),
              this.config
            )
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            return [
              4,
              datatoken.methods
                .transferFrom(
                  fromAddress,
                  address,
                  this.web3.utils.toWei(amount)
                )
                .estimateGas({ from: address }, function (err, estGas) {
                  return err ? gasLimitDefault : estGas
                })
            ]
          case 2:
            estGas = _d.sent()
            return [3, 4]
          case 3:
            e_5 = _d.sent()
            estGas = gasLimitDefault
            return [3, 4]
          case 4:
            _b = (_a = datatoken.methods.transferFrom(
              fromAddress,
              address,
              this.web3.utils.toWei(amount)
            )).send
            _c = {
              from: address,
              gas: estGas + 1
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 5:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 6:
            trxReceipt = _d.sent()
            return [2, trxReceipt]
        }
      })
    })
  }
  DataTokens.prototype.balance = function (dataTokenAddress, address) {
    return __awaiter(this, void 0, void 0, function () {
      var datatoken, balance
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            datatoken = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress, {
                from: address
              }),
              this.config
            )
            return [4, datatoken.methods.balanceOf(address).call()]
          case 1:
            balance = _a.sent()
            return [2, this.web3.utils.fromWei(balance)]
        }
      })
    })
  }
  DataTokens.prototype.allowance = function (dataTokenAddress, owner, spender) {
    return __awaiter(this, void 0, void 0, function () {
      var datatoken, trxReceipt
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            datatoken = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress, {
                from: spender
              }),
              this.config
            )
            return [4, datatoken.methods.allowance(owner, spender).call()]
          case 1:
            trxReceipt = _a.sent()
            return [2, this.web3.utils.fromWei(trxReceipt)]
        }
      })
    })
  }
  DataTokens.prototype.getBlob = function (dataTokenAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var datatoken, trxReceipt
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            datatoken = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress),
              this.config
            )
            return [4, datatoken.methods.blob().call()]
          case 1:
            trxReceipt = _a.sent()
            return [2, trxReceipt]
        }
      })
    })
  }
  DataTokens.prototype.getName = function (dataTokenAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var datatoken, trxReceipt
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            datatoken = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress),
              this.config
            )
            return [4, datatoken.methods.name().call()]
          case 1:
            trxReceipt = _a.sent()
            return [2, trxReceipt]
        }
      })
    })
  }
  DataTokens.prototype.getSymbol = function (dataTokenAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var datatoken, trxReceipt
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            datatoken = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress),
              this.config
            )
            return [4, datatoken.methods.symbol().call()]
          case 1:
            trxReceipt = _a.sent()
            return [2, trxReceipt]
        }
      })
    })
  }
  DataTokens.prototype.getCap = function (dataTokenAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var datatoken, trxReceipt
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            datatoken = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress),
              this.config
            )
            return [4, datatoken.methods.cap().call()]
          case 1:
            trxReceipt = _a.sent()
            return [2, this.web3.utils.fromWei(trxReceipt)]
        }
      })
    })
  }
  DataTokens.prototype.toWei = function (amount) {
    return this.web3.utils.toWei(amount)
  }
  DataTokens.prototype.fromWei = function (amount) {
    return this.web3.utils.fromWei(amount)
  }
  DataTokens.prototype.startOrder = function (
    dataTokenAddress,
    consumer,
    amount,
    serviceId,
    mpFeeAddress,
    address
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var datatoken, gasLimitDefault_2, estGas, e_6, trxReceipt, _a, _b, e_7
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            datatoken = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress, {
                from: address
              }),
              this.config
            )
            if (!mpFeeAddress)
              mpFeeAddress = '0x0000000000000000000000000000000000000000'
            _d.label = 1
          case 1:
            _d.trys.push([1, 8, , 9])
            gasLimitDefault_2 = this.GASLIMIT_DEFAULT
            estGas = void 0
            _d.label = 2
          case 2:
            _d.trys.push([2, 4, , 5])
            return [
              4,
              datatoken.methods
                .startOrder(
                  consumer,
                  this.web3.utils.toWei(amount),
                  String(serviceId),
                  mpFeeAddress
                )
                .estimateGas({ from: address }, function (err, estGas) {
                  return err ? gasLimitDefault_2 : estGas
                })
            ]
          case 3:
            estGas = _d.sent()
            return [3, 5]
          case 4:
            e_6 = _d.sent()
            estGas = gasLimitDefault_2
            return [3, 5]
          case 5:
            _b = (_a = datatoken.methods.startOrder(
              consumer,
              this.web3.utils.toWei(amount),
              String(serviceId),
              mpFeeAddress
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
            return [2, trxReceipt]
          case 8:
            e_7 = _d.sent()
            this.logger.error(
              'ERROR: Failed to start order : '.concat(e_7.message)
            )
            throw new Error('Failed to start order: '.concat(e_7.message))
          case 9:
            return [2]
        }
      })
    })
  }
  DataTokens.prototype.getPreviousValidOrders = function (
    dataTokenAddress,
    amount,
    serviceId,
    timeout,
    address
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var datatoken,
        fromBlock,
        lastBlock,
        events,
        i,
        blockDetails,
        expiry,
        unixTime
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            datatoken = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress, {
                from: address
              }),
              this.config
            )
            if (!(timeout > 0)) return [3, 2]
            return [4, this.web3.eth.getBlockNumber()]
          case 1:
            lastBlock = _a.sent()
            fromBlock = lastBlock - timeout
            if (fromBlock < this.startBlock) fromBlock = this.startBlock
            return [3, 3]
          case 2:
            fromBlock = this.startBlock
            _a.label = 3
          case 3:
            return [
              4,
              datatoken.getPastEvents('OrderStarted', {
                filter: { consumer: address },
                fromBlock: fromBlock,
                toBlock: 'latest'
              })
            ]
          case 4:
            events = _a.sent()
            i = 0
            _a.label = 5
          case 5:
            if (!(i < events.length)) return [3, 8]
            if (
              !(
                String(events[i].returnValues.amount) ===
                  this.web3.utils.toWei(String(amount)) &&
                String(events[i].returnValues.serviceId) ===
                  String(serviceId) &&
                events[i].returnValues.consumer.toLowerCase() ===
                  address.toLowerCase()
              )
            )
              return [3, 7]
            if (timeout === 0) return [2, events[i].transactionHash]
            return [4, this.web3.eth.getBlock(events[i].blockHash)]
          case 6:
            blockDetails = _a.sent()
            expiry = new bignumber_js_1.default(blockDetails.timestamp).plus(
              timeout
            )
            unixTime = new bignumber_js_1.default(Math.floor(Date.now() / 1000))
            if (unixTime.isLessThan(expiry))
              return [2, events[i].transactionHash]
            _a.label = 7
          case 7:
            i++
            return [3, 5]
          case 8:
            return [2, null]
        }
      })
    })
  }
  DataTokens.prototype.getStartOrderEventSignature = function () {
    var abi = this.datatokensABI
    var eventdata = abi.find(function (o) {
      if (o.name === 'OrderStarted' && o.type === 'event') return o
    })
    var topic = this.web3.eth.abi.encodeEventSignature(eventdata)
    return topic
  }
  DataTokens.prototype.proposeMinter = function (
    dataTokenAddress,
    newMinterAddress,
    address
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var datatoken, gasLimitDefault, estGas, e_8, trxReceipt, _a, _b, e_9
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            datatoken = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress, {
                from: address
              }),
              this.config
            )
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            return [
              4,
              datatoken.methods
                .proposeMinter(newMinterAddress)
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
            _d.trys.push([4, 7, , 8])
            _b = (_a = datatoken.methods.proposeMinter(newMinterAddress)).send
            _c = {
              from: address,
              gas: estGas + 1
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 5:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 6:
            trxReceipt = _d.sent()
            return [2, trxReceipt]
          case 7:
            e_9 = _d.sent()
            this.logger.error('ERROR: Propose minter failed')
            return [2, null]
          case 8:
            return [2]
        }
      })
    })
  }
  DataTokens.prototype.approveMinter = function (dataTokenAddress, address) {
    return __awaiter(this, void 0, void 0, function () {
      var datatoken, gasLimitDefault, estGas, e_10, trxReceipt, _a, _b, e_11
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            datatoken = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress, {
                from: address
              }),
              this.config
            )
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            return [
              4,
              datatoken.methods
                .approveMinter()
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
            _d.trys.push([4, 7, , 8])
            _b = (_a = datatoken.methods.approveMinter()).send
            _c = {
              from: address,
              gas: estGas + 1
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 5:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 6:
            trxReceipt = _d.sent()
            return [2, trxReceipt]
          case 7:
            e_11 = _d.sent()
            return [2, null]
          case 8:
            return [2]
        }
      })
    })
  }
  DataTokens.prototype.isMinter = function (dataTokenAddress, address) {
    return __awaiter(this, void 0, void 0, function () {
      var datatoken, trxReceipt
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            datatoken = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.datatokensABI, dataTokenAddress),
              this.config
            )
            return [4, datatoken.methods.isMinter(address).call()]
          case 1:
            trxReceipt = _a.sent()
            return [2, trxReceipt]
        }
      })
    })
  }
  return DataTokens
})()
exports.DataTokens = DataTokens
//# sourceMappingURL=Datatokens.js.map