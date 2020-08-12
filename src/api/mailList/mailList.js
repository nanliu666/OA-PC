import { get } from '@/router/axios'
// 通讯录员工查询接口
export const getBookUser = (params) => {
  return get('/user/v1/user/address/book/user', params)
}

//   通讯录部门查询接口
export const getBookOrg = (params) => {
  return get('/user/v1/user/address/book/org', params)
}
