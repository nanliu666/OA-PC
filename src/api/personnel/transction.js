import request from '@/router/axios'
// 获取人事异动员工筛选
export const getChangeList = (params) => {
  return request({
    url: '/user/v1/user/change/list',
    method: 'post',
    params: params
  })
}

// 获取人事异动员工筛选
export const changeApply = (params) => {
  return request({
    url: '/user/v1/user/change/info',
    method: 'post',
    params: params
  })
}
