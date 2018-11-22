export const page = () => {
  return {
    'ns': null,
    'code': 0,
    'msg': 'success',
    'result': {
      'currPage': 1,
      'pageSize': 10,
      'totalCount': 1,
      'totalPage': 1,
      'list': [
        {
          'id': 1,
          'createdDate': null,
          'createdBy': null,
          'updatedDate': null,
          'updatedBy': null,
          'yn': 1,
          'dataMap': {
            'type': '菜单'
          },
          'parentId': 0,
          'name': '权限管理',
          'url': 'https://moreco.weechang.xyz',
          'perms': '12',
          'type': 1,
          'icon': 'ios-book',
          'orderNum': 0,
          'children': null
        },
        {
          'id': 2,
          'createdDate': null,
          'createdBy': null,
          'updatedDate': null,
          'updatedBy': null,
          'yn': 1,
          'dataMap': {
            'type': '菜单'
          },
          'parentId': 0,
          'name': '系统管理',
          'url': 'https://blog.weechang.xyz',
          'perms': 'ios-alarm',
          'type': 1,
          'icon': 'ios-alarm',
          'orderNum': 1,
          'children': null
        }
      ]
    },
    'ext': {}
  }
}

export const toPage = () => {
  return {
    'ns': null,
    'code': 0,
    'msg': 'success',
    'result': {
      'menuTypes': [
        {
          'name': '菜单',
          'key': 1
        },
        {
          'name': '页面组件',
          'key': 2

        }]
    },
    'ext': {}
  }
}

export const detail = () => {
  return {
    'ns': null,
    'code': 0,
    'msg': 'success',
    'result': {
      'id': 2,
      'createdDate': null,
      'createdBy': null,
      'updatedDate': null,
      'updatedBy': null,
      'yn': 1,
      'dataMap': {

      },
      'parentId': 1,
      'name': '权限管理',
      'url': 'https://blog.weechang.xyz',
      'perms': '12',
      'type': 1,
      'icon': 'icon-menu',
      'orderNum': 0,
      'children': null
    },
    'ext': {}
  }
}

export const tree = () => {
  return {
    'ns': null,
    'code': 0,
    'msg': 'success',
    'result': [
      {
        'id': 1,
        'createdDate': null,
        'createdBy': null,
        'updatedDate': null,
        'updatedBy': null,
        'yn': 1,
        'dataMap': {

        },
        'parentId': 0,
        'name': '权限管理1',
        'url': 'https://blog.weechang.xyz',
        'perms': '12',
        'type': 1,
        'icon': 'icon-menu',
        'orderNum': 0,
        'children': [
          {
            'id': 2,
            'createdDate': null,
            'createdBy': null,
            'updatedDate': null,
            'updatedBy': null,
            'yn': 1,
            'dataMap': {

            },
            'parentId': 1,
            'name': '权限管理',
            'url': 'https://blog.weechang.xyz',
            'perms': '12',
            'type': 1,
            'icon': 'icon-menu',
            'orderNum': 0,
            'children': [

            ]
          },
          {
            'id': 3,
            'createdDate': null,
            'createdBy': null,
            'updatedDate': null,
            'updatedBy': null,
            'yn': 1,
            'dataMap': {

            },
            'parentId': 1,
            'name': '组织机构',
            'url': '11',
            'perms': '11',
            'type': 1,
            'icon': null,
            'orderNum': 1,
            'children': [

            ]
          },
          {
            'id': 4,
            'createdDate': null,
            'createdBy': null,
            'updatedDate': null,
            'updatedBy': null,
            'yn': 1,
            'dataMap': {

            },
            'parentId': 1,
            'name': '角色管理',
            'url': 'test',
            'perms': 'test',
            'type': 1,
            'icon': 'test',
            'orderNum': 2,
            'children': [

            ]
          },
          {
            'id': 5,
            'createdDate': null,
            'createdBy': null,
            'updatedDate': null,
            'updatedBy': null,
            'yn': 1,
            'dataMap': {

            },
            'parentId': 1,
            'name': '用户管理',
            'url': '疼痛',
            'perms': '恩特',
            'type': 1,
            'icon': null,
            'orderNum': 3,
            'children': [

            ]
          }
        ]
      }
    ],
    'ext': {

    }
  }
}
