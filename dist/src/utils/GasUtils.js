import BigNumber from 'bignumber.js'
export async function getFairGasPrice(web3) {
  const x = new BigNumber(await web3.eth.getGasPrice())
  return x.multipliedBy(1.05).integerValue(BigNumber.ROUND_DOWN).toString(10)
}
//# sourceMappingURL=GasUtils.js.map
