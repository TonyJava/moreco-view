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
          'ipAddress': '192.168.0.1',
          'osName': 1,
          'cpuCore': 4,
          'cpuUseRate': 22.8,
          'memTotal': 8890,
          'memUsed': 1056,
          'serverStatus': 1,
          'agentStatus': 1,
          'heartBeat': '',
          'performanceAlarm': 1,
          'aliveAlarm': 1,
          'dataMap': {
            'osName': 'Linux',
            'serverStatus': '运行中',
            'agentStatus': '运行中',
            'heartBeat': '2018-11-27 18:04:22',
            'performanceAlarm': '开启',
            'aliveAlarm': '开启'
          }
        },
        {
          'id': 1,
          'createdDate': null,
          'createdBy': null,
          'updatedDate': null,
          'updatedBy': null,
          'yn': 1,
          'ipAddress': '192.168.0.2',
          'osName': 1,
          'cpuCore': 4,
          'cpuUseRate': 19.7,
          'memTotal': 8890,
          'memUsed': 2144,
          'serverStatus': 1,
          'agentStatus': 1,
          'heartBeat': '',
          'performanceAlarm': 1,
          'aliveAlarm': 1,
          'dataMap': {
            'osName': 'Linux',
            'serverStatus': '运行中',
            'agentStatus': '运行中',
            'heartBeat': '2018-11-27 18:04:22',
            'performanceAlarm': '开启',
            'aliveAlarm': '开启'
          }
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
