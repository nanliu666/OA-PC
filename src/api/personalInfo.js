import request from '@/router/axios'

export const getPersonalInfo = (params) => {
  return request({
    url: '/user/wxmini/v1/user/info',
    method: 'get',
    params: {
      ...params
    }
  })
}
export const updateInfo = (params) => {
  return request({
    url: '/user/wxmini/v1/user/info',
    method: 'post',
    params: {
      ...params
    }
  })
}
export const getCode = (params) => {
  return request({
    url: '/common/v1/sms/send',
    method: 'post',
    params: {
      ...params
    }
  })
}

//查询员工信息
export const getStaffBasicInfo = (params) => {
  return request({
    url: '/user/v1/user/info',
    method: 'get',
    params: {
      ...params
    }
  })
}

//编辑员工信息
export const editStaffBasicInfo = (params) => {
  return request({
    url: '/user/v1/user/info',
    method: 'put',
    params: {
      ...params
    }
  })
}

//查询员工紧急联系人的信息
export const getStaffEmerInfo = (params) => {
  return request({
    url: '/user/v1/user/emer/info',
    method: 'get',
    params: {
      ...params
    }
  })
}
//删除员工紧急联系人的信息
export const delStaffEmerInfo = (params) => {
  return request({
    url: '/user/v1/user/emer/info',
    method: 'delete',
    params: {
      ...params
    }
  })
}
////修改员工紧急联系人的信息
export const editStaffEmerInfo = (params) => {
  return request({
    url: '/user/v1/user/emer/info',
    method: 'put',
    params: {
      ...params
    }
  })
}
//添加员工紧急联系人的信息
export const addStaffEmerInfo = (params) => {
  return request({
    url: '/user/v1/user/emer/info',
    method: 'post',
    params: {
      ...params
    }
  })
}

//查询员工教育经历的信息
export const getStaffEducationInfo = (params) => {
  return request({
    url: '/user/v1/user/education/info',
    method: 'get',
    params: {
      ...params
    }
  })
}
//删除员工教育经历的信息
export const delStaffEducationInfo = (params) => {
  return request({
    url: '/user/v1/user/education/info',
    method: 'delete',
    params: {
      ...params
    }
  })
}
////修改员工教育经历的信息
export const editStaffEducationInfo = (params) => {
  return request({
    url: '/user/v1/user/education/info',
    method: 'put',
    params: {
      ...params
    }
  })
}
//添加员工教育经历的信息
export const addStaffEducationInfo = (params) => {
  return request({
    url: '/user/v1/user/education/info',
    method: 'post',
    params: {
      ...params
    }
  })
}

//查询员工工作经历的信息
export const getStaffWorkInfo = (params) => {
  return request({
    url: '/user/v1/user/work/info',
    method: 'get',
    params: {
      ...params
    }
  })
}
//删除员工工作经历的信息
export const delStaffWorkInfo = (params) => {
  return request({
    url: '/user/v1/user/work/info',
    method: 'delete',
    params: {
      ...params
    }
  })
}
////修改员工工作经历的信息
export const editStaffWorkInfo = (params) => {
  return request({
    url: '/user/v1/user/work/info',
    method: 'put',
    params: {
      ...params
    }
  })
}
//添加员工工作经历的信息
export const addStaffworkInfo = (params) => {
  return request({
    url: '/user/v1/user/work/info',
    method: 'post',
    params: {
      ...params
    }
  })
}

//查询员工培训经历的信息
export const getStaffTrainInfo = (params) => {
  return request({
    url: '/user/v1/user/train/info',
    method: 'get',
    params: {
      ...params
    }
  })
}
//删除员工培训经历的信息
export const delStaffTrainInfo = (params) => {
  return request({
    url: '/user/v1/user/train/info',
    method: 'delete',
    params: {
      ...params
    }
  })
}
////修改员工培训经历的信息
export const editStaffTrainInfo = (params) => {
  return request({
    url: '/user/v1/user/train/info',
    method: 'put',
    params: {
      ...params
    }
  })
}
//添加员工培训经历的信息
export const addStaffTrainInfo = (params) => {
  return request({
    url: '/user/v1/user/train/info',
    method: 'post',
    params: {
      ...params
    }
  })
}

//查询员工家庭信息
export const getStaffFamilyInfo = (params) => {
  return request({
    url: '/user/v1/user/family/info',
    method: 'get',
    params: {
      ...params
    }
  })
}
//删除员工家庭信息
export const delStaffFamilyInfo = (params) => {
  return request({
    url: '/user/v1/user/family/info',
    method: 'delete',
    params: {
      ...params
    }
  })
}
////修改员工家庭信息
export const editStaffFamilyInfo = (params) => {
  return request({
    url: '/user/v1/user/family/info',
    method: 'put',
    params: {
      ...params
    }
  })
}
//添加员工家庭信息
export const addStaffFamilyInfo = (params) => {
  return request({
    url: '/user/v1/user/family/info',
    method: 'post',
    params: {
      ...params
    }
  })
}

//查询员工证书信息
export const getStaffCertificate = (params) => {
  return request({
    url: '/user/v1/user/certificate/info',
    method: 'get',
    params: {
      ...params
    }
  })
}
//删除员工证书信息
export const delStaffCertificate = (params) => {
  return request({
    url: '/user/v1/user/certificate/info',
    method: 'delete',
    params: {
      ...params
    }
  })
}
////修改员工证书信息
export const editStaffCertificate = (params) => {
  return request({
    url: '/user/v1/user/certificate/info',
    method: 'put',
    params: {
      ...params
    }
  })
}
//添加员工证书信息
export const addStaffCertificate = (params) => {
  return request({
    url: '/user/v1/user/certificate/info',
    method: 'post',
    params: {
      ...params
    }
  })
}
