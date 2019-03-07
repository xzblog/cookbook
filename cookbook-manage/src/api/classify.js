import request from '@/utils/request'

export function fetchClassify(params) {
  return request({
    url: '/classify',
    method: 'get',
    params
  })
}

export function createClassify(data) {
  return request({
    url: '/classify',
    method: 'post',
    data
  })
}

export function updateClassify(id, data) {
  return request({
    url: `/classify/${id}`,
    method: 'put',
    data
  })
}

export function deleteClassify(id) {
  return request({
    url: `/classify/${id}`,
    method: 'delete'
  })
}
