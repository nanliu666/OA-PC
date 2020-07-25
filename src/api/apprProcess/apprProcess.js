import { get } from '@/router/axios'
/**
 * 审批流程查询接口
 * @param {Object} params - 参数
 * @param {String} params.processId - 流程ID
 * */
export const getProcessDetail = (params) => get('/appr/v2/appr/process', params)

/**
 *
 * @param {*} params
 */
export const getProcessList = (params) => get('/appr/v2/appr/process/list', params)
