import { get, post, put } from '@/router/axios'

// 审批配置管理者查询接口
export const getConfigAdmin = (params) => get('/api/appr/v2/appr/config/admin', params)
// 审批分组查询接口
export const getApprCategory = (params) => get('/api/appr/v2/appr/category', params)

// 审批分组查询接口
export const getApprProcess = (params) => get('/api/appr/v2/appr/process', params)

/**
 * 审批流程新建接口
 * @param {object} params 参数
 * @param {string} params.icon 图标
 * @param {string} params.processName 流程名称
 * @param {string} params.categoryId 所属分类ID
 * @param {Array<{type: string; bizName: string; bizId: string}>} params.processVisible 流程可见范围
 * @param {Array<string>} params.processAdmin 流程管理者
 * @param {string} [params.formKey] 表单key值
 * @param {string} [params.remark] 审批描述
 * @param {string} params.baseJson 流程的base64json字符串
 * @param {number} params.approverDistinct 审批人去重，0：不做任何处理，1：连续审批人去重，2：审批人去重，流程实例中只保留一个
 * @param {number} [params.approverNull] 审批人为空/审批人离职时的处理方式，0：自动通过，1：自动转交给管理员
 * @param {number} [params.isOpinion] 审批意见是否必填，0-非必填，1-必填
 * @param {string} [params.tip] 审批人为空/审批人离职时的处理方式，0：自动通过，1：自动转交给管理员
 * @param {object} params.processMap 变量
 * @param {object} params.processData processData
 * @param {string} params.userId 新建流程的用户ID
 * @returns {{processId:string}} 返回流程id
 */
export const postApprProcess = (params) => post('/api/appr/v2/appr/process', params)

/**
 * 审批流程修改接口
 * @param {object} params 参数
 * @param {string} params.icon 图标
 * @param {number} params.newVersion 是否需要发布新版本，1-是，0-否
 * @param {string} params.processName 流程名称
 * @param {string} params.categoryId 所属分类ID
 * @param {Array<{type: string; bizName: string; bizId: string}>} params.processVisible 流程可见范围
 * @param {Array<string>} params.processAdmin 流程管理者
 * @param {string} [params.formKey] 表单key值
 * @param {string} [params.remark] 审批描述
 * @param {string} params.baseJson 流程的base64json字符串
 * @param {number} params.approverDistinct 审批人去重，0：不做任何处理，1：连续审批人去重，2：审批人去重，流程实例中只保留一个
 * @param {number} [params.approverNull] 审批人为空/审批人离职时的处理方式，0：自动通过，1：自动转交给管理员
 * @param {number} [params.isOpinion] 审批意见是否必填，0-非必填，1-必填
 * @param {string} [params.tip] 审批人为空/审批人离职时的处理方式，0：自动通过，1：自动转交给管理员
 * @param {object} params.processMap 变量
 * @param {object} params.processData processData
 * @param {string} params.userId 新建流程的用户ID
 */
export const putApprProcess = (params) => put('/api/appr/v2/appr/process', params)
