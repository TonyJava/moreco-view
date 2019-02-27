import axios from 'axios'
import qs from 'qs'
// import store from '@/store'
// import { Spin } from 'iview'
// import {Message} from 'iview'
import { setToken, getToken } from '@/libs/util'

// const addErrorLog = errorInfo => {
//   const {statusText, status, request: {responseURL}} = errorInfo
//   let info = {
//     type: 'ajax',
//     code: status,
//     mes: statusText,
//     url: responseURL
//   }
//   if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
// }

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }

  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 拦截delete 操作
      let requestMethod = config.method
      if (requestMethod.toUpperCase() === 'DELETE') {
        config.method = 'POST'
        config.params = { '_method': requestMethod }
      }
      // if (config.method.toUpperCase() === 'POST') {
      //   config.data = qs.stringify(config.data)
      // }
      let token = getToken()
      if (token !== null || token !== undefined) {
        config.headers.Authorization = 'Bearer ' + token
      }
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      let authorization = res.headers.authorization
      if (authorization !== null && authorization !== undefined) {
        setToken(authorization)
      }
      this.destroy(url)
      const { data, status } = res
      if (status === 200 && data.success) {
        return data.result
      }
    }, error => {
      this.destroy(url)
      // console.log(error.response)
      // addErrorLog(error.response)
      return Promise.reject(error)
    })
  }

  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
