import qs from 'qs'

const CONTENT_TYPE_JSON = 'application/json'

export function prepareQueryString(params) {
  const updParams = Object.keys(params)
    .filter((key) => params[key] !== null)
    .reduce((acc, cur) => ({ ...acc, [cur]: params[cur] }), {})

  return qs.stringify(updParams, { encode: false, arrayFormat: 'brackets' })
}

export function parseQueryString(queryString) {
  return qs.parse(queryString, { ignoreQueryPrefix: true })
}

const API_PREFIX = 'https://hacker-news.firebaseio.com/v0'

class ApiService {
  constructor(apiPrefix, ts) {
    this.apiPrefix = apiPrefix
  }

  getApiLink(link, params) {
    return (
      this.apiPrefix + link + (params ? '?' + prepareQueryString(params) : '')
    )
  }

  async call(url, method = 'GET', options = {}, params = null) {
    return fetch(this.getApiLink(url))
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        return result
      })
  }

  async get(url, params = null, options = {}) {
    return this.call(url, 'GET', options, params)
  }

  async post(url, data = null, options = {}) {
    if (data) {
      options.body = JSON.stringify(data)
      options.headers = {
        'Content-Type': CONTENT_TYPE_JSON,
      }
    }

    return this.call(url, 'POST', options)
  }

  async put(url, data = null, options = {}) {
    if (data) {
      options.body = JSON.stringify(data)
      options.headers = {
        'Content-Type': CONTENT_TYPE_JSON,
      }
    }

    return this.call(url, 'PUT', options)
  }

  async upload(url, file, name) {
    const formData = new FormData()
    formData.append(name, file)

    const options = {
      body: formData,
    }

    return this.call(url, 'POST', options)
  }

  async delete(url) {
    return this.call(url, 'DELETE')
  }
}

export default new ApiService(API_PREFIX)
