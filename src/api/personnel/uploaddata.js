import request from '@/router/axios'

/**
 * 材料附件分类查询接口,不需要传参
 * @param {Object} params - 参数
 * */
export const getUploadData = (params) => {
  return request({
    url: '/api/user/v1/user/attachment/category',
    method: 'get',
    params
  })
}

/**
 * 材料附件修改接口
 * @param {Object} params - 参数
 * @param {String} params.id - 材料附件ID(必填)
 * @param {String} params.categoryId - 附件分类ID
 * @param {String} params.name - 附件源文件名称，不能超过32字
 * */
export const reviseUploadData = (params) => {
  return request({
    url: '/api/user/v1/user/attachment/info',
    method: 'put',
    params
  })
}
/**
 * 材料附件上传接口
 * @param {Object} params - 参数
 * @param {String} params.userId - 用户ID(必填)
 * @param {String} params.categoryId - 附件分类ID(必填)
 * @param {String} params.attachments[{name:xxx,url:xxxx}] -	附件源文件名称，不能超过32个字 附件URL地址，即七牛云的文件地址
 * */
export const sendUploadData = (params) => {
  return request({
    url: '/api/user/v1/user/attachment/info',
    method: 'post',
    params
  })
}
/**
 * 材料附件查询接口
 * @param {Object} params - 参数
 * @param {String} params.pageNo - 请求页码
 * @param {String} params.pageSize - 每页条数
 * @param {String} params.categoryId -	附件分类ID
 * @param {String} params.userId -	用户ID
 * @param {String} params.name -	文件名，支持模糊搜索
 * */
export const queryUploadData = (params) => {
  return request({
    url: '/api/user/v1/user/attachment/info',
    method: 'get',
    params
  })
}
/**
 * 材料附件删除接口
 * @param {Object} params - 参数
 * @param {String} params.id - 材料附件ID
 * */
export const deleteUploadData = (params) => {
  return request({
    url: '/api/user/v1/user/attachment/info',
    method: 'delete',
    params
  })
}
/**
 * 七牛云上传凭证获取接口
 * @param {Object} params - 不需要参数
 * */
export const getQiniuToken = (params) => {
  return request({
    url: '/api/common/v1/upload/token',
    method: 'get',
    params
  })
}
