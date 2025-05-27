import axios from 'axios'

// 使用与member.js相同的axios实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * 获取活动列表
 * @param {Object} params - 查询参数
 * @param {number} params.page - 页码
 * @param {number} params.pageSize - 每页数量
 * @param {string} params.type - 活动类型，可选值：recent, past
 * @returns {Promise}
 */
export function getActivityList(params) {
  return api.get('/activities', { params })
}

/**
 * 获取活动详情
 * @param {string} id - 活动ID
 * @returns {Promise}
 */
export function getActivityDetail(id) {
  return api.get(`/activities/${id}`)
}

/**
 * 获取首页推荐活动
 * @param {number} limit - 获取数量
 * @returns {Promise}
 */
export function getFeaturedActivities(limit = 3) {
  return api.get('/activities/featured', { params: { limit } })
}

/**
 * 报名参加活动
 * @param {string} activityId - 活动ID
 * @param {Object} data - 报名信息
 * @returns {Promise}
 */
export function joinActivity(activityId, data) {
  return api.post(`/activities/${activityId}/join`, data)
}

export default {
  getActivityList,
  getActivityDetail,
  getFeaturedActivities,
  joinActivity
} 