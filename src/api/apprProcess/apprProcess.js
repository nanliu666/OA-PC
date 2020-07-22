import { get } from '@/router/axios'
/**
 *
 * @param {*} params
 */
export const getProcessList = (params) => get('/appr/v2/appr/process/list', params)
