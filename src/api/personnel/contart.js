import { post, put, get } from '@/router/axios'
// /user/v1/user/contract/signed
/**
 * @author guanfenda
 * 已签订合同查询接口
 * @param {Object} params - 参数
 * */
export const postSigned = (params) => {
  return post('/user/v1/user/contract/signed', params)
}
/**
 * @author guanfenda
 * 员工合同签订接口
 * @param {Object} params - 参数
 * */
export const postContractInfo = (params) => {
  return post('/user/v1/user/contract/info', params)
}
// /user/v1/user/contract/info
/**
 * @author guanfenda
 * 员工合同编辑接口
 * @param {Object} params - 参数
 * */
export const putContractInfo = (params) => {
  return put('/user/v1/user/contract/info', params)
}
/**
 * @author guanfenda
 * 员工合同信息查询接口
 * @param {Object} params - 参数
 * */
export const getContractInfo = (params) => {
  return get('/user/v1/user/contract/info', params)
}
// /user/v1/user/contract/record
/**
 * @author guanfenda
 * 合同签订记录查询接口
 * @param {Object} params - 参数
 * */
export const postContractRecord = (params) => {
  return post('/user/v1/user/contract/record', params)
}
/**
 * @author guanfenda
 * 待处理合同查询接口
 * @param {Object} params - 参数
 * */
export const postContractTodo = (params) => {
  return post('/user/v1/user/contract/todo', params)
}
/**
 * @author guanfenda
 *
 *@desc 员工合同续签申请查询接口
 *
 * */
export const postContractApply = (params) => post('/user/v1/user/contract/apply', params)
