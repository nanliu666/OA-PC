import { get } from '@/router/axios'
// 任务中心查询接口
export const fetchTaskList = (params) => {
  return get('/task/v1/task/center/list', params)
}
