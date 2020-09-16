import { get, post, put } from '@/router/axios'

// 待入职人员筛选
export const getCandidateAcceptList = (params) => {
  return post('/api/user/v2/candidate/accept/list', params)
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

// 员工合同编辑接口
export const editContract = (params) => {
  return put('/api/user/v1/user/contract/info', params)
}

// 入职登记表通知修改接口
export const notifyCandidateRegister = (params) => {
  return post('/user/v1/candidate/register/notify', params)
}

// 入职登记表确认接口
export const confirmEntryRegister = (params) => post('/user/v1/candidate/register/confirm', params)

// 更改入职日期，调用接口：更改入职日期提交接口【POST /user/v1/candidate/entry/date】，新增接口
export const changeEntryDate = (params) => post('/user/v1/candidate/entry/date', params)
// 查询及筛选，调用接口：放弃入职人员筛选查询接口【POST /user/v1/candidate/giveup/list】，新增接口
export const getGiveUpEntryist = (params) => post('/user/v1/candidate/giveup/list', params)
