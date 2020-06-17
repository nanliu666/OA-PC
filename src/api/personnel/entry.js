import { get, post } from '@/router/axios'

// 待入职人员筛选
export const getCandidateAcceptList = (params) => {
  return post('/api/user/v1/candidate/accept/list', params)
}
// 待入职人员详情
export const getCandidateAcceptDetail = (params) => {
  return get('/api/user/v1/candidate/accept/detail', params)
}
// 待入职人员放弃入职
export const getOutCandidateAccept = (params) => {
  return post('/api/user/v1/candidate/accept/out', params)
}

// 放弃入职人员添加到待入职
export const addOutCandidateAccept = (params) => {
  return post('/api/user/v1/candidate/out/to/accept', params)
}

// 录用申请查询接口
export const getOfferApply = (params) => {
  return get('/api/user/v1/candidate/offer/apply', params)
}

// 员工合同签订接口
export const createContract = (params) => {
  return post('/api/user/v1/user/contract/info', params)
}

// 入职登记表通知修改接口
export const notifyCandidateRegister = (params) => {
  return post('/user/v1/candidate/register/notify', params)
}

// 入职登记表确认接口
export const confirmEntryRegister = (params) => post('/user/v1/candidate/register/confirm', params)

// 入职登记表发送接口
export const sendEntryRegister = (params) => post('/user/v1/candidate/register/send', params)

// 入职登记表发送接口
export const postEntryRegisterSend = (params) => post('/user/v1/candidate/register/send', params)
