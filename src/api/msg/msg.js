import { get, post } from '@/router/axios'
// 消息列表查询
export const getMsgList = (params) => {
  return get('/msg/v1/msg/notify/list', params)
}

export const creatSignReadMsg = (params) => {
  return post('/msg/v1/msg/notify/read', params)
}

export const creatDelReadMsg = (params) => {
  return post('/msg/v1/msg/notify/read/del', params)
}
// 审批统计查询接口【GET /appr/v1/appr/approve/stat】
export const fetchApproveStat = (params) => {
  return get('/appr/v1/appr/approve/stat', params)
}
