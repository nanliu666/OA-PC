import { get, del, post, put } from '@/router/axios'
/**
 * 公告列表查询接口
 */
export const getNoticeCenterList = (params) => get('/notice/v1/notice/center', params)
/**
 * 公告中心详情查询接口，阅读数会加1
 */
export const getCenterNoticeDeatil = (params) => get('/notice/v1/notice/center/detail', params)
/**
 * 公告列表详情查询接口，单纯查询
 */
export const getNoticeDeatil = (params) => get('/notice/v1/notice/detail', params)

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
export const publishNotice = (params) => post('/notice/v1/notice/publish', params)
/**
 * 公告创建接口
 */
export const creatNotice = (params) => post('/notice/v1/notice', params)
/**
 * 公告修改接口
 */
export const fixNotice = (params) => put('/notice/v1/notice', params)
