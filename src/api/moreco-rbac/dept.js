import axios from '@/libs/api.request'

export const page = (parentId, index) => {
  return axios.request({
    url: 'rbac/dept/page/' + parentId + '/' + index,
    method: 'GET'
  })
}

export const detail = (id) => {
  return axios.request({
    url: 'rbac/dept/detail/' + id,
    method: 'GET'
  })
}

export const save = (menuObj) => {
  return axios.request({
    url: 'rbac/dept/save',
    method: 'POST',
    data: menuObj
  })
}

export const del = (id) => {
  return axios.request({
    url: 'rbac/dept/delete/' + id,
    method: 'DELETE'
  })
}

export const deptTree = () => {
  return axios.request({
    url: 'rbac/dept/tree',
    method: 'GET'
  })
}
