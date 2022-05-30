import { noZeroX, assetResolve } from '../utils'
import { Instantiable } from '../Instantiable.abstract'
import fetch from 'cross-fetch'
/**
 * Provides an interface for provider service.
 * Provider service is the technical component executed
 * by the Publishers allowing to them to provide extended
 * data services.
 */
export class Provider extends Instantiable {
  nonce
  baseUrl
  servicesEndpoints
  computeAddress
  providerAddress
  providerVersion
  computeLimits
  /**
   * Returns the instance of Provider.
   * @return {Promise<Assets>}
   */
  static async getInstance(config) {
    const instance = new Provider()
    instance.setInstanceConfig(config)
    instance.nonce = '0'
    await instance.setBaseUrl(config.config.providerUri)
    return instance
  }
  async setBaseUrl(url) {
    this.baseUrl = url
    this.servicesEndpoints = await this.getServiceEndpoints()
    return true
  }
  get url() {
    return this.baseUrl
  }
  /**
   * Returns the service endpoints that exist
   * in provider.
   * @return {Promise<ServiceEndpoint[]>}
   */
  async getServiceEndpoints() {
    const serviceEndpoints = []
    try {
      const result = await (await this.ocean.utils.fetch.get(this.url)).json()
      this.providerAddress = result.providerAddress
      if ('computeAddress' in result)
        this.computeAddress = result.computeAddress
      if ('version' in result) this.providerVersion = result.version
      if ('computeLimits' in result) this.computeLimits = result.computeLimits
      for (const i in result.serviceEndpoints) {
        const endpoint = {
          serviceName: i,
          method: result.serviceEndpoints[i][0],
          urlPath: this.url + result.serviceEndpoints[i][1]
        }
        serviceEndpoints.push(endpoint)
      }
      return serviceEndpoints
    } catch (e) {
      this.logger.error('Finding the service endpoints failed:', e)
      return null
    }
  }
  getEndpointURL(serviceName) {
    if (!this.servicesEndpoints) return null
    return this.servicesEndpoints.find((s) => s.serviceName === serviceName)
  }
  async createSignature(account, agreementId) {
    const signature = await this.ocean.utils.signature.signText(
      noZeroX(agreementId),
      account.getId()
    )
    return signature
  }
  async createHashSignature(account, message) {
    const signature = await this.ocean.utils.signature.signWithHash(
      message,
      account.getId()
    )
    return signature
  }
  async encrypt(did, document, account) {
    await this.getNonce(account.getId())
    const args = {
      documentId: did,
      document: JSON.stringify(document),
      publisherAddress: account.getId()
    }
    const path = this.getEncryptEndpoint()
      ? this.getEncryptEndpoint().urlPath
      : null
    if (!path) return null
    try {
      const response = await this.ocean.utils.fetch.post(
        path,
        decodeURI(JSON.stringify(args))
      )
      return (await response.json()).encryptedDocument
    } catch (e) {
      this.logger.error(e)
      throw new Error('HTTP request failed')
    }
  }
  /** Get URL details (if possible)
   * @param {String | DID} url or did
   * @return {Promise<File[]>} urlDetails
   */
  async fileinfo(url) {
    const args = { url }
    const files = []
    const path = this.getFileinfoEndpoint()
      ? this.getFileinfoEndpoint().urlPath
      : null
    if (!path) return null
    try {
      const response = await this.ocean.utils.fetch.post(
        path,
        JSON.stringify(args)
      )
      const results = await response.json()
      for (const result of results) {
        files.push(result)
      }
      return files
    } catch (e) {
      return null
    }
  }
  async isFileConsumable(did, serviceIndex) {
    const args = { did: did.getDid() }
    const ddo = await this.ocean.metadataCache.retrieveDDO(did)
    if (!ddo) return false
    const service = ddo.findServiceById(serviceIndex)
    if (!service) return false
    const path = service.serviceEndpoint + '/api/v1/services/fileinfo'
    try {
      const response = await this.ocean.utils.fetch.post(
        path,
        JSON.stringify(args)
      )
      const results = await response.json()
      return results[0].valid
    } catch (e) {
      return false
    }
  }
  /** Get nonce from provider
   * @param {String} consumerAddress
   * @return {Promise<string>} string
   */
  async getNonce(consumerAddress) {
    const path = this.getNonceEndpoint()
      ? this.getNonceEndpoint().urlPath
      : null
    if (!path) return null
    try {
      const response = await this.ocean.utils.fetch.get(
        path + `?userAddress=${consumerAddress}`
      )
      this.nonce = String((await response.json()).nonce)
      return this.nonce
    } catch (e) {
      this.logger.error(e)
      throw new Error('HTTP request failed')
    }
  }
  async initialize(
    asset,
    serviceIndex,
    serviceType,
    consumerAddress,
    userCustomParameters
  ) {
    const { did, ddo } = await assetResolve(asset, this.ocean)
    let initializeUrl = this.getInitializeEndpoint()
      ? this.getInitializeEndpoint().urlPath
      : null
    if (!initializeUrl) return null
    initializeUrl += `?documentId=${did}`
    initializeUrl += `&serviceId=${serviceIndex}`
    initializeUrl += `&serviceType=${serviceType}`
    initializeUrl += `&dataToken=${ddo.dataToken}`
    initializeUrl += `&consumerAddress=${consumerAddress}`
    if (userCustomParameters)
      initializeUrl +=
        '&userdata=' + encodeURI(JSON.stringify(userCustomParameters))
    try {
      const response = await this.ocean.utils.fetch.get(initializeUrl)
      return await response.text()
    } catch (e) {
      this.logger.error(e)
      throw new Error('Asset URL not found or not available.')
    }
  }
  async download(
    did,
    txId,
    tokenAddress,
    serviceType,
    serviceIndex,
    destination,
    account,
    files,
    index = -1,
    userCustomParameters
  ) {
    await this.getNonce(account.getId())
    const signature = await this.createSignature(account, did + this.nonce)
    const path = this.getDownloadEndpoint()
      ? this.getDownloadEndpoint().urlPath
      : null
    if (!path) return null
    const filesPromises = files
      .filter((_, i) => index === -1 || i === index)
      .map(async ({ index: i }) => {
        let consumeUrl = path
        consumeUrl += `?fileIndex=${i}`
        consumeUrl += `&documentId=${did}`
        consumeUrl += `&serviceId=${serviceIndex}`
        consumeUrl += `&serviceType=${serviceType}`
        consumeUrl += `&dataToken=${tokenAddress}`
        consumeUrl += `&transferTxId=${txId}`
        consumeUrl += `&consumerAddress=${account.getId()}`
        consumeUrl += `&signature=${signature}`
        if (userCustomParameters)
          consumeUrl +=
            '&userdata=' + encodeURI(JSON.stringify(userCustomParameters))
        try {
          !destination
            ? await this.ocean.utils.fetch.downloadFileBrowser(consumeUrl)
            : await this.ocean.utils.fetch.downloadFile(
                consumeUrl,
                destination,
                i
              )
        } catch (e) {
          this.logger.error('Error consuming assets')
          this.logger.error(e)
          throw e
        }
      })
    await Promise.all(filesPromises)
    return destination
  }
  /** Instruct the provider to start a compute job
   */
  async computeStart(
    did,
    consumerAccount,
    algorithm,
    output,
    txId,
    serviceIndex,
    serviceType,
    tokenAddress,
    additionalInputs,
    userCustomParameters
  ) {
    const address = consumerAccount.getId()
    await this.getNonce(consumerAccount.getId())
    const payload = Object()
    payload.documentId = noZeroX(did)
    let signatureMessage = address
    signatureMessage += (did && `${noZeroX(did)}`) || ''
    signatureMessage += this.nonce
    const signature = await this.createHashSignature(
      consumerAccount,
      signatureMessage
    )
    payload.signature = signature
    // continue to construct Provider URL
    if (output) payload.output = output
    if (algorithm.did) payload.algorithmDid = algorithm.did
    if (algorithm.meta) payload.algorithmMeta = algorithm.meta
    payload.consumerAddress = address
    if (txId) payload.transferTxId = txId
    if (algorithm.transferTxId)
      payload.algorithmTransferTxId = algorithm.transferTxId
    if (algorithm.dataToken) payload.algorithmDataToken = algorithm.dataToken
    if (serviceIndex) payload.serviceId = serviceIndex
    if (serviceType) payload.serviceType = serviceType
    if (tokenAddress) payload.dataToken = tokenAddress
    if (additionalInputs) payload.additionalInputs = additionalInputs
    if (userCustomParameters) payload.userdata = userCustomParameters
    if (algorithm.algoCustomParameters)
      payload.algocustomdata = algorithm.algoCustomParameters
    if (algorithm.userCustomParameters)
      payload.algouserdata = algorithm.userCustomParameters
    const path = this.getComputeStartEndpoint()
      ? this.getComputeStartEndpoint().urlPath
      : null
    if (!path) return null
    try {
      const response = await this.ocean.utils.fetch.post(
        path,
        JSON.stringify(payload)
      )
      if (response?.ok) {
        const params = await response.json()
        return params
      }
      console.error(
        'Compute start failed:',
        response.status,
        response.statusText
      )
      this.logger.error('Payload was:', payload)
      return null
    } catch (e) {
      this.logger.error('Compute start failed:')
      this.logger.error(e)
      this.logger.error('Payload was:', payload)
      return null
    }
  }
  /** Instruct the provider to stop a compute job
   */
  async computeStop(did, consumerAccount, jobId) {
    const address = consumerAccount.getId()
    await this.getNonce(consumerAccount.getId())
    const payload = Object()
    payload.documentId = noZeroX(did)
    let signatureMessage = address
    signatureMessage += jobId || ''
    signatureMessage += (did && `${noZeroX(did)}`) || ''
    signatureMessage += this.nonce
    const signature = await this.createHashSignature(
      consumerAccount,
      signatureMessage
    )
    payload.signature = signature
    payload.jobId = jobId
    payload.consumerAddress = address
    const path = this.getComputeStopEndpoint()
      ? this.getComputeStopEndpoint().urlPath
      : null
    if (!path) return null
    try {
      const response = await this.ocean.utils.fetch.put(
        path,
        JSON.stringify(payload)
      )
      if (response?.ok) {
        const params = await response.json()
        return params
      }
      this.logger.error(
        'Compute stop failed:',
        response.status,
        response.statusText
      )
      this.logger.error('Payload was:', payload)
      return null
    } catch (e) {
      this.logger.error('Compute stop failed:')
      this.logger.error(e)
      this.logger.error('Payload was:', payload)
      return null
    }
  }
  /** Instruct the provider to stop & delete all resources for a  compute job
   */
  async computeDelete(did, consumerAccount, jobId) {
    const address = consumerAccount.getId()
    await this.getNonce(consumerAccount.getId())
    const payload = Object()
    payload.documentId = noZeroX(did)
    let signatureMessage = address
    signatureMessage += jobId || ''
    signatureMessage += (did && `${noZeroX(did)}`) || ''
    signatureMessage += this.nonce
    const signature = await this.createHashSignature(
      consumerAccount,
      signatureMessage
    )
    payload.signature = signature
    payload.jobId = jobId
    payload.consumerAddress = address
    const path = this.getComputeDeleteEndpoint()
      ? this.getComputeDeleteEndpoint().urlPath
      : null
    if (!path) return null
    try {
      const response = await this.ocean.utils.fetch.delete(
        path,
        JSON.stringify(payload)
      )
      if (response?.ok) {
        const params = await response.json()
        return params
      }
      this.logger.error(
        'Delete compute job failed:',
        response.status,
        response.statusText
      )
      this.logger.error('Payload was:', payload)
      return null
    } catch (e) {
      this.logger.error('Delete compute job failed:')
      this.logger.error(e)
      this.logger.error('Payload was:', payload)
      return null
    }
  }
  async computeStatus(did, consumerAccount, jobId, txId) {
    const address = consumerAccount.getId()
    await this.getNonce(consumerAccount.getId())
    let url = '?documentId=' + noZeroX(did)
    url += (jobId && `&jobId=${jobId}`) || ''
    url += `&consumerAddress=${address}`
    url += (txId && `&transferTxId=${txId}`) || ''
    const path = this.getComputeStatusEndpoint()
      ? this.getComputeStatusEndpoint().urlPath
      : null
    if (!path) return null
    try {
      const response = await this.ocean.utils.fetch.get(path + url)
      /* response = await fetch(this.getComputeEndpoint() + url, {
              method: 'GET',
              timeout: 5000
            })
            */
      if (response?.ok) {
        const params = await response.json()
        return params
      }
      this.logger.error(
        'Get compute status failed:',
        response.status,
        response.statusText
      )
      return null
    } catch (e) {
      this.logger.error('Get compute status failed')
      this.logger.error(e)
      return null
    }
  }
  async computeResult(jobId, index, destination, account) {
    await this.getNonce(account.getId())
    let signatureMessage = account.getId()
    signatureMessage += jobId
    signatureMessage += String(index)
    signatureMessage += this.nonce
    const signature = await this.createHashSignature(account, signatureMessage)
    const path = this.getComputeResultEndpoint()
      ? this.getComputeResultEndpoint().urlPath
      : null
    if (!path) return null
    let consumeUrl = path
    consumeUrl += `?jobId=${jobId}`
    consumeUrl += `&index=${String(index)}`
    consumeUrl += `&signature=${signature}`
    consumeUrl += `&consumerAddress=${account.getId()}`
    try {
      !destination
        ? await this.ocean.utils.fetch.downloadFileBrowser(consumeUrl)
        : await this.ocean.utils.fetch.downloadFile(
            consumeUrl,
            destination,
            index
          )
    } catch (e) {
      this.logger.error('Error getting job result')
      this.logger.error(e)
      throw e
    }
    return destination
  }
  getInitializeEndpoint() {
    return this.getEndpointURL('initialize')
  }
  getNonceEndpoint() {
    return this.getEndpointURL('nonce')
  }
  getEncryptEndpoint() {
    return this.getEndpointURL('encrypt')
  }
  getFileinfoEndpoint() {
    return this.getEndpointURL('fileinfo')
  }
  getComputeStartEndpoint() {
    return this.getEndpointURL('computeStart')
  }
  getComputeStopEndpoint() {
    return this.getEndpointURL('computeStop')
  }
  getComputeStatusEndpoint() {
    return this.getEndpointURL('computeStatus')
  }
  getComputeDeleteEndpoint() {
    return this.getEndpointURL('computeDelete')
  }
  getComputeResultEndpoint() {
    return this.getEndpointURL('computeResult')
  }
  getDownloadEndpoint() {
    return this.getEndpointURL('download')
  }
  /** Check for a valid provider at URL
   * @param {String} url
   * @return {Promise<boolean>} string
   */
  async isValidProvider(url) {
    try {
      const response = await this.ocean.utils.fetch.get(url)
      if (response?.ok) {
        const params = await response.json()
        if (params && params.providerAddress) return true
      }
      return false
    } catch (error) {
      this.logger.error(`Error validating provider: ${error.message}`)
      return false
    }
  }
  async getAssetURL(account, did, serviceId) {
    // const provider = await ProviderInstance
    const accountId = account.getId()
    const nonce = await this.getNonce(accountId)
    let signature
    try {
      signature = await this.createSignature(account, did + nonce)
    } catch (error) {
      console.log('error', error)
    }
    let path = this.getEndpointURL('assetUrls')
      ? this.getEndpointURL('encrypt').urlPath
      : null
    if (path === null) path = 'http://localhost:8030/api/v1/services/assetUrls'
    let initializeUrl = path
    initializeUrl += `?documentId=${did}`
    initializeUrl += `&signature=${signature}`
    initializeUrl += `&serviceId=${serviceId}`
    initializeUrl += `&nonce=${nonce}`
    initializeUrl += `&publisherAddress=${accountId}`
    try {
      const response = await fetch(initializeUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseURL = JSON.parse(await response.text())[0]
      return responseURL
    } catch (e) {
      console.error(e)
      throw new Error('HTTP request failed')
    }
  }
}
//# sourceMappingURL=Provider.js.map
