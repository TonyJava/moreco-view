import axios from '@/libs/api.request'

export const apiPage = (index, params) => {
  return axios.request({
    url: 'rbac/dept/page/' + index,
    method: 'GET',
    params: params
  })
}

export const apiTree = () => {
  return axios.request({
    url: 'rbac/dept/tree',
    method: 'GET'
  })
}

export const apiDetail = (id) => {
  return axios.request({
    url: 'rbac/dept/detail/' + id,
    method: 'GET'
  })
}

export const apiSave = (deptObj) => {
  return axios.request({
    url: 'rbac/dept/save',
    method: 'POST',
    data: deptObj
  })
}

export const apiDelete = (id) => {
  return axios.request({
    url: 'rbac/dept/delete/' + id,
    method: 'DELETE'
  })
}
