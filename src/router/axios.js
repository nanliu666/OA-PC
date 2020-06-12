/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from 'axios'
import store from '@/store/'
import router from '@/router/router'
import { serialize } from '@/util/util'
import { getToken } from '@/util/auth'
import { Message } from 'element-ui'
import website from '@/config/website'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Base64 } from 'js-base64'

const instance = axios.create({
  timeout: 100000, //默认超时时间
  withCredentials: true, //跨域请求，允许保存cookie
  validateStatus: function(status) {
    return status >= 200 && status <= 500
  }
})

// NProgress 配置
NProgress.configure({
  showSpinner: false
})
//http request拦截
instance.interceptors.request.use(
  (config) => {
    //开启 progress bar
    NProgress.start()
    const meta = config.meta || {}
    const isToken = meta.isToken === false
    config.headers['Authorization'] = `Basic ${Base64.encode(
      `${website.clientId}:${website.clientSecret}`
    )}`
    config.headers['Tenant-Id'] = store.state.user.tenantId || ''
    config.headers.appId = 'Admin'

    if (!config.url.startsWith('/api') && !config.url.startsWith('api')) {
      config.url = '/api' + config.url
    }
    if (getToken() && !isToken) {
      //让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
      config.headers.accessToken = store.state.user.userInfo.token_type + ' ' + getToken()
    }
    //headers中配置serialize为true开启序列化
    if (config.method === 'post' && meta.isSerialize === true) {
      config.data = serialize(config.data)
    }
    // 登录接口后台数据从url获取 其他接口正常
    if (
      config.method.toLowerCase() !== 'get' &&
      !String.prototype.endsWith.call(config.url, '/oauth/token')
    ) {
      config.data = config.data || config.params
      config.params = null
    }
    if (config.method.toLowerCase() === 'delete') config.params = config.data
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
//http response 拦截
instance.interceptors.response.use(
  (res) => {
    //关闭 progress bar
    NProgress.done()
    //获取状态码
    const status = res.data.resCode || res.status
    const statusWhiteList = website.statusWhiteList || []
    const message = res.data.resMsg || res.data.error_description || '未知错误'
    //如果在白名单里则自行catch逻辑处理
    if (statusWhiteList.includes(status)) return Promise.reject(res)
    //如果是401则跳转到登录页面
    if (status === 401) store.dispatch('FedLogOut').then(() => router.push({ path: '/login' }))
    // 如果请求为非200否者默认统一处理

    if (status !== 200) {
      Message({
        message: message,
        type: 'error'
      })
      return Promise.reject(new Error(message))
    }
    if (String.prototype.endsWith.call(res.config.url, '/oauth/token')) {
      return res.data
    }
    return res.data.response
  },
  (error) => {
    NProgress.done()
    return Promise.reject(new Error(error))
  }
)

export function post(urls, data, config = {}) {
  return instance.post(urls, data, config)
}

export function get(urls, params, config = {}) {
  return instance.get(urls, {
    params,
    ...config
  })
}

export function put(urls, data, config = {}) {
  return instance.put(urls, data, config)
}

export function del(urls, data, config = {}) {
  return instance.delete(urls, {
    params: data,
    data,
    ...config
  })
}

export default instance
