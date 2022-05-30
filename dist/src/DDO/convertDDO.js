import { getDDO } from './importDDO'
export async function convertDDO(
  v4Did,
  v3DDO,
  nftAddress,
  erc20Address,
  encryptedFiles
) {
  const publishedDate = new Date(Date.now()).toISOString().split('.')[0] + 'Z'
  const computeOptions = {
    namespace: '',
    allowRawAlgorithm: false,
    allowNetworkAccess: true,
    publisherTrustedAlgorithmPublishers: null,
    publisherTrustedAlgorithms: null
  }
  const newMetadata = {
    created: publishedDate,
    updated: publishedDate,
    type: v3DDO.service[0].attributes.main.type,
    name: v3DDO.service[0].attributes.main.name,
    description: v3DDO.service[0].attributes.additionalInformation.description,
    tags: v3DDO.service[0].attributes.additionalInformation.tags,
    author: v3DDO.service[0].attributes.main.author,
    license: v3DDO.service[0].attributes.main.license,
    links: v3DDO.service[0].attributes.additionalInformation.links.url,
    additionalInformation: {
      termsAndConditions:
        v3DDO.service[0].attributes.additionalInformation.termsAndConditions
    }
  }
  const newService = {
    id: v4Did,
    type: v3DDO.service[1].type,
    files: encryptedFiles || '',
    datatokenAddress: erc20Address,
    serviceEndpoint: v3DDO.service[1].serviceEndpoint,
    timeout: v3DDO.service[1].attributes.main.timeout,
    ...(v3DDO.service[1].type === 'compute' && {
      compute: computeOptions
    })
  }
  const v4DDO = {
    '@context': ['https://w3id.org/did/v1'],
    id: v4Did,
    version: '4.0.0',
    chainId: v3DDO.chainId,
    nftAddress: nftAddress,
    metadata: newMetadata,
    services: [newService]
  }
  return v4DDO
}
export async function getAndConvertDDO(
  v3Did,
  v4Did,
  nftAddress,
  erc20Address,
  metadataCacheUri,
  encryptedFiles
) {
  const v3DDO = await getDDO(v3Did, metadataCacheUri)
  const v4DDO = await convertDDO(
    v4Did,
    v3DDO,
    nftAddress,
    erc20Address,
    encryptedFiles
  )
  return v4DDO
}
//# sourceMappingURL=convertDDO.js.map
