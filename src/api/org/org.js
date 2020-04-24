import request from '@/router/axios'
// 组织机构查询
export const getOrgTree = (params) => {
  return request({
    url: '/org/v1/organization',
    method: 'get',
    params: params
  })
}
// 组织机构排序
export const sortOrgTree = (params) => {
  return request({
    url: '/org/v1/organization/sort',
    method: 'post',
    params: params
  })
}

// 组织机构排序
export const deleteOrg = (params) => {
  return request({
    url: '/org/v1/organization/sort',
    method: 'delete',
    params: params
  })
}
