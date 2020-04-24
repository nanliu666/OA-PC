import request from '@/router/axios'
// 筛选获取工作地址
export const getWorkAddressList = (params) => {
  return request({
    url: '/user/v1/user/work/address',
    method: 'get',
    params: params
  })
}

// 员工列表
export const getUserList = (params) => {
  return request({
    url: '/user/v1/user/list',
    method: 'get',
    params: params
  })
}

// 员工状态人数统计
export const getUserStatusStat = (params) => {
  return request({
    url: '/user/v1/user/status/stat',
    method: 'get',
    params: params
  })
}
