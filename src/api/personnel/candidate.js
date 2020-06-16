import { get, post, put } from '@/router/axios'

// 候选人统计
export const getCandidateStatusStat = (params) => {
  return get('/api/user/v1/candidate/status/stat', params)
}

// 候选人筛选
export const getCandidateList = (params) => {
  return post('/api/user/v1/candidate/list', params)
}

// 候选人淘汰
export const weedOutCandidate = (params) => {
  return post('/api/user/v1/candidate/out', params)
}

// 关联招聘需求查询
export const getRecruitmentList = (params) => {
  return get('/api/user/v1/candidate/recruitment/list', params)
}

// 候选人更改职位
export const changeCandidateJob = (params) => {
  return post('/api/user/v1/candidate/job/change', params)
}

// 恢复为候选人
export const recoverCandidate = (params) => {
  return post('/api/user/v1/candidate/recover', params)
}

// 接受offer
export const acceptCandidateOffer = (params) => {
  return post('/api/user/v1/candidate/offer/accept', params)
}

// 变更offer
export const changeCandidateOffer = (params) => {
  return post('/api/user/v1/candidate/offer/change', params)
}

// 人员详情查询
export const getPersonInfo = (params) => {
  return get('/api/user/v1/person/info', params)
}

// 人员动态查询
export const getPersonRecord = (params) => {
  return get('/api/log/v1/person/record', params)
}

/**
 * offer查询接口
 * @param {String} personId - 人员ID
 * */
export const getOfferInfo = (personId) => {
  return get('/user/v1/candidate/offer', { personId })
}

/**
 * offer新建接口
 * @param {Object} params
 * */
export const createOffer = (params) => {
  return post('/user/v1/candidate/offer', params)
}

/**
 * offer编辑接口
 * @param {Object} params
 * */
export const modifyOffer = (params) => {
  return put('/user/v1/candidate/offer', params)
}

/**
 * offer发送接口
 * @param {Object} params
 * */
export const sendOffer = (params) => {
  return post('/user/v1/candidate/offer/send', params)
}
/**
 * 录用申请查询接口
 * @param {String} personId - 人员ID
 * */
export const getOfferApply = (id) => {
  return get('/user/v1/candidate/offer/apply', { id })
}
/**
 * @author guanfenda
 * @desc 面试登记表发送接口
 * */
export const postRegisterSend = (params) => post('/user/v1/interview/register/send', params)
