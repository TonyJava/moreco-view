import axios from '@/libs/api.request'

export const apiPage = (index) => {
  return axios.request({
    url: 'monitor/project/page/' + index,
    method: 'GET'
  })
}

export const apiDetail = (id) => {
  return axios.request({
    url: 'monitor/project/detail/' + id,
    method: 'GET'
  })
}

export const apiSave = (deptObj) => {
  return axios.request({
    url: 'monitor/project/save',
    method: 'POST',
    data: deptObj
  })
}

export const apiDelete = (id) => {
  return axios.request({
    url: 'monitor/project/delete/' + id,
    method: 'DELETE'
  })
}
