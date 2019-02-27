import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import {setToken, getToken, canTurnTo} from '@/libs/util'
import config from '@/config'

import { apiPermComponent } from '@/api/moreco/component/rbac/menu'

const {homeName} = config

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})

const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
  else next({replace: true, name: 'error_401'}) // 无权限，重定向到401页面
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: homeName // 跳转到homeName页
    })
  } else {
    if (store.state.user.hasGetInfo) {
      turnTo(to, store.state.user.access, next)
    } else {
      store.dispatch('getUserInfo').then(user => {
        // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
        turnTo(to, user.access, next)
      }).catch(() => {
        setToken('')
        next({
          name: 'login'
        })
      })
    }
  }
  getPermissionComponent(to)
})

router.afterEach(to => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

/**
 * 获取能访问的路径
 */
function getPermissionComponent(to) {
  let path = to.path
  let toGetComponents = false
  let paths = store.getters.getPaths
  if (paths !== undefined && paths !== undefined && paths.length > 0) {
    for (let i in paths) {
      let item = paths[i]
      if (item === path) {
        toGetComponents = true;
        break;
      }
    }
  }
  if (toGetComponents) {
    let matched = to.matched
    let matchedPaths = []
    for (let i in matched) {
      let item = matched[i]
      matchedPaths.push(item.path)
    }
    apiPermComponent(matchedPaths.join(',')).then(res => {
      let components = {}
      for (let i in res) {
        let key = res[i].url
        components[key] = true
      }
      store.commit('setComponents', components)
    })
  }
}

export default router
