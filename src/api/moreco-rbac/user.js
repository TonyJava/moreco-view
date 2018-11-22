import axios from '@/libs/api.request'

export const apiPage = (index) => {
  return axios.request({
    url: 'rbac/user/page/' + index,
    method: 'GET'
  })
}

export const apiDetail = (id) => {
  return axios.request({
    url: 'rbac/user/detail/' + id,
    method: 'GET'
  })
}

export const apiSave = (menuObj) => {
  return axios.request({
    url: 'rbac/user/save',
    method: 'POST',
    data: menuObj
  })
}

export const apiDelete = (id) => {
  return axios.request({
    url: 'rbac/user/delete/' + id,
    method: 'DELETE'
  })
}
