import request from '@/router/axios'

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-system/menu/list',
    method: 'get',
    params: {
      ...params,
      current,
      size
    }
  })
}

export const getLazyList = (parentId, params) => {
  return request({
    url: '/api/blade-system/menu/lazy-list',
    method: 'get',
    params: {
      ...params,
      parentId
    }
  })
}

export const getLazyMenuList = (parentId, params) => {
  return request({
    url: '/api/blade-system/menu/lazy-menu-list',
    method: 'get',
    params: {
      ...params,
      parentId
    }
  })
}

export const getMenuList = (current, size, params) => {
  return request({
    url: '/api/blade-system/menu/menu-list',
    method: 'get',
    params: {
      ...params,
      current,
      size
    }
  })
}

export const getMenuTree = (tenantId) => {
  return request({
    url: '/api/blade-system/menu/tree',
    method: 'get',
    params: {
      tenantId
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-system/menu/remove',
    method: 'post',
    params: {
      ids
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
      id
    }
  })
}

export const getMenuInfo = (topMenuId) =>
  request({
    url: '/api/sys/v1/menu/info',
    method: 'get',
    params: {
      topMenuId
    }
  })
export const postMenuInfo = (parentId, params) =>
  request({
    url: '/api/sys/v1/menu/info',
    method: 'post',
    params: {
      ...params,
      parentId
    }
  })
export const putMenuInfo = (params) =>
  request({
    url: '/api/sys/v1/menu/info',
    method: 'put',
    params: {
      ...params
    }
  })
export const deleteMenuInfo = (params) =>
  request({
    url: '/api/sys/v1/menu/info',
    method: 'delete',
    params: {
      ...params
    }
  })
