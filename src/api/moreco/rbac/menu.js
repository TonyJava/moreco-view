import axios from '@/libs/api.request'

export const apiPage = (params) => {
  return axios.request({
    url: 'rbac/menu/page/',
    method: 'GET',
    params: params
  })
}

export const apiToPage = () => {
  return axios.request({
    url: 'rbac/menu/toPage',
    method: 'GET'
  })
}

export const apiDetail = (id) => {
  return axios.request({
    url: 'rbac/menu/detail/' + id,
    method: 'GET'
  })
}

export const apiSave = (temp) => {
  return axios.request({
    url: 'rbac/menu/save',
    method: 'POST',
    data: temp
  })
}

export const apiDelete = (id) => {
  return axios.request({
    url: 'rbac/menu/delete/' + id,
    method: 'DELETE'
  })
}

export const apiTree = () => {
  return axios.request({
    url: 'rbac/menu/tree',
    method: 'GET'
  })
}
