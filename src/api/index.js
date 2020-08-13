import { get, post } from '@/router/axios'
const BASE_URL = process.env.BASE_URL
// 获取组织机构根节点
export const GET_DEPT_ROOT = () => get(BASE_URL + 'depRoot.json')
export const GET_PAGE_EMPLOYEE = (data) => get(BASE_URL + 'userData.json', data)

// 获取组织机构子节点
export const GET_DEPT_TREE = (data) => get(BASE_URL + 'depChild.json', data)
export const GET_USER_BY_DEPT = (data) => get(BASE_URL + 'userData.json', data)
export const postDeploy = (data) => post('/api/blade-flow/work/deploy', data)
export const getOrgUserTree = (params) => get('/api/org/v1/org/user/tree', params)
