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
            'createdDate': null,
            'status': null
          },
          'username': 'admin',
          'salt': null,
          'realName': '张三',
          'email': 'zhangsan@moreco.com',
          'mobile': '15312311542',
          'triedTimes': null,
          'lockedTime': null,
          'status': null,
          'deptId': 16,
          'roleIds': null
        }
      ]
    },
    'ext': {

    }
  }
}

export const detail = () => {
  return {
    'ns': null,
    'code': 0,
    'msg': 'success',
    'result': {
      'id': 1,
      'createdDate': null,
      'createdBy': null,
      'updatedDate': null,
      'updatedBy': null,
      'yn': 1,
      'dataMap': {
        'createdDate': null,
        'status': null
      },
      'username': 'admin',
      'salt': null,
      'realName': '张三',
      'email': 'zhangsan@moreco.com',
      'mobile': '15312311542',
      'triedTimes': null,
      'lockedTime': null,
      'status': null,
      'deptId': 16,
      'roleIds': [1, 2]
    },
    'ext': {

    }
  }
}
