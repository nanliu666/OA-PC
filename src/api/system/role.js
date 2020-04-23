import request from '@/router/axios'

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-system/role/list',
    method: 'get',
    params: {
      ...params,
      current,
      size
    }
  })
}
export const grantTree = () => {
  return request({
    url: '/api/blade-system/menu/grant-tree',
    method: 'get'
  })
}

export const grant = (roleIds, menuIds, dataScopeIds, apiScopeIds) => {
  return request({
    url: '/api/blade-system/role/grant',
    method: 'post',
    data: {
      roleIds,
      menuIds,
      dataScopeIds,
      apiScopeIds
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-system/role/remove',
    method: 'post',
    params: {
      ids
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-system/role/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-system/role/submit',
    method: 'post',
    data: row
  })
}

export const getRole = (roleIds) => {
  return request({
    url: '/api/blade-system/menu/role-tree-keys',
    method: 'get',
    params: {
      roleIds
    }
  })
}

export const getRoleTree = (tenantId) => {
  return request({
    url: '/api/blade-system/role/tree',
    method: 'get',
    params: {
      tenantId
    }
  })
}

/**
 * @description 角色分类修改接口
 * @param params
 * @returns {*}
 */
export const updateCate = (params) => {
  return request({
    url: '/api/sys/v1/role/category/define',
    method: 'put',
    data: {
      ...params
    }
  })
}

/**
 * @description 角色分类删除接口
 * @param params
 * @returns {*}
 */
export const delCate = (params) => {
  return request({
    url: '/api/sys/v1/role/category/define',
    method: 'delete',
    params: {
      ...params
    }
  })
}

/**
 * @description 角色分类新增接口
 * @param params
 * @returns {*}
 */
export const createCate = (params) => {
  return request({
    url: '/api/sys/v1/role/category/define',
    method: 'post',
    data: {
      ...params
    }
  })
}

/**
 * @description 角色分类查询接口
 * @param params
 * @returns {*}
 */
export const getCate = (params) => {
  return request({
    url: '/api/sys/v1/role/category/define',
    method: 'get',
    params: {
      ...params
    }
  })
}

/**
 * @description 角色分组修改接口
 * @param params
 * @returns {*}
 */
export const updateGroup = (params) => {
  return request({
    url: '/api/sys/v1/role/group/define',
    method: 'put',
    data: {
      ...params
    }
  })
}

/**
 * @description 角色分组删除接口
 * @param params
 * @returns {*}
 */
export const delGroup = (params) => {
  return request({
    url: '/api/sys/v1/role/group/define',
    method: 'delete',
    params: {
      ...params
    }
  })
}

/**
 * @description 角色分组新增接口
 * @param params
 * @returns {*}
 */
export const createGroup = (params) => {
  return request({
    url: '/api/sys/v1/role/group/define',
    method: 'post',
    data: {
      ...params
    }
  })
}

/**
 * @description 角色删除接口
 * @param params
 * @returns {*}
 */
export const delRole = (params) => {
  return request({
    url: '/api/sys/v1/role',
    method: 'delete',
    params: {
      ...params
    }
  })
}

/**
 * @description 角色所属的用户查询接口
 * @param params
 * @returns {*}
 */
export const getRoleUser = (params) => {
  return request({
    url: '/api/sys/v1/role/user',
    method: 'get',
    params: {
      ...params
    }
  })
}

/**
 * @description 角色新增接口
 * @param params
 * @returns {*}
 */
export const createRole = (params) => {
  return request({
    url: '/api/sys/v1/role',
    method: 'post',
    data: {
      ...params
    }
  })
}

/**
 * @description 角色权限查询接口
 * @param params
 * @returns {*}
 */
export const getPrivilege = (params) => {
  return request({
    url: '/api/sys/v1/role/privilege',
    method: 'get',
    params: {
      ...params
    }
  })
}

/**
 * @description 角色查询接口
 * @param params
 * @returns {*}
 */
export const getRoleList = (params) => {
  return request({
    url: '/api/sys/v1/role',
    method: 'get',
    params: {
      ...params
    }
  })
}

/**
 * @description 角色编辑接口
 * @param params
 * @returns {*}
 */
export const updateRole = (params) => {
  return request({
    url: '/api/sys/v1/role',
    method: 'put',
    data: {
      ...params
    }
  })
}

export const getJobs = (params) => {
  return request({
    url: '/api/sys/v1/jobs',
    method: 'get',
    params: {
      ...params
    }
  })
}

export const getPositions = (params) => {
  return request({
    url: '/api/sys/v1/Positions',
    method: 'get',
    params: {
      ...params
    }
  })
}
