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
export const getOrganization = (params) => {
  //组织机构查询接口
  return request({
    url: '/api/org/v1/organization',
    method: 'get',
    params: {
      ...params
    }
  })
}
// /org/v1/organization
export const postOrganization = (params) => {
  //组织机构查询接口
  return request({
    url: '/api/org/v1/organization',
    method: 'post',
    params: {
      ...params
    }
  })
}
export const putOrganization = (params) => {
  //组织机构查询接口
  return request({
    url: '/api/org/v1/organization',
    method: 'put',
    params: {
      ...params
    }
  })
}
export const deleteOrganization = (params) => {
  //组织机构查询接口
  return request({
    url: '/api/org/v1/organization',
    method: 'delete',
    params: {
      ...params
    }
  })
}

export const postSort = (params) => {
  return request({
    url: '/api/org/v1/organization/view/sort',
    method: 'post',
    data: params
  })
}
