// /user/v1/user/work/address
import { get } from '@/router/axios'
/***
 *  @author guanfenda
 *  @desc 工作地址查询接口
 *  @params params
 */
export const getWorkAddress = (params) => get('/user/v1/user/work/address', params)
// /org/v1/organization/company
/***
 *  @author guanfenda
 *  @desc 公司查询接口
 *  @params params
 */
export const getCompany = (params) => get('/org/v1/organization/company', params)
/***
 *  @author guanfenda
 *  @desc 职位汇总查询接口
 *  @params params
 */
export const getJob = (params) => get('/org/v1/job/list', params)
/***
 *  @author guanfenda
 *  @desc 岗位定义查询接口
 *  @params params
 */
export const getposition = (params) => get('/org/v1/position/define', params)
