import {
  login,
  logout,
  getUserInfo,
  getMessage,
  getContentByMsgId,
  hasRead,
  removeReaded,
  restoreTrash
} from '@/api/user.js'
import { setToken, getToken } from '@/libs/util'

import {apiPermissionMenuTree} from '@/api/moreco/component/rbac/menu'
import {getPaths} from "../../libs/util";

const MENUS_KEY = 'mcMenus'
const PATHS_KEY = 'mcPaths'
const COMPONENTS_KEY = 'mcComponents'

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false,
    messageUnreadList: [],
    messageReadedList: [],
    messageTrashList: [],
    messageContentStore: {},
    // 权限管理
    mcMenus: [],
    mcPaths: [],
    mcComponents: {}
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    setMessageUnreadList (state, list) {
      state.messageUnreadList = list
    },
    setMessageReadedList (state, list) {
      state.messageReadedList = list
    },
    setMessageTrashList (state, list) {
      state.messageTrashList = list
    },
    updateMessageContentStore (state, { msg_id, content }) {
      state.messageContentStore[msg_id] = content
    },
    moveMsg (state, { from, to, msg_id }) {
      const index = state[from].findIndex(_ => _.msg_id === msg_id)
      const msgItem = state[from].splice(index, 1)[0]
      msgItem.loading = false
      state[to].unshift(msgItem)
    },
    // 权限管理
    setMenus(state, menus) {
      state.mcMenus = menus
      localStorage.setItem(MENUS_KEY, JSON.stringify(menus))
    },
    setPaths(state, paths) {
      state.mcPaths = paths
      localStorage.setItem(PATHS_KEY, JSON.stringify(paths))
    },
    setComponents(state, components) {
      state.mcComponents = components
      localStorage.setItem(COMPONENTS_KEY, JSON.stringify(components))
    },
  },
  getters: {
    messageUnreadCount: state => state.messageUnreadList.length,
    messageReadedCount: state => state.messageReadedList.length,
    messageTrashCount: state => state.messageTrashList.length,
    getMenus: () => JSON.parse(localStorage.getItem(MENUS_KEY)),
    getPaths: () => JSON.parse(localStorage.getItem(PATHS_KEY)),
    components: () => JSON.parse(localStorage.getItem(COMPONENTS_KEY))
  },
  actions: {
    // 登录
    handleLogin ({ state, commit }, { username, password }) {
      username = username.trim()
      return new Promise((resolve, reject) => {
        login({
          username,
          password
        }).then(res => {
          commit('setToken', res.token)
          // 权限管理
          apiPermissionMenuTree().then(res => {
            commit('setMenus', res)
            let paths = buildPaths(null, state.mcMenus)
            commit('setPaths', paths)
          })
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          // 权限管理
          commit('setMenus', null)
          commit('setPaths', null)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token).then(res => {
            const data = res
            commit('setAvator', data.avator)
            commit('setUserName', data.name)
            commit('setUserId', data.user_id)
            commit('setAccess', data.access)
            commit('setHasGetInfo', true)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    // 获取消息列表，其中包含未读、已读、回收站三个列表
    getMessageList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getMessage().then(res => {
          const { unread, readed, trash } = res
          commit('setMessageUnreadList', unread.sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          commit('setMessageReadedList', readed.map(_ => {
            _.loading = false
            return _
          }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          commit('setMessageTrashList', trash.map(_ => {
            _.loading = false
            return _
          }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 根据当前点击的消息的id获取内容
    getContentByMsgId ({ state, commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        let contentItem = state.messageContentStore[msg_id]
        if (contentItem) {
          resolve(contentItem)
        } else {
          getContentByMsgId(msg_id).then(res => {
            const content = res
            commit('updateMessageContentStore', { msg_id, content })
            resolve(content)
          })
        }
      })
    },
    // 把一个未读消息标记为已读
    hasRead ({ commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        hasRead(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageUnreadList',
            to: 'messageReadedList',
            msg_id
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除一个已读消息到回收站
    removeReaded ({ commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        removeReaded(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageReadedList',
            to: 'messageTrashList',
            msg_id
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 还原一个已删除消息到已读消息
    restoreTrash ({ commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        restoreTrash(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageTrashList',
            to: 'messageReadedList',
            msg_id
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

function buildPaths(parentPath, menus) {
  const paths = []
  if (menus !== undefined && menus !== null && menus.length > 0) {
    for (let i in menus) {
      let menu = menus[i]
      let path = null
      if (parentPath !== null) {
        path = parentPath + '/' + menu.url
      } else {
        path = menu.url
      }
      if (menu.children !== undefined && menu.children.length > 0) {
        return buildPaths(path, menu.children)
      }
      paths.push(path)
    }
    return paths
  }
}
