import request from '@/router/axios';

// =====================参数===========================

export const historyFlowList = (current, size, params) => {
  return request({
    url: '/api/blade-flow/process/history-flow-list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}


// =====================请假流程===========================

export const leaveProcess = (data) => {
  return request({
    url: '/api/blade-desk/process/leave/start-process',
    method: 'post',
    data
  })
}

export const leaveDetail = (params) => {
  return request({
    url: '/api/blade-desk/process/leave/detail',
    method: 'get',
    params
  })
}
