import { get, post } from '@/router/axios'
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
// 审批详情
export const getApprDetail = (params) => get('/appr/v2/appr/process/apply/detail', params)

// 审批历史记录、审批进度
export const getApprRecord = (params) => get('/appr/v2/appr/apply/record', params)
// 同意审批
export const createApprPass = (params) => post('/appr/v2/appr/apply/pass', params)
// 审批拒绝
export const createApprReject = (params) => post('/appr/v2/appr/apply/reject', params)
// 撤销
export const createApprCancel = (params) => post('/appr/v2/appr/apply/cancel', params)
// 催一下
export const createApprUrge = (params) => post('/appr/v2/appr/apply/urge', params)
