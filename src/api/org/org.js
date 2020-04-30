import request from '@/router/axios'
// 组织机构查询
export const getOrgTree = (params) => {
  return request({
    url: '/api/org/v1/organization',
    method: 'get',
    params: params
  })
}

// 组织机构查询
export const getOrgTreeSimple = (params) => {
  return request({
    url: '/api/org/v1/organization/tree',
    method: 'get',
    params: params
  })
}

// 组织机构排序
export const sortOrgTree = (params) => {
  return request({
    url: '/api/org/v1/organization/sort',
    method: 'post',
    params: params
  })
}

// 组织机构删除
export const deleteOrg = (params) => {
  return request({
    url: '/api/org/v1/organization',
    method: 'delete',
    params: params
  })
}

// 组织机构编辑
export const editOrg = (params) => {
  return request({
    url: '/api/org/v1/organization',
    method: 'put',
    params: params
  })
}

// 组织机构新增
export const createOrg = (params) => {
  return request({
    url: '/api/org/v1/organization',
    method: 'post',
    params: params
  })
}

// 在职员工查询
export const getUserWorkList = (params) => {
  return request({
    url: '/api/user/v1/user/work/list',
    method: 'get',
    params: params
  })
}
