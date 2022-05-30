import { Instantiable } from '../Instantiable.abstract'
/**
 * Provides an interface for Event access control service.
 */
export class EventAccessControl extends Instantiable {
  baseUrl
  /**
   * Returns the instance of Event access Control.
   * @return {Promise<EventAccessControl>}
   */
  static async getInstance(config) {
    const instance = new EventAccessControl()
    instance.setInstanceConfig(config)
    await instance.setBaseUrl(config.config?.rbacUri)
    return instance
  }
  async setBaseUrl(url) {
    this.baseUrl = url
  }
  get url() {
    return this.baseUrl
  }
  getIsPermitArgs(
    component,
    eventType,
    authService,
    credentials,
    credentialsType,
    did
  ) {
    if (eventType === 'consume') {
      return {
        component,
        eventType,
        authService,
        did,
        credentials: {
          type: credentialsType,
          value: credentials
        }
      }
    }
    return {
      component,
      eventType,
      authService,
      credentials: {
        type: credentialsType,
        value: credentials
      }
    }
  }
  async isPermit(
    component,
    eventType,
    authService,
    credentials,
    credentialsType,
    did
  ) {
    if (!this.url) return true
    const args = this.getIsPermitArgs(
      component,
      eventType,
      authService,
      credentials,
      credentialsType,
      did
    )
    try {
      const response = await this.ocean.utils.fetch.post(
        this.url,
        JSON.stringify(args)
      )
      let results = await response.json()
      results = JSON.stringify(results)
      return results === 'true'
    } catch (e) {
      this.logger.error(e)
      throw new Error('ERROR: Asset URL not found or not available.')
    }
  }
}
//# sourceMappingURL=EventAccessControl.js.map
