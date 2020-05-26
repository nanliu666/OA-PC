import { get, del, post, put } from '@/router/axios'

/**
 * 离职交接事项分组查询接口
 * @param {String} companyId - 所属公司ID
 * */
export const getResignGroup = (companyId) => {
  return get('/user/v1/leave/note/group', { companyId })
}

/**
 * 离职交接事项分组添加接口
 * @param {String} params
 * */
export const createResignGroup = (params) => {
  return post('/user/v1/leave/note/group', params)
}

/**
 * 离职交接事项分组修改接口
 * @param {String} params
 * */
export const modifyResignGroup = (params) => {
  return put('/user/v1/leave/note/group', params)
}

/**
 * 离职交接事项分组删除接口
 * @param {String} categoryId - 分类ID
 * */
export const delResignGroup = (id) => {
  return del('/user/v1/leave/note/group', { id })
}

/**
 * 离职交接事项分类查询接口
 * @param {String} groupId - 分组ID
 * */
export const getResignCategory = (groupId) => {
  return get('/user/v1/leave/note/category', { groupId })
}

/**
 * 离职交接事项分类添加接口
 * @param {String} params
 * */
export const createResignCategory = (params) => {
  return post('/user/v1/leave/note/category', params)
}

/**
 * 离职交接事项分类修改接口
 * @param {String} params
 * */
export const modifyResignCategory = (params) => {
  return put('/user/v1/leave/note/category', params)
}

/**
 * 离职交接事项分类删除接口
 * @param {String} categoryId - 分类ID
 * */
export const delResignCategory = (categoryId) => {
  return del('/user/v1/leave/note/category', { categoryId })
}
