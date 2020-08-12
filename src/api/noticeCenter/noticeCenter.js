import { get } from '@/router/axios'
/**
 * 公告列表查询接口
 */
export const getNoticeCenterList = (params) => get('/notice/v1/notice/center', params)
/**
 * 公告详情查询接口
 */
export const getNoticeDeatil = (params) => get('/notice/v1/notice/center/detail', params)
