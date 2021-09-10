import request from '@/utils/request'

export function createModel(data) {
  return request({
    baseURL: process.env.VUE_APP_BASE_URL,
    url: '/model/model/',
    method: 'post',
    data,
  })
}

export function fetchList(query) {
  return request({
    baseURL: process.env.VUE_APP_BASE_URL,
    url: '/model/list/',
    method: 'get',
    params: query,
  })
}
export function deleteModel(data) {
  return request({
    baseURL: process.env.VUE_APP_BASE_URL,
    url: '/model/delete/',
    method: 'post',
    data,
  })
}

export function analysis(data) {
  return request({
    baseURL: process.env.VUE_APP_BASE_URL,
    url: '/model/analysis/',
    method: 'post',
    data,
  })
}
