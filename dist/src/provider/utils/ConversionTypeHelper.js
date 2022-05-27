'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.noZeroX = exports.zeroX = exports.zeroXTransformer = void 0
var Logger_1 = require('./Logger')
function inputMatch(input, regexp, conversorName) {
  if (typeof input !== 'string') {
    Logger_1.LoggerInstance.debug('Not input string:')
    Logger_1.LoggerInstance.debug(input)
    throw new Error(
      '['
        .concat(conversorName, '] Expected string, input type: ')
        .concat(typeof input)
    )
  }
  var match = input.match(regexp)
  if (!match) {
    Logger_1.LoggerInstance.warn(
      '['.concat(conversorName, '] Input transformation failed.')
    )
    return { valid: false, output: input }
  }
  return { valid: true, output: match[1] }
}
function zeroXTransformer(input, zeroOutput) {
  if (input === void 0) {
    input = ''
  }
  var _a = inputMatch(input, /^(?:0x)*([a-f0-9]+)$/i, 'zeroXTransformer'),
    valid = _a.valid,
    output = _a.output
  return (zeroOutput && valid ? '0x' : '') + output
}
exports.zeroXTransformer = zeroXTransformer
var zeroX = function (input) {
  return zeroXTransformer(input, true)
}
exports.zeroX = zeroX
var noZeroX = function (input) {
  return zeroXTransformer(input, false)
}
exports.noZeroX = noZeroX
//# sourceMappingURL=ConversionTypeHelper.js.map
