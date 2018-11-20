import axios from '@/libs/api.request'

export const page = (parentId, index) => {
  return axios.request({
    url: 'rbac/user/page/' + parentId + '/' + index,
    method: 'GET'
  })
}

export const detail = (id) => {
  return axios.request({
    url: 'rbac/user/detail/' + id,
    method: 'GET'
  })
}

export const save = (menuObj) => {
  return axios.request({
    url: 'rbac/user/save',
    method: 'POST',
    params: menuObj
  })
}

export const del = (id) => {
  return axios.request({
    url: 'rbac/user/delete/' + id,
    method: 'DELETE'
  })
}
