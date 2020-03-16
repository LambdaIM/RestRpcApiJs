
import log from './log.js'
export default function (url, options) {
  var netoptions = {
    url: url,
    method: options !== undefined ? options.method : 'get'
  }
  return new Promise(function (resolve, reject) {
    const request = global.__net.request(netoptions)
    let body = ''
    request.on('response', (response) => {
      response.on('data', (chunk) => {
        body += chunk.toString()
      })
      response.on('end', () => {
        resolve({
          status: response.statusCode,
          json () {
            return new Promise(function (resolve, reject) {
              try {
                resolve(JSON.parse(body))
              } catch (error) {
                log(url)
                log(error)
                reject(error)
              }
            })
          },
          text () {
            return new Promise(function (resolve, reject) {
              try {
                resolve(body)
              } catch (error) {
                log(url)
                log(error)
                reject(error)
              }
            })
          }
        })
      })
    })

    request.on('error', (error) => {
      console.log(error)
      reject(error)
    })
    request.on('abort', (error) => {
      console.log(error)
      reject(error)
    })

    if (options) {
      if (options.headers) {
        Object.keys(options.headers).forEach(function (key) {
          console.log(key, options.headers[key])
          request.setHeader(key, options.headers[key])
        })
      }
      if (options.body) {
        request.write(options.body)
      }
    }

    request.end()
  })
}
