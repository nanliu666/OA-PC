import { get } from '@/router/axios'
// 消息列表查询
export const getMsgList = (params) => {
  return get('/msg/v1/msg/notify/list', params)
}
