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
  return get('/task/v1/todo/list', params)
}
// 候选人面试详情查询
export const getInterviewInfo = (params) => {
  return get('/user/v1/person/interview/info', params)
}

// 候选人面试详情评价提交
export const postInterviewInfo = (params) => {
  return post('/user/v1/person/interview/info', params)
}
