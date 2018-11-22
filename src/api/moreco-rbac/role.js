import axios from '@/libs/api.request'

export const apiPage = (parentId) => {
  return axios.request({
    url: 'rbac/role/page/' + parentId,
    method: 'GET'
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

export const apiSave = (menuObj) => {
  return axios.request({
    url: 'rbac/role/save',
    method: 'POST',
    data: menuObj
  })
}

export const apiDelete = (id) => {
  return axios.request({
    url: 'rbac/role/delete/' + id,
    method: 'DELETE'
  })
}
