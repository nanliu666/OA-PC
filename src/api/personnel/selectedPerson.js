// /user/v1/user/work/address
import { get, post, put, del } from '@/router/axios'
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
/***
 *  @author guanfenda
 *  @desc 组织机构树查询接口
 *  @params params
 */
export const getTree = (params) => get('/org/v1/organization/tree', params)

/***
 *  @author guanfenda
 *  @desc 录用申请提交接口
 *  @params params
 */
export const postOfferApply = (params) => post('/user/v1/candidate/offer/apply', params)

/***
 *  @author guanfenda
 *  @desc 录用申请查询接口
 *  @params params
 */
export const getOfferApply = (params) => get('/user/v1/candidate/offer/apply', params)

/***
 *  @author guanfenda
 *  @desc 招聘需求详情查询接口
 *  @params params
 */
export const getRecruitmentDetail = (params) => get('/user/v1/recruitment/detail', params)

/***
 *  @author guanfenda
 *  @desc 在职员工查询接口
 *  @params params
 */
export const getWorklist = (params) => get('/user/v1/user/work/list', params)
/***
 * @author guanfenda
 * @desc  面试信息地址查询接口
 *
 *@params params
 * */
export const getAddresss = (params) => get('/user/v1/person/interview/addresss', params)

/***
 * @author guanfenda
 * @desc  面试信息地址新增接口
 *
 *@params params
 * */
export const postAddresss = (params) => post('/user/v1/person/interview/addresss', params)
/***
 * @author guanfenda
 * @desc  面试信息地址修改接口
 *
 *@params params
 * */
export const putAddresss = (params) => put('/user/v1/person/interview/addresss', params)
/***
 * @author guanfenda
 * @desc  面试信息地址修改接口
 *
 *@params params
 * */
export const delAddresss = (params) => del('/user/v1/person/interview/addresss', params)

/***
 * @author guanfenda
 * @desc  安排面试发送接口
 *
 *@params params
 * */
export const postInterViewSend = (params) => post('/user/v1/person/interview/send', params)

/***
 * @author guanfenda
 * @desc  重新安排面试发送接口
 *
 *@params params
 * */
export const postInterViewResend = (params) => post('/user/v1/person/interview/resend', params)
/***
 * @author wuweiyan
 * @desc  安排复试发送接口
 *
 *@params params
 * */
export const postInterViewRetest = (params) => post('/user/v1/person/interview/retest', params)
/***
 * @author guanfenda
 * @desc  人员信息查询接口
 *
 *@params params
 * */
export const getpersonInfo = (params) => get('/helper/v1/person/info', params)
// /helper/v1/person/info
/***
 * @author guanfenda
 * @desc  人员信息修改接口
 *
 *@params params
 * */
export const putpersonInfo = (params) => put('/helper/v1/person/info', params)
/***
 *
 * @author guanfenda
 * @desc 人员详情查询接口 /user/v1/person/info
 * */
export const getPersonInfo = (params) => get('/user/v1/person/info', params)
