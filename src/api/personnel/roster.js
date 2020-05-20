import request from '@/router/axios'
// 筛选获取工作地址
export const getWorkAddressList = (params) => {
  return request({
    url: '/api/user/v1/user/work/address',
    method: 'get',
    params: params
  })
}
// 新增工作地址
export const createWorkAddress = (params) => {
  return request({
    url: '/api/user/v1/user/work/address',
    method: 'post',
    params: params
  })
}
// 修改工作地址
export const editWorkAddress = (params) => {
  return request({
    url: '/api/user/v1/user/work/address',
    method: 'put',
    params: params
  })
}
// 删除工作地址
export const deleteWorkAddress = (params) => {
  return request({
    url: '/api/user/v1/user/work/address',
    method: 'delete',
    params: params
  })
}

// 员工列表
export const getUserList = (params) => {
  return request({
    url: '/api/user/v1/user/list',
    method: 'post',
    params: { ...params }
  })
}

// 员工状态人数统计
export const getUserStatusStat = (params) => {
  return request({
    url: '/api/user/v1/user/status/stat',
    method: 'get',
    params: params
  })
}

// 岗位查询
export const getOrgPosition = (params) => {
  return request({
    url: '/api/org/v1/position/define',
    method: 'get',
    params: params
  })
}

// 职位查询
export const getOrgJob = (params) => {
  return request({
    url: '/api/org/v1/job/list',
    method: 'get',
    params: params
  })
}

// 组织机构下的公司查询
export const getOrganizationCompany = (params) => {
  return request({
    url: '/api/org/v1/organization/company',
    method: 'get',
    params: params
  })
}

// 工号自动生成
export const createNewWorkNo = (params) => {
  return request({
    url: '/api/user/v1/user/workno',
    method: 'get',
    params: params
  })
}

// 员工信息校验
export const checkUserInfo = (params) => {
  return request({
    url: '/api/user/v1/user/info/check',
    method: 'post',
    params: params
  })
}

// 添加员工列表
export const createUser = (params) => {
  return request({
    url: '/api/user/v1/user/info',
    method: 'post',
    params: params
  })
}
// 获取管理员工转正数据
export const getStaffList = (params) => {
  return request({
    url: '/user/v1/user/formal/list',
    method: 'post',
    params: { ...params }
  })
}

// 转正申请接口
export const getOperation = (params) => {
  return request({
    url: '/user/v1/user/formal/info',
    method: 'post',
    params: { ...params }
  })
}
// 获取当前员工的入职以及转正时间
export const getFormalTime = (params) => {
  return request({
    url: '/user/v1/user/formal/formalTime',
    method: 'post',
    params: { ...params }
  })
}
// 提交当前用户的试用日期
export const putProbation = (params) => {
  return request({
    url: '/user/v1/user/formal/probation',
    method: 'post',
    params: params
  })
}
