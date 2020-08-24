/**
 * @file 新闻管理 api 接口
 */
import { del, get, post, put } from '@/router/axios'

/**
 * 新闻置顶接口	POST
 * @param {object} params 参数
 * @param {string} params.id 新闻id
 * @param {number} params.isTop 是否置顶，0-否，1-是
 * @return {Promise<any>} 返回
 */
export const postNewsTop = (params) => post('/news/v1/news/top', params)

/**
 * 新闻发布接口	POST
 * @param {object} params 参数
 * @param {string} params.id 新闻id
 * @param {number} params.userId 发布用户ID
 * @return {Promise<any>} 返回
 */
export const postNewsPublish = (params) => post('/news/v1/news/publish', params)

/**
 * 新闻详情查询接口	GET (不会修改news表的read_num字段)
 * @param {object} params 参数
 * @param {string} params.id 新闻id
 * @return {Promise<{
 *                         id: string,
 *                         title: string,
 *                         categoryId: string,
 *                         categoryName: string,
 *                         isTop: number,
 *                         readNum: number,
 *                         publishUserName: string,
 *                         publishTime: Date,
 *                         publishUserId: string,
 *                         status: string,
 *                         createTime: Date,
 *                         picUrl: string,
 *                         content: string
 *       }>>} 返回
 */
export const getNewsDetail = (params) => get('/news/v1/news/detail', params)

/**
 * 新闻分类排序接口	POST
 * @return {Promise<any>} 返回
 */
export const postCategorySort = (params) => post('/news/v1/news/category/sort', params)

/**
 * 新闻分类新增接口	POST
 * @param {object} params 参数
 * @return {Promise<any>} 返回
 */
export const postNewsCategory = (params) => post('/news/v1/news/category', params)

/**
 * 新闻分类修改接口	PUT
 * @param {object} params 参数
 * @return {Promise<any>} 返回
 */
export const putNewsCategory = (params) => put('/news/v1/news/category', params)

/**
 * 新闻分类查询接口	GET
 * @param {object} params 参数
 * @param {string} [params.name] 分类名称，支持模糊查询
 * @return {Promise<{id:string; name:string; sort: number}[]>} 返回
 */
export const getNewsCategory = (params) => get('/news/v1/news/category', params)

/**
 * 新闻分类删除接口	DEL
 * @param {object} params 参数
 * @return {Promise<any>} 返回
 */
export const delNewsCategory = (params) => del('/news/v1/news/category', params)

/**
 * 新闻创建接口	POST
 * @param {object} params 参数
 * @param {string} params.title 标题
 * @param {string} params.categoryId 分类ID
 * @param {string} params.picUrl 封面图片URL
 * @param {string} params.content 新闻详情
 * @param {string} params.brief 摘要，由前端根据content自动生成，内容不超过200字
 * @param {string} params.userId 创建用户ID
 * @return {Promise<{id: string}>} 返回 { id: 新闻id}
 */
export const postV1News = (params) => post('/news/v1/news', params)

/**
 * 新闻查询接口	GET
 * @param {object} params 参数
 * @return {Promise<any>} 返回
 */
export const getV1News = (params) => get('/news/v1/news', params)

/**
 * 新闻修改接口	PUT
 * @param {object} params 参数
 * @param {string} params.id 新闻id
 * @param {string} params.title 标题
 * @param {string} params.categoryId 分类ID
 * @param {string} params.picUrl 封面图片URL
 * @param {string} params.content 新闻详情
 * @param {string} params.brief 摘要，由前端根据content自动生成，内容不超过200字
 * @param {string} params.userId 创建用户ID
 * @return {Promise<any>} 返回
 */
export const putV1News = (params) => put('/news/v1/news', params)

/**
 * 新闻删除接口	DEL
 * @param {object} params 参数
 * @param {string} params.id 新闻id
 * @return {Promise<any>} 返回
 */
export const delV1News = (params) => del('/news/v1/news', params)

/**
 * 新闻列表查询接口
 * @param {object} params 参数
 * @param {string} [params.categoryId] 分类ID
 * @param {string} [params.isTop] 是否置顶，0-否，1-是
 * @param {string} params.pageNo 每页条数
 * @param {string} params.pageSize 每页条数
 * @return {Promise<Array<{
 *                         id: string,
 *                         title: string,
 *                         categoryId: string,
 *                         categoryName: string,
 *                         readNum: number,
 *                         isTop: number,
 *                         publishUserName: string,
 *                         publishTime: Date,
 *                         publishUserId: string,
 *                         picUrl: string,
 *                         brief: string
 *       }>>} 返回
 */
export const getNewsCenter = (params) => get('/news/v1/news/center', params)

/**
 * 新闻详情查询接口 (修改news表的read_num字段)
 * @param {object} params 参数
 * @param {string} params.id 新闻id
 * @return {Promise<Array<{
 *                         id: string,
 *                         title: string,
 *                         categoryId: string,
 *                         categoryName: string,
 *                         isTop: number,
 *                         readNum: number,
 *                         publishUserName: string,
 *                         publishTime: Date,
 *                         publishUserId: string,
 *                         picUrl: string,
 *                         content: string
 *       }>>} 返回
 */
export const getCenterDetail = (params) => get('/news/v1/news/center/detail', params)
