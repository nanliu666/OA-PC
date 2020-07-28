import { del, get, post, put } from '@/router/axios'
/**
 * 审批流程查询接口
 * @param {Object} params - 参数
 * @param {String} params.processId - 流程ID
 * */
export const getProcessDetail = (params) => get('/appr/v2/appr/process', params)

/**
 * 审批流程列表查询接口
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
/**
 * 可发起的审批流程查询接口
 * @param {*} params
 */
export const getUserProcessList = (params) => get('/appr/v2/appr/user/process/list', params)
/**
 * 审批分组新建接口
 */
export const addProcessCategory = (params) => post('/appr/v2/appr/category', params)
/**
 * 审批分组新建接口
 */
export const renameProcessCategory = (params) => put('/appr/v2/appr/category', params)
/**
 * 审批分组删除接口
 */
export const deleteCategory = (params) => del('/appr/v2/appr/category', params)
/**
 * 审批流程删除接口
 */
export const deleteProcess = (params) => del('/appr/v2/appr/process/del', params)
/**
 * 审批流程停用接口
 */
export const stopProcessCategory = (params) => post('/appr/v2/appr/process/stop', params)
/**
 * 未启用审批流程列表查询接口
 */
export const getDraftList = (params) => get('/appr/v2/appr/process/draft/list', params)
/**
 * 审批分组查询接口
 */
export const getCategoryList = (params) => get('/appr/v2/appr/category', params)
/**
 * 审批流程移动接口
 */
export const moveProcess = (params) => post('/appr/v2/appr/process/move', params)
/**
 * 审批流程启用接口
 */
export const startProcess = (params) => post('/appr/v2/appr/process/start', params)
/**
 * 审批流程发布接口
 */
export const releaseProcess = (params) => post('/appr/v2/appr/process/release', params)
/**
 * 审批流程发布接口
 */
export const sortCategory = (params) => post('/appr/v2/appr/category/sort', params)
/**
 * 审批流程排序接口
 */
export const sortProcess = (params) => post('/appr/v2/appr/process/sort', params)

/**
 * 审批记录查询接口
 * @param {object} params 查询参数
 */
export const getRecordList = (params) => get('/appr/v2/appr/approve/record/list', params)

/**
 *
 * 审批类型查询接口
 * @package {obje}
 * @param {object} [params] 查询参数
 * @param {string} [params.processName] 流程名称，支持模糊搜索
 */
export const getProcessType = (params) => get('/appr/v2/appr/process/type', params)
