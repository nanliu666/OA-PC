import { get, post, put } from '@/router/axios'

/**
 * 关联招聘需求查询接口
 * */
export const getRecruitmentDetail = (recruitmentId) => {
  return get('/user/v1/recruitment/detail', { recruitmentId })
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
 * @param {String} users.operatorType -操作类型，Add-新增，Update-修改
 * */
export const putTask = (params) => {
  return put('/user/v1/recruitment/task', params)
}
