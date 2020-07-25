import { get, post } from '@/router/axios'

// 审批配置管理者查询接口
export const getConfigAdmin = (params) => get('/api/appr/v2/appr/config/admin', params)
// 审批分组查询接口
export const getApprCategory = (params) => get('/api/appr/v2/appr/category', params)

// 审批分组查询接口
export const getApprProcess = (params) => get('/api/appr/v2/appr/process', params)

export const postApprProcess = (params) => post('/api/appr/v2/appr/process', params)
