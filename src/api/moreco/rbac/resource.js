import axios from '@/libs/api.request'

export const apiPage = (params) => {
  return axios.request({
    url: 'rbac/resource/page/',
    method: 'GET',
    params: params
  })
}

export const apiList = () => {
  return axios.request({
    url: 'rbac/resource/list',
    method: 'GET'
  })
}

export const apiDetail = (id) => {
  return axios.request({
    url: 'rbac/resource/detail/' + id,
    method: 'GET'
  })
}

export const apiSave = (temp) => {
  return axios.request({
    url: 'rbac/resource/save',
    method: 'POST',
    data: temp
  })
}

export const apiDelete = (id) => {
  return axios.request({
    url: 'rbac/resource/delete/' + id,
    method: 'DELETE'
  })
}
