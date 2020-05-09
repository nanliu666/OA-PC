import request from '@/router/axios'
export const getOrganizationView = (params) => {
  //组织机构视图查询接口
  return request({
    url: '/api/org/v1/organization/view',
    method: 'get',
    params: {
      ...params
    }
  })
}
export const getOrganization = (current, size, params) => {
  //组织机构查询接口
  return request({
    url: '/api/org/v1/organization',
    method: 'get',
    params: {
      ...params,
      current,
      size
    }
  })
}
// /org/v1/organization
export const postOrganization = (current, size, params) => {
  //组织机构查询接口
  return request({
    url: '/api/org/v1/organization',
    method: 'post',
    params: {
      ...params,
      current,
      size
    }
  })
}
export const putOrganization = (current, size, params) => {
  //组织机构查询接口
  return request({
    url: '/api/org/v1/organization',
    method: 'put',
    params: {
      ...params,
      current,
      size
    }
  })
}
export const deleteOrganization = (current, size, params) => {
  //组织机构查询接口
  return request({
    url: '/api/org/v1/organization',
    method: 'delete',
    params: {
      ...params,
      current,
      size
    }
  })
}
export const postSort = (params) => {
  return request({
    url: '/api/org/v1/organization/view/sort',
    method: 'delete',
    params: {
      ...params
    }
  })
}
