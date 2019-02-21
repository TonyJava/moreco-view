import axios from '@/libs/api.request'

export const apiPage = (params) => {
  return axios.request({
    url: 'moreco/component/rbac/dept/page',
    method: 'GET',
    params: params
  })
}

export const apiTree = () => {
  return axios.request({
    url: 'moreco/component/rbac/dept/tree',
    method: 'GET'
  })
}

export const apiDetail = (id) => {
  return axios.request({
    url: 'moreco/component/rbac/dept/detail/' + id,
    method: 'GET'
  })
}

export const apiSave = (temp) => {
  return axios.request({
    url: 'moreco/component/rbac/dept/save',
    method: 'POST',
    data: temp
  })
}

export const apiDelete = (id) => {
  return axios.request({
    url: 'moreco/component/rbac/dept/delete/' + id,
    method: 'DELETE'
  })
}
