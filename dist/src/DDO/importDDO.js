import { DDO, Logger } from '../v3'
import axios from 'axios'
export async function getDDO(did, metadataCacheUri) {
  try {
    const response = await axios.get(
      `${metadataCacheUri}/api/v1/aquarius/assets/ddo/${did}`
    )
    if (!response || response.status !== 200 || !response.data) return
    const data = { ...response.data }
    return new DDO(data)
  } catch (error) {
    if (axios.isCancel(error)) {
      Logger.log(error.message)
    } else {
      Logger.error(error.message)
    }
  }
}
//# sourceMappingURL=importDDO.js.map
