import axios from '@/libs/api.request'

export const apiPage = (params) => {
  return axios.request({
    url: 'rbac/user/page/',
    method: 'GET',
    params: params
  })
}

export const apiDetail = (id) => {
  return axios.request({
    url: 'rbac/user/detail/' + id,
    method: 'GET'
  })
}

export const apiSave = (temp) => {
  return axios.request({
    url: 'rbac/user/save',
    method: 'POST',
    data: temp
  })
}

export const apiDelete = (id) => {
  return axios.request({
    url: 'rbac/user/delete/' + id,
    method: 'DELETE'
  })
}
