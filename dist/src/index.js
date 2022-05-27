'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Migration =
  exports.getAndConvertDDO =
  exports.convertDDO =
  exports.getDDO =
    void 0
var importDDO_1 = require('./DDO/importDDO')
Object.defineProperty(exports, 'getDDO', {
  enumerable: true,
  get: function () {
    return importDDO_1.getDDO
  }
})
var convertDDO_1 = require('./DDO/convertDDO')
Object.defineProperty(exports, 'convertDDO', {
  enumerable: true,
  get: function () {
    return convertDDO_1.convertDDO
  }
})
Object.defineProperty(exports, 'getAndConvertDDO', {
  enumerable: true,
  get: function () {
    return convertDDO_1.getAndConvertDDO
  }
})
var Migration_1 = require('./migration/Migration')
Object.defineProperty(exports, 'Migration', {
  enumerable: true,
  get: function () {
    return Migration_1.Migration
  }
})
//# sourceMappingURL=index.js.map
