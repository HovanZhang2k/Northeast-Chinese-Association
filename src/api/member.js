import axios from 'axios'

// 创建axios实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * 提交入会申请
 * @param {Object} data - 入会申请数据
 * @returns {Promise}
 */
export function submitJoinApplication(data) {
  return api.post('/members/join', data)
}

/**
 * 获取会员信息
 * @param {string} id - 会员ID
 * @returns {Promise}
 */
export function getMemberInfo(id) {
  return api.get(`/members/${id}`)
}

/**
 * 更新会员信息
 * @param {string} id - 会员ID
 * @param {Object} data - 会员信息
 * @returns {Promise}
 */
export function updateMemberInfo(id, data) {
  return api.put(`/members/${id}`, data)
}

/**
 * 获取理事会成员列表
 * @returns {Promise}
 */
export function getBoardMembers() {
  return api.get('/members/board')
}

export default {
  submitJoinApplication,
  getMemberInfo,
  updateMemberInfo,
  getBoardMembers
} 