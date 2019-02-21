import axios from '@/libs/api.request'

export const apiPage = (params) => {
  return axios.request({
    url: 'moreco/component/rbac/resource/page',
    method: 'GET',
    params: params
  })
}

export const apiDetail = (id) => {
  return axios.request({
    url: 'moreco/component/rbac/resource/detail/' + id,
    method: 'GET'
  })
}

export const apiTagTree = (params) => {
  return axios.request({
    url: 'moreco/component/rbac/resource/tagTree',
    method: 'GET',
    params: params
  })
}

export const apiSave = (temp) => {
  return axios.request({
    url: 'moreco/component/rbac/resource/save',
    method: 'POST',
    data: temp
  })
}

export const apiDelete = (id) => {
  return axios.request({
    url: 'moreco/component/rbac/resource/delete/' + id,
    method: 'DELETE'
  })
}
