import request from '@/utils/request'

export function fetchList(query) {
  return request({
    baseURL: process.env.VUE_APP_BASE_URL,
    url: '/file/list/',
    method: 'get',
    params: query,
  })
}
export function fetchHeader(query) {
  return request({
    baseURL: process.env.VUE_APP_BASE_URL,
    url: '/file/headerlist/',
    method: 'get',
    params: query,
  })
}

export function updateFile(data) {
  return request({
    baseURL: process.env.VUE_APP_BASE_URL,
    url: '/file/fileinfo/',
    method: 'post',
    data,
  })
}

export function deleteFile(data) {
  return request({
    baseURL: process.env.VUE_APP_BASE_URL,
    url: '/file/deletefile/',
    method: 'post',
    data,
  })
}

export function downloadFile(query) {
  return request({
    baseURL: process.env.VUE_APP_BASE_URL,
    url: '/file/downloadfile/',
    method: 'get',
    responseType: 'blob',
    params: query,
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv },
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data,
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data,
  })
}
