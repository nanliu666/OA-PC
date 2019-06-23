import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-system/menu/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
export const remove = (ids) => {
  return request({
    url: '/api/blade-system/menu/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-system/menu/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-system/menu/submit',
    method: 'post',
    data: row
  })
}

export const getMenu = (id) => {
  return request({
    url: '/api/blade-system/menu/detail',
    method: 'get',
    params: {
      id,
    }
  })
}

export const getListScope = (current, size, params) => {
  return request({
    url: '/api/blade-system/data-scope/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const removeScope = (ids) => {
  return request({
    url: '/api/blade-system/data-scope/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const addScope = (row) => {
  return request({
    url: '/api/blade-system/data-scope/submit',
    method: 'post',
    data: row
  })
}

export const updateScope = (row) => {
  return request({
    url: '/api/blade-system/data-scope/submit',
    method: 'post',
    data: row
  })
}

export const getMenuScope = (id) => {
  return request({
    url: '/api/blade-system/data-scope/detail',
    method: 'get',
    params: {
      id,
    }
  })
}
