import request from '@/router/axios'

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

export const getMenuTree = (parentId = '0') => {
  return request({
    url: '/api/sys/v1/menu/tree',
    method: 'get',
    params: {
      parentId
    }
  })
}

export const getMenuInfo = (parentId, query = {}) =>
  request({
    url: '/api/sys/v1/menu/info',
    method: 'get',
    params: {
      parentId,
      ...query
    }
  })
export const postMenuInfo = (data) =>
  request({
    url: '/api/sys/v1/menu/info',
    method: 'post',
    data
  })
export const putMenuInfo = (params) =>
  request({
    url: '/api/sys/v1/menu/info',
    method: 'put',
    data: {
      ...params
    }
  })
export const deleteMenuInfo = (menuId) =>
  request({
    url: '/api/sys/v1/menu/info',
    method: 'delete',
    params: {
      menuId
    }
  })
