import { post, put } from '@/router/axios'
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
/**
 * @author guanfenda
 * 员工合同编辑接口
 * @param {Object} params - 参数
 * */
export const putContractInfo = (params) => {
  return put('/user/v1/user/contract/info', params)
}
