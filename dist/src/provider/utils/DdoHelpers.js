import sha256 from 'crypto-js/sha256'
import Web3 from 'web3'
export function generateDid(erc721Address, chainId) {
  erc721Address = Web3.utils.toChecksumAddress(erc721Address)
  const checksum = sha256(erc721Address + chainId.toString(10))
  return `did:op:${checksum.toString()}`
}
export function getHash(data) {
  return sha256(data).toString()
}
//# sourceMappingURL=DdoHelpers.js.map
