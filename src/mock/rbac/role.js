export const page = () => {
  return {
    'ns': null,
    'code': 0,
    'msg': 'success',
    'result': {
      'currPage': 1,
      'pageSize': 10,
      'totalCount': 2,
      'totalPage': 1,
      'list': [
        {
          'id': 1,
          'createdDate': '2018-11-20 16:35:12',
          'createdBy': null,
          'updatedDate': null,
          'updatedBy': null,
          'yn': 1,
          'dataMap': {
            'createdDate': '2018-11-20 16:35:12'
          },
          'name': '角色1',
          'remark': 'test1',
          'deptIdList': null,
          'menuIdList': null
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
      'createdDate': '2018-11-20 16:35:12',
      'createdBy': null,
      'updatedDate': null,
      'updatedBy': null,
      'yn': 1,
      'dataMap': {

      },
      'name': '角色1',
      'remark': 'test1',
      'deptIdList': null,
      'menuIdList': [
        1
      ]
    },
    'ext': {

    }
  }
}

export const list = () => {
  return {
    'ns': null,
    'code': 0,
    'msg': 'success',
    'result': [
      {
        'id': 1,
        'createdDate': '2018-11-20 16:35:12',
        'createdBy': null,
        'updatedDate': null,
        'updatedBy': null,
        'yn': 1,
        'dataMap': {

        },
        'name': '角色1',
        'remark': 'test1',
        'deptIdList': null,
        'menuIdList': null
      },
      {
        'id': 2,
        'createdDate': null,
        'createdBy': null,
        'updatedDate': null,
        'updatedBy': null,
        'yn': 1,
        'dataMap': {

        },
        'name': '角色2',
        'remark': 'test',
        'deptIdList': null,
        'menuIdList': null
      }
    ],
    'ext': {

    }
  }
}
