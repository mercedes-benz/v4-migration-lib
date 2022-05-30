import fs from 'fs'
import save from 'save-file'
import timeoutSignal from '../../utils/Timeout'
import fetch from 'cross-fetch'
/**
 * Provides a common interface to web services.
 */
export class WebServiceConnector {
  logger
  requestTimeout = 5000
  constructor(logger, requestTimeout) {
    this.logger = logger
    this.requestTimeout = requestTimeout || this.requestTimeout
  }
  post(url, payload) {
    const headers = {
      'Content-type': 'application/json'
    }
    return this.postWithHeaders(url, payload, headers)
  }
  postWithOctet(url, payload) {
    const headers = {
      'Content-type': 'application/octet-stream'
    }
    return this.postWithHeaders(url, payload, headers)
  }
  postWithHeaders(url, payload, headers) {
    if (payload != null) {
      return this.fetch(url, {
        method: 'POST',
        body: payload,
        headers,
        signal: timeoutSignal(this.requestTimeout)
      })
    } else {
      return this.fetch(url, {
        method: 'POST',
        signal: timeoutSignal(this.requestTimeout)
      })
    }
  }
  get(url) {
    return this.fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
      signal: timeoutSignal(this.requestTimeout)
    })
  }
  put(url, payload) {
    if (payload != null) {
      return this.fetch(url, {
        method: 'PUT',
        body: payload,
        headers: {
          'Content-type': 'application/json'
        },
        signal: timeoutSignal(this.requestTimeout)
      })
    } else {
      return this.fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        signal: timeoutSignal(this.requestTimeout)
      })
    }
  }
  delete(url, payload) {
    if (payload != null) {
      return this.fetch(url, {
        method: 'DELETE',
        body: payload,
        headers: {
          'Content-type': 'application/json'
        },
        signal: timeoutSignal(this.requestTimeout)
      })
    } else {
      return this.fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
        signal: timeoutSignal(this.requestTimeout)
      })
    }
  }
  async downloadFile(url, destination, index) {
    const response = await this.get(url)
    if (!response.ok) {
      throw new Error('Response error.')
    }
    let filename
    try {
      filename = response.headers
        .get('content-disposition')
        .match(/attachment;filename=(.+)/)[1]
    } catch {
      try {
        filename = url.split('/').pop()
      } catch {
        filename = `file${index}`
      }
    }
    if (destination) {
      // eslint-disable-next-line no-async-promise-executor
      await new Promise(async (resolve, reject) => {
        fs.mkdirSync(destination, { recursive: true })
        const fileStream = fs.createWriteStream(`${destination}${filename}`)
        response.body.pipe(fileStream)
        response.body.on('error', reject)
        fileStream.on('finish', resolve)
      })
      return destination
    } else {
      save(await response.arrayBuffer(), filename)
    }
  }
  async downloadFileBrowser(url) {
    const anchor = document.createElement('a')
    anchor.download = ''
    anchor.href = url
    anchor.click()
  }
  async fetch(url, opts) {
    const result = await fetch(url, opts)
    if (!result.ok) {
      this.logger.error(`Error requesting [${opts.method}] ${url}`)
      this.logger.error(`Response message: \n${await result.text()}`)
      throw result
    }
    return result
  }
}
//# sourceMappingURL=WebServiceConnector.js.map
