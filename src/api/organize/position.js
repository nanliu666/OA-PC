import request from '@/router/axios'
export const getCategoryList = (current, size, params) => {
  //职位类别查询接口
  return request({
    url: '/api/org/v1/job/category/list',
    method: 'get',
    params: {
      ...params,
      current,
      size
    }
  })
}
// /api/org/v1/job
export const gotV1Job = (current, size, params) => {
  //职位分页查询接口
  return request({
    url: '/api/org/v1/job',
    method: 'get',
    params: {
      ...params,
      current,
      size
    }
  })
}
export const postV1Job = (current, size, params) => {
  //职位新增接口
  return request({
    url: '/api/org/v1/job',
    method: 'post',
    params: {
      ...params,
      current,
      size
    }
  })
}
export const putV1Job = (current, size, params) => {
  //职位修改接口
  return request({
    url: '/api/org/v1/job',
    method: 'put',
    params: {
      ...params,
      current,
      size
    }
  })
}
export const deleteV1Job = (current, size, params) => {
  //职位删除接口
  return request({
    url: '/api/org/v1/job',
    method: 'delete',
    params: {
      ...params,
      current,
      size
    }
  })
}
// /org/v1/job/category/define
export const getCategoryDefine = (current, size, params) => {
  //职位类别查询接口
  return request({
    url: '/api/org/v1/job/category/define',
    method: 'get',
    params: {
      ...params,
      current,
      size
    }
  })
}
export const deleteCategoryDefine = (current, size, params) => {
  //职位类别删除接口
  return request({
    url: '/api/org/v1/job/category/define',
    method: 'delete',
    params: {
      ...params,
      current,
      size
    }
  })
}
export const postCategoryDefine = (current, size, params) => {
  //职位类别添加接口
  return request({
    url: '/api/org/v1/job/category/define',
    method: 'post',
    params: {
      ...params,
      current,
      size
    }
  })
}
export const putCategoryDefine = (current, size, params) => {
  //职位类别添加接口
  return request({
    url: '/api/org/v1/job/category/define',
    method: 'put',
    params: {
      ...params,
      current,
      size
    }
  })
}

export const getV1Position = (current, size, params) => {
  //岗位添加接口
  return request({
    url: '/api/org/v1/position',
    method: 'get',
    params: {
      ...params,
      current,
      size
    }
  })
}
export const deleteV1Position = (current, size, params) => {
  //岗位删除接口
  return request({
    url: '/api/org/v1/position',
    method: 'delete',
    params: {
      ...params,
      current,
      size
    }
  })
}
export const postV1Position = (current, size, params) => {
  //岗位添加接口
  return request({
    url: '/api/org/v1/position',
    method: 'post',
    params: {
      ...params,
      current,
      size
    }
  })
}
export const putV1Position = (current, size, params) => {
  //岗位修改接口
  return request({
    url: '/api/org/v1/position',
    method: 'put',
    params: {
      ...params,
      current,
      size
    }
  })
}
