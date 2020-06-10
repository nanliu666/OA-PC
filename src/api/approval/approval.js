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

/****************************************************************************************
 * @author
 * @desc我发起的审批查询接口
 * @params params
 *
 */
export const getMyApprList = (params) => post('/appr/v1/appr/my/approve/list', params)
/*
 * @author
 * @desc申请信息查询
 * @params params
 *
 */

export const getApplyDetail = (params) => get('/appr/v1/appr/apply/user', params)

//招聘需求申请详情查询

export const getRecruitmentApply = (params) => {
  return get('/user/v1/recruitment/detail', params)
}

// 录用申请详情查询接口
export const getOfferApply = (params) => {
  return get('/user/v1/candidate/offer/apply', params)
}

// 转正申请详情查询接口
export const getOperationApply = (params) => {
  return get('/user/v1/user/formal/info', params)
}

// 续签合同申请详情查询

export const getContractApply = (params) => {
  return get('/user/v1/user/contract/apply', params)
}

// 离职申请详情查询

export const getLeaveApply = (params) => {
  return get('/user/v1/user/leave/info', params)
}

// 人事异动申请详情查询

export const getChangeApply = (params) => {
  return get('/user/v1/user/change/info', params)
}
// 更改需求人数详情查询
export const getRecChangeNumApply = (params) => {
  return get('/user/v1/recruitment/change/num', params)
}

// 流程进度和审批记录，调用接口
export const getApplyRecord = (params) => {
  return get('/appr/v1/appr/apply/record', params)
}

// 审批申请撤销接口

export const cancelApply = (params) => {
  return post('/appr/v1/appr/apply/cancel', params)
}

// 催一下
export const createdUrge = (params) => {
  return post('/appr/v1/appr/apply/urge', params)
}

// 待我审批查询接口
export const createdWaitApprList = (params) => {
  return post('/appr/v1/appr/wait/approve/list', params)
}
// 同意审批
export const createdPassAppr = (params) => {
  return post('/appr/v1/appr/apply/pass', params)
}
// 拒绝审批
export const createdRejectAppr = (params) => {
  return post('/appr/v1/appr/apply/reject', params)
}

// 我已审批查询接口
export const createdHasApprList = (params) => {
  return post('/appr/v1/appr/has/approve/list', params)
}

/**
 * 审批申请提交接口
 * @param {String} params
 * */
export const createApprApply = (params) => {
  return post('/appr/v1/appr/apply/submit', params)
}
