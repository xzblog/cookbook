import request from '@/utils/request'

// 获取七牛Token
export function fetchQiNiuToken() {
  return request({
    url: '/common/getToken',
    method: 'get'
  })
}
