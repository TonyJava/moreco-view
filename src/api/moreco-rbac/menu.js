import axios from '@/libs/api.request'

export const page = (parentId, index) => {
  return axios.request({
    url: 'rbac/menu/page/' + parentId + '/' + index,
    method: 'GET'
  })
}

export const toPage = () => {
  return axios.request({
    url: 'rbac/menu/toPage',
    method: 'GET'
  })
}

export const detail = (id) => {
  return axios.request({
    url: 'rbac/menu/detail/' + id,
    method: 'GET'
  })
}

export const save = (menuObj) => {
  return axios.request({
    url: 'rbac/menu/save',
    method: 'POST',
    data: menuObj
  })
}

export const del = (id) => {
  return axios.request({
    url: 'rbac/menu/delete/' + id,
    method: 'DELETE'
  })
}

export const menuTree = () => {
  return axios.request({
    url: 'rbac/menu/tree',
    method: 'GET'
  })
}
