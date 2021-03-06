import axios from '@/libs/api.request'

export const apiPage = (params) => {
  return axios.request({
    url: 'moreco/component/rbac/role/page',
    method: 'GET',
    params: params
  })
}

export const apiList = () => {
  return axios.request({
    url: 'moreco/component/rbac/role/list',
    method: 'GET'
  })
}

export const apiDetail = (id) => {
  return axios.request({
    url: 'moreco/component/rbac/role/detail/' + id,
    method: 'GET'
  })
}

export const apiSave = (temp) => {
  return axios.request({
    url: 'moreco/component/rbac/role/save',
    method: 'POST',
    data: temp
  })
}

export const apiDelete = (id) => {
  return axios.request({
    url: 'moreco/component/rbac/role/delete/' + id,
    method: 'DELETE'
  })
}
