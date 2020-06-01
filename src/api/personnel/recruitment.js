import { get, post, put } from '@/router/axios'

/**
 * 关联招聘需求查询接口 复制流程使用借口
 * */
export const getRecruitmentDetail = (recruitmentId) => {
  return get('/user/v1/recruitment/detail', { ...recruitmentId })
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
 *  招聘需求新增接口
 * @param {String} userId - 	userId
 * @param {String} companyId - 申请公司ID
 * @param {String} orgId -		用人部门ID
 * */
export const submitEewly = (params) => {
  return post('/user/v1/recruitment/info', params)
}
// 查询项目中所有招聘职位
export const getJobInfo = (params) => {
  return get('/api/org/v1/job/list', params)
}

// 查询项目中所有岗位post
export const getPost = () => {
  return get('/org/v1/position/define')
}

/**
 *  招聘任务分配接口
 * @param {String} recruitmentId - 招聘需求ID
 * @param {array} users - 申请公司ID
 * @param {String}users.userId -指定招聘人员ID
 *  @param {String} users.taskNum -	招聘任务数
 * */
export const taskDistribution = (params) => {
  return post('/user/v1/recruitment/task', params)
}

/**
 *  重新分配页面查询接口
 * @param {String} recruitmentId - 招聘需求ID
 * */
export const queryDistribution = (params) => {
  return get('/user/v1/recruitment/task', { ...params })
}
/**
 *  重新分配页面修改接口
 * @param {String} recruitmentId - 招聘需求ID
 * @param {array} users - 申请公司ID
 * @param {String}users.userId -指定招聘人员ID
 *  @param {String} users.taskNum -	招聘任务数
 * */
export const putDistribution = (params) => {
  return put('/user/v1/recruitment/task', params)
}

export const getEntryDetails = (params) => {
  return get('/user/v1/recruitment/user/list', { ...params })
}
