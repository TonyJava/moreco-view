import axios from '@/libs/api.request'

export const page = (parentId) => {
  return axios.request({
    url: 'rbac/role/page/' + parentId,
    method: 'GET'
  })
}

export const detail = (id) => {
  return axios.request({
    url: 'rbac/role/detail/' + id,
    method: 'GET'
  })
}

export const save = (menuObj) => {
  return axios.request({
    url: 'rbac/role/save',
    method: 'POST',
    data: menuObj
  })
}

export const del = (id) => {
  return axios.request({
    url: 'rbac/role/delete/' + id,
    method: 'DELETE'
  })
}
