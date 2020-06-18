import { get, post } from '@/router/axios'

/**
 * 待办任务查询接口
 * @param {Object} params - 参数
 * @param {String} params.pageNo - 请求页码
 * @param {String} params.pageSize - 每页条数
 * @param {String} params.title - 标题
 * @param {String} params.type - 类型
 * */
export const getTodoList = (params) => {
  return get('/user/v1/todo/list', params)
}
// 候选人面试详情查询
export const getInterviewInfo = (params) => {
  return get('/user/v1/person/interview/info', params)
}
//候选人面试详情查询接口
export const getInterviewList = (params) => {
  return get('/user/v1/person/interview/list', params)
}
// /user/v1/person/interview/list

// 候选人面试详情评价提交
export const postInterviewInfo = (params) => {
  return post('/user/v1/person/interview/info', params)
}
/**
 * 候选人简历审核详情查询接口
 * @param {String} id
 * */
export const getResumeCheck = (id) => {
  return get('/user/v1/person/resume/check', { id })
}

/**
 * 候选人简历审核淘汰接口
 * @param {Object} params
 * */
export const modifyResumeReject = (params) => {
  return post('/user/v1/person/resume/reject', params)
}

/**
 * 候选人简历审核通过接口
 * @param {Object} params
 * */
export const modifyResumePass = (params) => {
  return post('/user/v1/person/resume/pass', params)
}

// 员工离职交接事项查询接口

export const getLeaveNote = (params) => {
  return get('/user/v1/user/leave/note', params)
}
// 员工离职交接事项确认
export const postConfirmleaveNote = (params) => {
  return post('/user/v1/user/leave/note/confirm', params)
}
// 员工离职交接事项催一下接口
export const postUrgeleaveNote = (params) => {
  return post('/user/v1/user/leave/note/urge', params)
}
