import { get, post, put } from '@/router/axios'
/***
 *  @author guanfenda
 *  @desc 审批流程查询接口
 *  @params params
 */
export const getAppProcess = (params) => get('/appr/v1/appr/process', params)
/***
 *  @author guanfenda
 *  @desc 审批流程新建接口
 *  @params params
 */
export const postAppProcess = (params) => post('/appr/v1/appr/process', params)
/***
 *  @author guanfenda
 *  @desc 审批流程修改接口
 *  @params params
 */
export const putAppProcess = (params) => put('/appr/v1/appr/process', params)
/***
 * @author guanfenda
 * @desc 审批表单查询接口
 * @params params
 *
 */
export const getApprForm = (params) => get('/appr/v1/appr/form', params)
