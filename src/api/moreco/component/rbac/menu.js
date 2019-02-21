import axios from '@/libs/api.request'

export const apiPage = (params) => {
  return axios.request({
    url: 'moreco/component/rbac/menu/page',
    method: 'GET',
    params: params
  })
}

export const apiToPage = () => {
  return axios.request({
    url: 'moreco/component/rbac/menu/toPage',
    method: 'GET'
  })
}

export const apiDetail = (id) => {
  return axios.request({
    url: 'moreco/component/rbac/menu/detail/' + id,
    method: 'GET'
  })
}

export const apiSave = (temp) => {
  return axios.request({
    url: 'moreco/component/rbac/menu/save',
    method: 'POST',
    data: temp
  })
}

export const apiDelete = (id) => {
  return axios.request({
    url: 'moreco/component/rbac/menu/delete/' + id,
    method: 'DELETE'
  })
}

export const apiTree = () => {
  return axios.request({
    url: 'moreco/component/rbac/menu/tree',
    method: 'GET'
  })
}

export const apiPermissionMenuTree = () => {
  return axios.request({
    url: 'moreco/component/rbac/menu/permissionMenuTree',
    method: 'GET'
  })
}

export const apiPermissionComponent = (menuPath) => {
  return axios.request({
    url: 'moreco/component/rbac/menu/permissionComponent',
    method: 'GET',
    params: {
      menuPath: menuPath
    }
  })
}
