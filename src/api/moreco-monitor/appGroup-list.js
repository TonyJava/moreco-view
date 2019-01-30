import axios from '@/libs/api.request'

export const apiPage = (index) => {
  return axios.request({
    url: 'appGroup/page/' + index,
    method: 'GET'
  })
}

export const apiDetail = (id) => {
  return axios.request({
    url: 'appGroup/' + id,
    method: 'GET'
  })
}

export const apiSave = (appGroupObj) => {
  return axios.request({
    url: 'appGroup/',
    method: 'POST',
    data: appGroupObj
  })
}

export const apiDelete = (id) => {
  return axios.request({
    url: 'appGroup/' + id,
    method: 'DELETE'
  })
}
