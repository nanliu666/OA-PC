import { get, post, put } from '@/router/axios'

// 候选人统计
export const getCandidateStatusStat = (params) => {
  return get('/api/user/v1/candidate/status/stat', params)
}

// 候选人筛选
export const getCandidateList = (params) => {
  return post('/api/user/v2/candidate/list', params)
}

// 已淘汰候选人筛选
export const getCandidateOutList = (params) => {
  return post('/api/user/v2/candidate/out/list', params)
}

// 候选人淘汰
export const weedOutCandidate = (params) => {
  return post('/api/user/v2/candidate/out', params)
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

// 候选人人员详情查询
export const getCandidateInfo = (params) => {
  return get('/api/user/v2/candidate/info', params)
}

// 已淘汰人员详情查询
export const getCandidateOutInfo = (params) => {
  return get('/api/user/v2/candidate/out/info', params)
}

// 人员动态查询
export const getPersonRecord = (params) => {
  return get('/api/log/v1/person/record', params)
}

/**
 * offer查询接口
 * @param {String} id - offer ID
 * */
export const getOfferInfo = (id) => {
  return get('/user/v1/candidate/offer', { id })
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
 * @param {String} applyId - 录用申请id
 * */
export const getOfferApply = (id) => {
  return get('/user/v1/candidate/offer/apply', { id })
}
/**
 * @author guanfenda
 * @desc 面试登记表发送接口
 * */
export const postRegisterSend = (params) => post('/user/v1/interview/register/send', params)

// 候选人简历推送审核接口
export const postResumeCheck = (params) => post('/user/v1/person/resume/check', params)

// 面试登记表确认接口
export const confirmInterviewRegister = (params) =>
  post('/user/v1/interview/register/confirm', params)

// 面试登记表通知修改接口
export const notifyInterviewRegister = (params) =>
  post('/user/v1/interview/register/notify', params)
