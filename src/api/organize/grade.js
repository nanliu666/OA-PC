import request from '@/router/axios'
export const getOrganizationView = (current, size, params) => {
  //组织机构视图查询接口
  return request({
    url: '/api/org/v1/organization/view',
    method: 'get',
    params: {
      ...params,
      current,
      size
    }
  })
}
