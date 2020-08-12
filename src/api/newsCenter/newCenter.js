import { get } from '@/router/axios'
/**
 * 新闻列表查询接口
 */
export const getNewsCenterList = (params) => get('/news/v1/news/center', params)
