import Mock from 'mockjs'
import {login, logout, getUserInfo} from './login'
import {getTableData, getDragList, uploadImage} from './data'
import {getMessageInit, getContentByMsgId, hasRead, removeReaded, restoreTrash} from './user'

// rbac
import {save as rbacSave, del as rbacDelete, pageNull as rbacPageNull} from './rbac/common'
import {page as menuPage, toPage as menuToPage, detail as menuDetail, tree as menuTree} from './rbac/menu'
import {page as deptPage, detail as deptDetail, tree as deptTree} from './rbac/dept'
import {page as rolePage, detail as roleDetail, list as roleList} from './rbac/role'
import {page as userPage, detail as userDetail} from './rbac/user'

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 1000
})

// 登录相关和获取用户信息
Mock.mock(/\/login/, login)
Mock.mock(/\/get_info/, getUserInfo)
Mock.mock(/\/logout/, logout)
Mock.mock(/\/get_table_data/, getTableData)
Mock.mock(/\/get_drag_list/, getDragList)
Mock.mock(/\/save_error_logger/, 'success')
Mock.mock(/\/image\/upload/, uploadImage)
Mock.mock(/\/message\/init/, getMessageInit)
Mock.mock(/\/message\/content/, getContentByMsgId)
Mock.mock(/\/message\/has_read/, hasRead)
Mock.mock(/\/message\/remove_readed/, removeReaded)
Mock.mock(/\/message\/restore/, restoreTrash)

// rbac
// rbac--menu
Mock.mock(/\/rbac\/menu\/page\/0\/1/, menuPage)
Mock.mock(/\/rbac\/menu\/page\/[1-9]\/1/, rbacPageNull)
Mock.mock(/\/rbac\/menu\/toPage/, menuToPage)
Mock.mock(/\/rbac\/menu\/detail\/1/, menuDetail)
Mock.mock(/\/rbac\/menu\/tree/, menuTree)
Mock.mock(/\/rbac\/menu\/save/, rbacSave)
Mock.mock(/\/rbac\/menu\/delete/, rbacDelete)
// rbac--dept
Mock.mock(/\/rbac\/dept\/page\/0\/1/, deptPage)
Mock.mock(/\/rbac\/dept\/page\/[1-9]\/1/, rbacPageNull)
Mock.mock(/\/rbac\/dept\/detail\/1/, deptDetail)
Mock.mock(/\/rbac\/dept\/tree/, deptTree)
Mock.mock(/\/rbac\/dept\/save/, rbacSave)
Mock.mock(/\/rbac\/dept\/delete/, rbacDelete)
// rbac--role
Mock.mock(/\/rbac\/role\/page\/1/, rolePage)
Mock.mock(/\/rbac\/role\/detail\/1/, roleDetail)
Mock.mock(/\/rbac\/role\/list/, roleList)
Mock.mock(/\/rbac\/role\/save/, rbacSave)
Mock.mock(/\/rbac\/role\/delete/, rbacDelete)
// rbac--user
Mock.mock(/\/rbac\/user\/page\/1/, userPage)
Mock.mock(/\/rbac\/user\/detail\/1/, userDetail)
Mock.mock(/\/rbac\/user\/save/, rbacSave)
Mock.mock(/\/rbac\/user\/delete/, rbacDelete)

export default Mock
