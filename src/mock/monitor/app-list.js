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
          'name': '监控系统',
          'code': 'monitor',
          'dataMap': {
            'createdBy': '張三'
          }
        },
        {
          'id': 2,
          'createdDate': null,
          'createdBy': null,
          'updatedDate': null,
          'updatedBy': null,
          'yn': 1,
          'name': '权限管理系统',
          'code': 'rbac',
          'dataMap': {
            'createdBy': '張三'
          }
        }
      ]
    },
    'ext': {}
  }
}
