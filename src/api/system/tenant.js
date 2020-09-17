import { get, post, put, del } from '@/router/axios'
/**
 * author guanfenda
 * @desc  查询商户
 *
 * */
export const getTenant = (params) => get('/api/sys/v1/tenant', params)
/**
 * @author guanfenda
 *@desc 新建商户
 *
 * */
export const postTenant = (params) => post('/api/sys/v1/tenant', params)
/**
 * @author guanfenda
 *@desc 新建商户
 *
 * */
export const putTenant = (params) => put('/api/sys/v1/tenant', params)
/**
 * @author guanfenda
 * @desc 新建工号规则
 *
 * */
export const postRule = (params) => post('/sys/v1/tenant/workno/rule', params)
/**
 * @author guanfenda
 * @desc 修改工号规则
 *
 *
 * */
export const putRule = (params) => put('/sys/v1/tenant/workno/rule', params)
/**
 * @author guanfenda
 * @desc 查询工号规则
 * */
export const getRule = (params) => get('/sys/v1/tenant/workno/rule', params)
/**
 * @author guanfenda
 * @desc 查询工号规则
 * */
export const delRule = (params) => del('/sys/v1/tenant/workno/rule', params)
