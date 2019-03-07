import request from '@/utils/request'

export function fetchArticleList(params) {
  return request({
    url: '/article',
    method: 'get',
    params
  })
}

export function updateArticle(id, data) {
  return request({
    url: `/article/${id}`,
    method: 'put',
    data
  })
}

export function createArticle(data) {
  return request({
    url: '/article',
    method: 'post',
    data
  })
}

export function deleteArticle(id) {
  return request({
    url: `/article/${id}`,
    method: 'delete'
  })
}
