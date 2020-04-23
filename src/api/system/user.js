import request from '@/router/axios'

export const getList = (current, size, params, deptId) => {
  return request({
    url: '/api/blade-user/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
      deptId
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-user/remove',
    method: 'post',
    params: {
      ids
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-user/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-user/update',
    method: 'post',
    data: row
  })
}

export const getUser = (id) => {
  return request({
    url: '/api/blade-user/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const getUserInfo = () => {
  return request({
    url: '/api/blade-user/info',
    method: 'get'
  })
}

export const resetPassword = (userIds) => {
  return request({
    url: '/api/blade-user/reset-password',
    method: 'post',
    params: {
      userIds
    }
  })
}

export const updatePassword = (oldPassword, newPassword, newPassword1) => {
  return request({
    url: '/api/blade-user/update-password',
    method: 'post',
    params: {
      oldPassword,
      newPassword,
      newPassword1
    }
  })
}

export const updateInfo = (row) => {
  return request({
    url: '/api/blade-user/update-info',
    method: 'post',
    data: row
  })
}

export const grant = (userIds, roleIds) => {
  return request({
    url: '/api/blade-user/grant',
    method: 'post',
    params: {
      userIds,
      roleIds
    }
  })
}
/**
 * 类目列表
 * @param {Object} params - 参数
 * @param {String} params.pageNo - 请求页码
 * @param {String} params.pageSize - 每页条数
 * @param {String} params.name - 类目名称
 * */
export const getTagList = (params) => {
  return request({
    url: '/api/org/v1/user/tag/define',
    method: 'get',
    params
  })
}
/**
 * 类目创建
 * @param {Object} params - 参数
 * @param {String} params.name - 类目名称
 * */
export const createTag = (params) => {
  return request({
    url: '/api/org/v1/user/tag/define',
    method: 'post',
    params
  })
}
/**
 * 类目修改
 * @param {Object} params - 参数
 * @param {String} params.name - 类目名称
 * */
export const modifyTag = (params) => {
  return request({
    url: '/api/org/v1/user/tag/define',
    method: 'put',
    params
  })
}
/**
 * 类目删除
 * @param {Object} params - 参数
 * @param {String} params.id - 类目id
 * */
export const deleteTag = (params) => {
  return request({
    url: '/api/org/v1/user/tag/define',
    method: 'delete',
    params
  })
}

//操作日志
export const getActionLog = (params) => {
  return request({
    url: '/api/sys/log/v1/action/log',
    method: 'get',
    params
  })
}
