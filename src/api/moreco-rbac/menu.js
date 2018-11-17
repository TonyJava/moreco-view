import axios from '@/libs/api.request'

export const page = (index) => {
  return axios.request({
    url: 'rbac/menu/page/' + index,
    method: 'get'
  })
}
