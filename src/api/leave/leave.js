import request from '@/router/axios'
// 1.员工离职申请提交接口【POST /user/v1/user/leave/info】
export const applyLeaveInfo = (params) => {
  return request({
    url: '/api/user/v1/user/leave/info',
    method: 'post',
    data: params
  })
}
// 2.待离职、已离职员工筛选，调用接口：离职管理员工筛选接口【POST /user/v1/user/leave/list】
export const getLeaveList = (params) => {
  return request({
    url: '/api/user/v1/user/leave/list',
    method: 'post',
    data: params
  })
}
// 3.员工离职信息查询，调用接口：员工离职信息查询接口【GET /user/v1/user/leave/info】
export const getLeaveInfo = (params) => {
  return request({
    url: '/api/user/v1/user/leave/info',
    method: 'get',
    params: params
  })
}
//4.调整离职信息，调用接口：员工离职信息修改接口【PUT /user/v1/user/leave/info】
export const changeLeaveInfo = (params) => {
  return request({
    url: '/api/user/v1/user/leave/info',
    method: 'put',
    params: params
  })
}
// 5、确认离职，调用接口：员工确认离职提交接口【POST /user/v1/user/leave/confirm】
export const confirmLeave = (params) => {
  return request({
    url: '/api/user/v1/user/leave/confirm',
    method: 'post',
    data: params
  })
}
// 6、放弃离职，调用接口：员工放弃离职接口【POST /user/v1/user/leave/giveup】
export const giveupLeave = (params) => {
  return request({
    url: '/api/user/v1/user/leave/giveup',
    method: 'post',
    data: params
  })
}
// 7、离职事项分组数据，调用接口：员工离职交接事项分组查询接口【GET /user/v1/user/leave/note/group】
export const getLeaveNoteGroup = (params) => {
  return request({
    url: '/api/user/v1/user/leave/note/group',
    method: 'get',
    params: params
  })
}
//8. 离职事项分组明细，调用接口：员工离职交接事项分类查询接口【GET /user/v1/user/leave/note/category】
export const getLeaveNoteCategory = (params) => {
  return request({
    url: '/api/user/v1/user/leave/note/category',
    method: 'get',
    params: params
  })
}
//9. 离职证明信息的查询，调用接口：离职证明信息查询接口【GET /user/v1/user/leave/cert】
export const getLeaveCert = (params) => {
  return request({
    url: '/api/user/v1/user/leave/cert',
    method: 'get',
    params: params
  })
}
