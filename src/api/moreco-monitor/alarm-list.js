import axios from '@/libs/api.request'

export const apiPage = (index) => {
  return axios.request({
    url: 'monitor/alarm/page/' + index,
    method: 'GET'
  })
}
