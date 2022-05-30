import { DDO } from '../ddo/DDO'
import DID from '../ocean/DID'
import { isDdo } from '../utils'
import { WebServiceConnector } from '../ocean/utils/WebServiceConnector'
import { fetch as fetchLibrary } from 'cross-fetch'
const apiPath = '/api/v1/aquarius/assets/ddo'
/**
 * Provides an interface with Metadata Cache.
 * Metadata Cache provides an off-chain database cache for on-chain metadata about data assets.
 */
export class MetadataCache {
  fetch
  logger
  metadataCacheUri
  get url() {
    return this.metadataCacheUri
  }
  /**
   * Instantiate Metadata Cache (independently of Ocean) for off-chain interaction.
   * @param {String} metadataCacheUri
   * @param {Logger} logger
   */
  constructor(metadataCacheUri, logger, requestTimeout) {
    this.fetch = new WebServiceConnector(logger, requestTimeout)
    this.logger = logger
    this.metadataCacheUri = metadataCacheUri
  }
  async getVersionInfo() {
    return (await this.fetch.get(this.url)).json()
  }
  async getAccessUrl(accessToken, payload) {
    const accessUrl = await this.fetch
      .post(
        `${accessToken.service_endpoint}/${accessToken.resource_id}`,
        payload
      )
      .then((response) => {
        if (response.ok) {
          return response.text()
        }
        this.logger.error('Failed: ', response.status, response.statusText)
        return null
      })
      .then((consumptionUrl) => {
        this.logger.error(
          'Success accessing consume endpoint: ',
          consumptionUrl
        )
        return consumptionUrl
      })
      .catch((error) => {
        this.logger.error(
          'Error fetching the data asset consumption url: ',
          error
        )
        return null
      })
    return accessUrl
  }
  /**
   * Search over the DDOs using a query.
   * @param  {SearchQuery} query Query to filter the DDOs.
   * @return {Promise<QueryResult>}
   */
  async queryMetadata(query) {
    const result = await this.fetch
      .post(`${this.url}/api/v1/aquarius/assets/query`, JSON.stringify(query))
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        this.logger.error(
          'queryMetadata failed:',
          response.status,
          response.statusText
        )
        return null
      })
      .then((results) => {
        return results
      })
      .catch((error) => {
        this.logger.error('Error fetching querying metadata: ', error)
        return null
      })
    return result
  }
  /**
   * Encrypts a DDO
   * @param  {any} ddo bytes to be encrypted.
   * @return {Promise<String>} Hex encoded encrypted DDO.
   */
  async encryptDDO(ddo) {
    const fullUrl = `${this.url}/api/v1/aquarius/assets/ddo/encryptashex `
    const result = await this.fetch
      .postWithOctet(fullUrl, ddo)
      .then((response) => {
        if (response.ok) {
          return response.text()
        }
        this.logger.error(
          'encryptDDO failed:',
          response.status,
          response.statusText,
          ddo
        )
        return null
      })
      .catch((error) => {
        this.logger.error('Error encryptDDO: ', error)
        return null
      })
    return result
  }
  /**
   * Validate Metadata
   * @param  {Metadata} metadata  metadata to be validated. If it's a Metadata, it will be validated agains the local schema. Else, it's validated agains the remote schema
   * @return {Promise<Boolean|Object>}  Result.
   */
  async validateMetadata(metadata) {
    const status = {
      valid: false
    }
    const path = isDdo(metadata) ? '/validate-remote' : '/validate'
    try {
      const response = await this.fetch.post(
        `${this.url}${apiPath}${path}`,
        JSON.stringify(metadata)
      )
      if (response.ok) {
        const errors = await response.json()
        if (errors === true) status.valid = true
        else status.errors = errors
      } else {
        this.logger.error(
          'validate Metadata failed:',
          response.status,
          response.statusText
        )
      }
    } catch (error) {
      this.logger.error('Error validating metadata: ', error)
    }
    return status
  }
  /**
   * Retrieves a DDO by DID.
   * @param  {DID | string} did DID of the asset.
   * @return {Promise<DDO>} DDO of the asset.
   */
  async retrieveDDO(did, metadataServiceEndpoint) {
    did = did && DID.parse(did)
    const fullUrl =
      metadataServiceEndpoint || `${this.url}${apiPath}/${did.getDid()}`
    const result = await this.fetch
      .get(fullUrl)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        this.logger.log(
          'retrieveDDO failed:',
          response.status,
          response.statusText,
          did
        )
        return null
      })
      .then((response) => {
        return new DDO(response)
      })
      .catch((error) => {
        this.logger.error('Error fetching querying metadata: ', error)
        return null
      })
    return result
  }
  async retrieveDDOByUrl(metadataServiceEndpoint) {
    return this.retrieveDDO(undefined, metadataServiceEndpoint)
  }
  getServiceEndpoint(did) {
    return `${this.url}/api/v1/aquarius/assets/ddo/did:op:${did.getId()}`
  }
  getURI() {
    return `${this.url}`
  }
  /**
   * Simple blocking sleep function
   */
  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }
  /**
   * Blocks until Aqua will cache the did (or the update for that did) or timeouts
   * @param  {string} did DID of the asset.
   * @param  {string} txid used when the did exists and we expect an update with that txid.
   * @return {Promise<DDO>} DDO of the asset.
   */
  async waitForAqua(did, txid) {
    const apiPath = '/api/v1/aquarius/assets/ddo'
    let tries = 0
    do {
      try {
        const result = await fetchLibrary(this.getURI() + apiPath + '/' + did)
        if (result.ok) {
          if (txid) {
            // check tx
            const ddo = await result.json()
            if (ddo.event && ddo.event.txid === txid) break
          } else break
        }
      } catch (e) {
        // do nothing
      }
      await this.sleep(1500)
      tries++
    } while (tries < 100)
  }
}
//# sourceMappingURL=MetadataCache.js.map
