import axios from '@/libs/api.request'

export const apiPage = (params) => {
  return axios.request({
    url: 'rbac/role/page/',
    method: 'GET',
    params: params
  })
}

export const apiList = () => {
  return axios.request({
    url: 'rbac/role/list',
    method: 'GET'
  })
}

export const apiDetail = (id) => {
  return axios.request({
    url: 'rbac/role/detail/' + id,
    method: 'GET'
  })
}

export const apiSave = (temp) => {
  return axios.request({
    url: 'rbac/role/save',
    method: 'POST',
    data: temp
  })
}

export const apiDelete = (id) => {
  return axios.request({
    url: 'rbac/role/delete/' + id,
    method: 'DELETE'
  })
}
