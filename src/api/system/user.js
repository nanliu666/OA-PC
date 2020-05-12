import { get, post, put, del } from '@/router/axios'
import request from '@/router/axios'

/**
 * 组织机构查询接口
 */
export const getOrganization = (params) => {
  return get('/org/v1/organization', params)
}

/**
 * 组织架构员工查询接口
 */
export const getOrgUserTree = () => {
  return get('/org/v1/org/user/tree')
}

/**
 * 类目列表
 * @param {String} userIds - 用户ID
 * */
export const resetPwd = (userIds) => {
  return post('/user/v1/user/pwd/reset', { userIds })
}

/**
 * 标签所属用户查询接口
 * @param {Object} params - 参数
 * @param {String} params.pageNo - 请求页码
 * @param {String} params.pageSize - 每页条数
 * @param {String} params.tagId - 标签ID
 * @param {String} params.search - 工号或姓名，支持模糊查询
 * */
export const getTagUserList = (params) => {
  return get('/user/v1/tag/user', params)
}

/**
 * 用户账号冻结接口
 * @param {String} userId - 用户ID
 * @param {String} userStatus - 用户状态，1-正常（解冻），2-禁用（冻结）
 * */
export const modifyUserStatus = (userId, userStatus) => {
  return post('/user/v1/user/status/reset', { userId, userStatus })
}

/**
 * 组织所属用户查询接口
 * @param {Object} params - 参数
 * @param {String} params.pageNo - 请求页码
 * @param {String} params.pageSize - 每页条数
 * @param {String} params.orgId - 组织ID
 * @param {String} params.search - 工号或姓名，支持模糊查询
 * */
export const getOrgUserList = (params) => {
  return get('/org/v1/org/user', params)
}

/**
 * 标签所属用户移除接口
 * @param {String} tagId 标签ID
 * @param {String} userId 用户ID，多个以英文逗号分隔
 */
export const delTagUser = (tagId, userId) => {
  return del('/user/v1/tag/user', { tagId, userId })
}

/**
 * 标签所属用户添加接口
 * @param {String} tagId  标签ID
 * @param {Array<String>} users 用户ID
 */
export const createTagUser = (tagId, users) => {
  return post('/user/v1/tag/user', { tagId, users })
}
/**
 * 用户拥有角色查询接口
 * @param {String} userId 用户ID
 */
export const getUserRole = (userId) => {
  return get('/user/v1/user/role', { userId })
}

/**
 * 用户拥有角色修改接口
 * @param {String} userId 用户ID
 * @param {Array<Object>} roles 角色
 */
export const modifyUserRole = (userId, roles) => {
  return put('/user/v1/user/role', { userId, roles })
}

/**
 * 角色列表查询接口
 * @param {String} roleName 角色名称
 */
export const getRoleList = (roleName) => {
  return get('/sys/v1/role/list', { roleName })
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
    url: '/user/v1/user/tag/define',
    method: 'get',
    params
  })
}
/**
 * 类目创建
 * @param {Object} params - 参数
 * @param {String} params.name - 类目名称
 * */
export const createTag = (data) => {
  return request({
    url: '/api/user/v1/user/tag/define',
    method: 'post',
    data
  })
}
/**
 * 类目修改
 * @param {Object} params - 参数
 * @param {String} params.name - 类目名称
 * */
export const modifyTag = (data) => {
  return request({
    url: '/api/user/v1/user/tag/define',
    method: 'put',
    data
  })
}
/**
 * 类目删除
 * @param {Object} params - 参数
 * @param {String} params.id - 类目id
 * */
export const deleteTag = (params) => {
  return request({
    url: '/api/user/v1/user/tag/define',
    method: 'delete',
    params
  })
}

//操作日志
export const getActionLog = (params) => {
  return request({
    // url: '/api/sys/log/v1/action/log',
    url: '/api/log/v1/action/log',
    method: 'get',
    params
  })
}
