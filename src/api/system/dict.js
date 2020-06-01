import request from '@/router/axios'

export const getList = (pageNo, pageSize, params) => {
  return request({
    url: '/api/sys/v1/dict/list',
    method: 'get',
    params: {
      ...params,
      pageNo,
      pageSize
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/sys/v1/dict',
    method: 'delete',
    params: {
      ids
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/sys/v1/dict',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/sys/v1/dict',
    method: 'put',
    data: row
  })
}

export const getDictionary = (params) => {
  return request({
    url: '/api/blade-system/v1/dict/code',
    method: 'get',
    params
  })
}
