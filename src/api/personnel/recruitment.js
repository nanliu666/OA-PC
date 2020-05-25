import { get } from '@/router/axios'

/**
 * 关联招聘需求查询接口
 * */
export const getRecruitmentDetail = (recruitmentId) => {
  return get('/user/v1/recruitment/detail', { recruitmentId })
}
