import metadata from '../metadata.json'
import { Instantiable } from '../Instantiable.abstract'
export var OceanPlatformTechStatus
;(function (OceanPlatformTechStatus) {
  OceanPlatformTechStatus['Loading'] = 'Loading'
  OceanPlatformTechStatus['Unknown'] = 'Unknown'
  OceanPlatformTechStatus['Stopped'] = 'Stopped'
  OceanPlatformTechStatus['Working'] = 'Working'
})(OceanPlatformTechStatus || (OceanPlatformTechStatus = {}))
/**
 * Versions submodule of Ocean Protocol.
 */
export class Versions extends Instantiable {
  /**
   * Returns the instance of Ocean Stack Versions.
   * @return {Promise<Versions>}
   */
  static async getInstance(config) {
    const instance = new Versions()
    instance.setInstanceConfig(config)
    return instance
  }
  async get() {
    const versions = {}
    versions.lib = {
      name: 'Lib',
      version: metadata.version,
      commit: metadata.commit,
      status: OceanPlatformTechStatus.Working
    }
    // MetadataCache
    try {
      const { software: name, version } =
        await this.ocean.metadataCache.getVersionInfo()
      versions.metadataCache = {
        name,
        status: OceanPlatformTechStatus.Working,
        version
      }
    } catch {
      versions.metadataCache = {
        name: 'MetadataCache',
        status: OceanPlatformTechStatus.Stopped
      }
    }
    // Status
    const techs = Object.values(versions)
    versions.status = {
      ok: !techs.find(
        ({ status }) => status !== OceanPlatformTechStatus.Working
      )
    }
    return versions
  }
}
//# sourceMappingURL=Versions.js.map
