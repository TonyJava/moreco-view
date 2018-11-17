export const page = (index) => {
  return {
    'ns': null,
    'code': 0,
    'msg': 'success',
    'result': {
      'currPage': index,
      'pageSize': 10,
      'totalCount': 1,
      'totalPage': 100,
      'list': [
        {
          'id': 2,
          'createdDate': null,
          'createdBy': null,
          'updatedDate': null,
          'updatedBy': null,
          'yn': 1,
          'dataMap': {},
          'parentId': 0,
          'name': '权限管理',
          'url': 'https://blog.weechang.xyz',
          'perms': '12',
          'type': 1,
          'icon': 'icon-menu',
          'orderNum': 0,
          'children': null
        }
      ]
    },
    'ext': {}
  }
}
