import { get, post, put } from '@/router/axios'

/**
 * 人才库添加接口
 * @param {Object} params - 参数
 * */
export const createTalent = (params) => {
  return post('/user/v1/talent/info', params)
}
/**
 * 人才库列表接口
 * @param {Object} params - 参数
 * */
export const getTalentList = (params) => {
  return post('/user/v1/talent/list', params)
}
/**
 * 添加到候选人接口
 * @param {String} personId - 人员ID
 * @param {String} recruitmentId - 招聘需求ID
 * @param {String} userId - 添加候选人的员工ID
 * */
export const addToCandidate = (params) => {
  return post('/user/v1/talent/to/candidate', params)
}

/**
 * 候选人添加接口
 * @param {Object} params - 参数
 * */
export const createCandidate = (params) => {
  return post('/user/v1/candidate/info', params)
}
/**
 * 人员详情查询接口
 * @param {String} personId - 人员ID
 * */
export const getPersonInfo = (personId) => {
  return get('/user/v1/person/info', { personId })
}
/**
 * 人员信息编辑接口
 * @param {Object} params - 参数
 * */
export const modifyPerson = (params) => {
  return put('/user/v1/person/info', params)
}

/**
 * 标签新增接口
 * @param {String} name - 标签名
 * @param {String} color - 标签颜色
 * */
export const createTag = (name, color) => {
  return post('/user/v1/tag', { name, color })
}

/**
 * 标签查询接口
 * @param {String} pageNo - 请求页码
 * @param {String} pageSize - 每页条数
 * @param {String} name - 标签名，支持模糊查询
 * */
export const getTagList = (name, color) => {
  return get('/user/v1/tag', { name, color })
}

/**
 * 关联招聘需求查询接口
 * */
export const getRecruitmentList = () => {
  return get('/user/v1/candidate/recruitment/list')
}
