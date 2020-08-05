/**
 * @file 数据看板 api 接口
 */
import { get } from '@/router/axios'

// ----->  1. 统计概况

/**
 * 在职人数统计查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @param {Date} params.qryMonth 查询月份，格式：YYYY-MM
 * @returns {Promise<{workNum: number}>} 返回参数
 */
export const getStatWorkNum = (params) => get('/data/v1/data/stat/workNum', params)

/**
 * 各部门在职人数查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @param {Date} params.qryMonth 查询月份，格式：YYYY-MM
 * @returns {Promise<{workNum: number}>} 返回参数
 */
export const getOrgWorkNum = (params) => get('/data/v1/data/stat/org/workNum', params)

/**
 * 各部门月员工离职率查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @param {Date} params.qryMonth 查询月份，格式：YYYY-MM
 * @returns {Promise<Array<{workNum: number, leaveNum: number, leaveRate: number, orgId: string, orgName: string}>>}
 */
export const getOrgLeaveRate = (params) => get('/data/v1/data/stat/org/leaveRate', params)

/**
 * 各部门离职人数查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @param {Date} params.qryMonth 查询月份，格式：YYYY-MM
 * @returns {Promise<Array<{workNum: number, leaveNum: number, leaveRate: number, orgId: string, orgName: string}>>}
 */
export const getOrgLeaveNum = (params) => get('/data/v1/data/stat/org/leaveNum', params)

/**
 * 各部门转正人数查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @param {Date} params.qryMonth 查询月份，格式：YYYY-MM
 * @returns {Promise<Array<{formalNum: number, orgId: string, orgName: string}>>} 返回参数
 */
export const getOrgFormalNum = (params) => get('/data/v1/data/stat/org/formalNum', params)

/**
 * 各部门月员工新进率查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @param {Date} params.qryMonth 查询月份，格式：YYYY-MM
 * @returns {Promise<Array<{workNum: number, entryNum: number, entryRate: number,orgId: string,orgName: string}>>}
 */
export const getOrgEntryRate = (params) => get('/data/v1/data/stat/org/entryRate', params)

/**
 * 各部门入职人数查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @param {Date} params.qryMonth 查询月份，格式：YYYY-MM
 * @returns {Promise<Array<{entryNum: number,orgId: string,orgName: string}>>} 返回参数
 */
export const getOrgEntryNum = (params) => get('/data/v1/data/stat/org/entryNum', params)

/**
 * 各部门月员工进出比率查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @param {Date} params.qryMonth 查询月份，格式：YYYY-MM
 * @returns {Promise<Array<{entryNum: number,leaveNum: number, orgId: string,orgName: string}>>} 返回参数
 */
export const getOrgEntryAndLeave = (params) => get('/data/v1/data/stat/org/entryAndLeave', params)

/**
 * 各部门异动人数查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @param {Date} params.qryMonth 查询月份，格式：YYYY-MM
 * @returns {Promise<Array<{changeNum: number,orgId: string,orgName: string}>>} 返回参数
 */
export const getOrgChangeNum = (params) => get('/data/v1/data/stat/org/changeNum', params)

/**
 * 离职原因分析统计查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @param {Date} params.qryMonth 查询月份，格式：YYYY-MM
 * @returns {Promise<Array<{leaveNum: number,reason: string}>>} 返回参数
 */
export const getStatLeaveReason = (params) => get('/data/v1/data/stat/leaveReason', params)

/**
 * 离职人数统计查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @param {Date} params.qryMonth 查询月份，格式：YYYY-MM
 * @returns {Promise<{leaveNum: number}>} 返回参数
 */
export const getStatLeaveNum = (params) => get('/data/v1/data/stat/leaveNum', params)

/**
 * 转正人数统计查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @param {Date} params.qryMonth 查询月份，格式：YYYY-MM
 * @returns {Promise<{formalNum: number}>} 返回参数
 */
export const getStatFormalNum = (params) => get('/data/v1/data/stat/formalNum', params)

/**
 * 入职人数统计查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @param {Date} params.qryMonth 查询月份，格式：YYYY-MM
 * @returns {Promise<{entryNum: number}>} 返回参数
 */
export const getStatEntryNum = (params) => get('/data/v1/data/stat/entryNum', params)

/**
 * 人事异动人数统计查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @param {Date} params.qryMonth 查询月份，格式：YYYY-MM
 * @returns {Promise<{changeNum: number}>} 返回参数
 */
export const getStatChangeNum = (params) => get('/data/v1/data/stat/changeNum', params)

// ----->  2. 员工概况

/**
 * 员工年代分布查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @returns {Promise<Array<{workNum: number, sex: number, yearName: string}>>} 返回参数
 */
export const getUserYear = (params) => get('/data/v1/data/user/year', params)

/**
 * 员工工作性质查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @returns {Promise<Array<{workNum: number,workProperty: string}>>} 返回参数
 */
export const getUserWorkProperty = (params) => get('/data/v1/data/user/workProperty', params)

/**
 * 员工工龄查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @returns {Promise<Array<{workNum: number,ageName: string}>>} 返回参数
 */
export const getUserWorkAge = (params) => get('/data/v1/data/user/workAge', params)

