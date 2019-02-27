import axios from '@/libs/api.request'

export const apiPage = (params) => {
  return axios.request({
    url: 'moreco/component/rbac/user/page',
    method: 'GET',
    params: params
  })
}

export const apiDetail = (id) => {
  return axios.request({
    url: 'moreco/component/rbac/user/detail/' + id,
    method: 'GET'
  })
}

export const apiSave = (temp) => {
  return axios.request({
    url: 'moreco/component/rbac/user/save',
    method: 'POST',
    data: temp
  })
}

export const apiDelete = (id) => {
  return axios.request({
    url: 'moreco/component/rbac/user/delete/' + id,
    method: 'DELETE'
  })
}

export const apiUpdatePassword = (newPassword) => {
  return axios.request({
    url: 'moreco/component/rbac/user/updatePassword?newPassword=' + newPassword,
    method: 'POST'
  })
}

export const apiChangeStatus = (userId, targetStatus) => {
  return axios.request({
    url: 'moreco/component/rbac/user/changeStatus',
    method: 'POST',
    data: {
      userId: userId,
      targetStatus: targetStatus
    }
  })
}

export const apiResetPassword = (id) => {
  return axios.request({
    url: 'moreco/component/rbac/user/restPassword/' + id,
    method: 'POST'
  })
}
