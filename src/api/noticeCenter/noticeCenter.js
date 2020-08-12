import { get, del, post } from '@/router/axios'
/**
 * 公告列表查询接口
 */
export const getNoticeCenterList = (params) => get('/notice/v1/notice/center', params)
/**
 * 公告详情查询接口
 */
export const getNoticeDeatil = (params) => get('/notice/v1/notice/center/detail', params)
/**
 * 公告管理查询接口
 */
export const getNoticeList = (params) => get('/notice/v1/notice', params)
/**
 * 公告管理查询接口
 */
export const delNoticeList = (params) => del('/notice/v1/notice', params)
/**
 * 公告发布接口
 */
export const publishNoticeList = (params) => post('/notice/v1/notice/publish', params)
