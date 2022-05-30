import { LoggerInstance } from './Logger'
// Shared functions
function inputMatch(input, regexp, conversorName) {
  if (typeof input !== 'string') {
    LoggerInstance.debug('Not input string:')
    LoggerInstance.debug(input)
    throw new Error(
      `[${conversorName}] Expected string, input type: ${typeof input}`
    )
  }
  const match = input.match(regexp)
  if (!match) {
    LoggerInstance.warn(`[${conversorName}] Input transformation failed.`)
    return { valid: false, output: input }
  }
  return { valid: true, output: match[1] }
}
export function zeroXTransformer(input = '', zeroOutput) {
  const { valid, output } = inputMatch(
    input,
    /^(?:0x)*([a-f0-9]+)$/i,
    'zeroXTransformer'
  )
  return (zeroOutput && valid ? '0x' : '') + output
}
export const zeroX = (input) => zeroXTransformer(input, true)
export const noZeroX = (input) => zeroXTransformer(input, false)
//# sourceMappingURL=ConversionTypeHelper.js.map
