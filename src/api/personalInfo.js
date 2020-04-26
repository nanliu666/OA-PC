import request from '@/router/axios'

export const getPersonalInfo = (params) => {
  return request({
    url: '/user/wxmini/v1/user/info',
    method: 'get',
    params: {
      ...params
    }
  })
}
export const updateInfo = (params) => {
  return request({
    url: '/user/wxmini/v1/user/info',
    method: 'post',
    params: {
      ...params
    }
  })
}
export const getCode = (params) => {
  return request({
    url: '/common/v1/sms/send',
    method: 'post',
    params: {
      ...params
    }
  })
}
