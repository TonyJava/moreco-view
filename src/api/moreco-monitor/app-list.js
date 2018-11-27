import axios from '@/libs/api.request'

export const apiPage = (parentId, index) => {
  return axios.request({
    url: 'monitor/dept/page/' + parentId + '/' + index,
    method: 'GET'
  })
}

export const apiTree = () => {
  return axios.request({
    url: 'monitor/dept/tree',
    method: 'GET'
  })
}

export const apiDetail = (id) => {
  return axios.request({
    url: 'monitor/dept/detail/' + id,
    method: 'GET'
  })
}

export const apiSave = (deptObj) => {
  return axios.request({
    url: 'monitor/dept/save',
    method: 'POST',
    data: deptObj
  })
}

export const apiDelete = (id) => {
  return axios.request({
    url: 'monitor/dept/delete/' + id,
    method: 'DELETE'
  })
}
