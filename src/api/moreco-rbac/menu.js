import axios from '@/libs/api.request'

export const page = (parentId, index) => {
  return axios.request({
    url: 'rbac/menu/page/' + parentId + '/' + index,
    method: 'get'
  })
}

export const toList = () => {
  return axios.request({
    url: 'rbac/menu/toList/',
    method: 'get'
  })
}
