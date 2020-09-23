import { get, post, put } from '@/router/axios'
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
  return get('/appr/v2/appr/approve/stat', params)
}
// 用户快捷入口查询接口
export const getShortcutInfo = (params) => {
  return get('/shortcut/v1/shortcut/user', params)
}
// 获取全量快捷入口查询
export const getAllShortcutInfo = (params) => {
  return get('/shortcut/v1/shortcut/visible', params)
}
// 用户快捷入口修改接口
export const putShortcutInfo = (params) => {
  return put('/shortcut/v1/shortcut/user', params)
}
