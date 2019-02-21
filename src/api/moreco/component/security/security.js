import { apiPermissionMenuTree, apiPermissionComponent } from '@/api/moreco/component/rbac/menu'

export const getPermissionMenuTree = () => {
  apiPermissionMenuTree().then((res) => {
    console.log(res)
  })
}

export const getPermissionComponent = (menuPath) => {
  apiPermissionComponent(menuPath).then((res) => {
    console.log(res)
  })
}
