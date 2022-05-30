import fetch from 'cross-fetch'
import LoggerInstance from './Logger'
export async function fetchData(url, opts) {
  const result = await fetch(url, opts)
  if (!result.ok) {
    LoggerInstance.error(`Error requesting [${opts.method}] ${url}`)
    LoggerInstance.error(`Response message: \n${await result.text()}`)
    throw result
  }
  return result
}
export async function downloadFileBrowser(url) {
  const anchor = document.createElement('a')
  anchor.download = ''
  anchor.href = url
  anchor.click()
}
export async function downloadFile(url, index) {
  const response = await fetch(url)
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
  return { data: await response.arrayBuffer(), filename }
}
export async function getData(url) {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  })
}
async function postWithHeaders(url, payload, headers) {
  if (payload != null) {
    return fetch(url, {
      method: 'POST',
      body: payload,
      headers
    })
  } else {
    return fetch(url, {
      method: 'POST'
    })
  }
}
export async function postData(url, payload) {
  const headers = {
    'Content-type': 'application/json'
  }
  return postWithHeaders(url, payload, headers)
}
//# sourceMappingURL=FetchHelper.js.map