/**
 * 员工工作地省份分布查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @returns {Promise<Array<{workNum: number,provinceCode: string, provinceName: string}>>} 返回参数
 */
export const getWorkProvince = (params) => get('/data/v1/data/user/work/province', params)

/**
 * 员工工作地地市分布查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @param {string} params.provinceCode 工作地省份编码
 * @returns {Promise<Array<{workNum: number, cityCode: string, cityName: string}>>} 返回参数
 */
export const getWorkCity = (params) => get('/data/v1/data/user/work/city', params)

/**
 * 员工性别查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @returns {Promise<Array<{workNum: number, sex: number}>>} 返回参数
 */
export const getUserSex = (params) => get('/data/v1/data/user/sex', params)

/**
 * 员工岗位类别查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @returns {Promise<Array<{workNum: number,positionId: string, positionName: string}>>} 返回参数
 */
export const getUserPosition = (params) => get('/data/v1/data/user/position', params)

/**
 * 员工籍贯省份分布查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @returns {Promise<Array<{workNum: number, provinceCode: string, provinceName: string}>>} 返回参数
 */
export const getNativeProvince = (params) => get('/data/v1/data/user/native/province', params)

/**
 * 员工籍贯地市分布查询接口
 * @param {object} params
 * @param {string}  部门id
 * @returns {Promise<Array<{workNum: number, cityCode: string, cityName: string}>>} 返回参数
 */
export const getNativeCity = (params) => get('/data/v1/data/user/native/city', params)

/**
 * 员工民族查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @returns {Promise<Array<{workNum: number,nation: string}>>} 返回参数
 */
export const getUserNation = (params) => get('/data/v1/data/user/nation', params)

/**
 * 员工婚育状况查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @returns {Promise<Array<{workNum: number,sex: number,marriage: number}>>} 返回参数
 */
export const getUserMarriage = (params) => get('/data/v1/data/user/marriage', params)

/**
 * 员工学历查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @returns {Promise<Array<{workNum: number,educationalLevel: string}>>} 返回参数
 */
export const getUserEducationalLevel = (params) =>
  get('/data/v1/data/user/educationalLevel', params)

/**
 * 员工司龄查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @returns {Promise<Array<{workNum: number, ageName: string}>>} 返回参数
 */
export const getUserCompanyAge = (params) => get('/data/v1/data/user/companyAge', params)

/**
 * 员工年龄查询接口
 * @param {object} params
 * @param {string} params.orgId 部门id
 * @returns {Promise<Array<{workNum: number,sex: number, ageName: string}>>} 返回参数
 */
export const getUserAge = (params) => get('/data/v1/data/user/age', params)

// ----->  3. 招聘概况

/**
 * 年度入职人数查询接口
 * @param {object} params
 * @param {string} [params.qryMonth] 查询月份，格式：YYYY-MM
 * @returns {Promise<Array<{entryNum: number,statMonth: Date}>>} 返回参数
 */
export const getUserEntryNum = (params) => get('/data/v1/data/user/entryNum', params)

/**
 * 人才库性别查询接口
 * @param {void} params
 * @returns {Promise<{num:number, sex: number}>} 返回参数
 */
export const getTalentSex = (params) => get('/data/v1/data/talent/sex', params)

/**
 * 人才库职位查询接口
 * @param {void} params
 * @returns {Promise<Array<{num: number, jobId: string, jobName: string}>>} 返回参数
 */
export const getTalentJob = (params) => get('/data/v1/data/talent/job', params)

/**
 * 人才库学历查询接口
 * @param {void} params
 * @returns {Promise<Array<{num: number,educationalLevel: string}>>} 返回参数
 */
export const getTalentEducationalLevel = (params) =>
  get('/data/v1/data/talent/educationalLevel', params)

/**
 * 人才库年龄查询接口
 * @param {void} params
 * @returns {Promise<Array<{num: number,sex: number,ageName: string}>>} 返回参数
 */
export const getTalentAge = (params) => get('/data/v1/data/talent/age', params)

/**
 * 招聘过程数据漏斗查询接口
 * @param {object} params
 * @param {Date} params.qryMonth
 * @returns {Promise<Array<num: number,status: string>>} 返回参数
 */
export const getRecruitmentStat = (params) => get('/data/v1/data/recruitment/stat', params)

/**
 * 整体招聘进度查询接口
 * @param {object} params
 * @param {Date} params.qryMonth
 * @returns {Promise<{approvedNum: number,finishedNum: number}>} 返回参数
 */
export const getRecruitmentProgress = (params) => get('/data/v1/data/recruitment/progress', params)

/**
 * 各部门招聘进度查询接口
 * @param {object} params
 * @param {Date} params.qryMonth
 * @returns {Promise<Array<{approvedNum: number,finishedNum: number,orgId: string,orgName: string}>>} 返回参数
 */
export const getRecruitmentOrgProgress = (params) =>
  get('/data/v1/data/recruitment/orgProgress', params)

/**
 * 招聘渠道查询接口
 * @param {object} params
 * @param {Date} params.qryMonth
 * @returns {Promise<Array<num: number,channel: string>>} 返回参数
 */
export const getRecruitmentChannel = (params) => get('/data/v1/data/recruitment/channel', params)
