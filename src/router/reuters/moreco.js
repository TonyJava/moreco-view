import Main from '@/components/main'
/**
 * moreco 增加的组件。主要做前端显示路径与页面组件的映射关系
 *
 */
export const moreco = [
  {
    path: '/moreco/rbac',
    desc: '权限管理',
    component: Main,
    children: [
      {
        path: 'dept',
        component: () => import('@/view/moreco/component/rbac/dept.vue'),
        desc: '部门管理'
      },
      {
        path: 'resource',
        component: () => import('@/view/moreco/component/rbac/resource.vue'),
        desc: '资源管理'
      },
      {
        path: 'menu',
        component: () => import('@/view/moreco/component/rbac/menu.vue'),
        desc: '目录管理'
      },
      {
        path: 'role',
        component: () => import('@/view/moreco/component/rbac/role.vue'),
        desc: '角色管理'
      },
      {
        path: 'user',
        component: () => import('@/view/moreco/component/rbac/user.vue'),
        desc: '用户管理'
      }
    ]
  }
]
