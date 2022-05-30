import BigNumber from 'bignumber.js'
export async function getFairGasPrice(web3, config) {
  const x = new BigNumber(await web3.eth.getGasPrice())
  if (config && config.gasFeeMultiplier)
    return x
      .multipliedBy(config.gasFeeMultiplier)
      .integerValue(BigNumber.ROUND_DOWN)
      .toString(10)
  else return x.toString(10)
}
export function setContractDefaults(contract, config) {
  if (config) {
    contract.transactionBlockTimeout = config.transactionBlockTimeout
    contract.transactionConfirmationBlocks =
      config.transactionConfirmationBlocks
    contract.transactionPollingTimeout = config.transactionPollingTimeout
  }
  return contract
}
//# sourceMappingURL=ContractUtils.js.map
