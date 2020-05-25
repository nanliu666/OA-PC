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
export const addToCandidate = (personId, recruitmentId, userId) => {
  return post('/user/v1/talent/to/candidate', { personId, recruitmentId, userId })
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
export const getRecruitment = () => {
  return get('/user/v1/candidate/recruitment/list')
}

/**
 * 获取转正员工转正数据
 * @param {String} pageNo - 请求页码
 * @param {String} pageSize - 每页条数
 * */
export const getStaffList = (params) => {
  return post('/user/v1/user/formal/list', params)
}

// 转正申请接口
export const getOperation = (params) => {
  return post('/user/v1/user/formal/info', params)
}

/**
 *  人员试用期修改接口
 * @param {String} personId - 人员ID
 * @param {String} summary - 工作心得
 * @param {String} advise - 对公司建议
 * */
export const putProbation = (params) => {
  return put('/user/v1/user/formal/probation', params)
}

/**
 *  全部招聘需求筛选接口
 * @param {String} jobName - 	职位名称。模糊查询
 * @param {String} orgId - 	用人部门ID
 * @param {String} positionId - 岗位ID
 * */
export const getAllRecruitment = (params) => {
  return post('/user/v1/recruitment/all/list', params)
}

/**
 *  我提交的招聘需求筛选接口
 * @param {String} jobName - 用人部门ID
 * @param {String} progress -需求进度
 * @param {String} userId - 	提交人ID
 * */
export const getMyRecruitment = (params) => {
  return post('/user/v1/recruitment/submit/list', params)
}

/**
 *  我的招聘需求筛选接口
 * @param {String} jobName - 	职位名称。模糊查询
 * @param {String} positionId - 		岗位ID
 * @param {String} workYear -	工作年限
 * */
export const getMyScreen = (params) => {
  return post('/user/v1/recruitment/my/list', params)
}

/**
 *  招聘任务修改接口
 * @param {String} recruitmentId -招聘需求ID
 * @param {int} users.taskNum -指定招聘人员ID
 * @param {String} users.operatorType -操作类型，Add-新增，Update-修改限
 * */
export const putTask = (params) => {
  return put('/user/v1/recruitment/task', params)
}
