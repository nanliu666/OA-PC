import { get, post, del } from '@/router/axios'
// 任务中心查询接口
export const fetchTaskList = (params) => {
  return get('/task/v1/task/center/list', params)
}

// 日程中心提醒事项查询接口
export const fetchScheduleinfo = (params) => {
  return get('/schedule/v1/schedule/info', params)
}
// 日程中心提醒提醒事项添加接口
export const addScheduleinfo = (params) => {
  return post('/schedule/v1/schedule/info', params)
}
// 日程中心删除提醒事项删除接口
export const delScheduleinfo = (params) => {
  return del('/schedule/v1/schedule/info', params)
}
