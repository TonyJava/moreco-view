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
            'createdDate': null
          },
          'parentId': 0,
          'name': '一级部门1',
          'orderNum': 0,
          'children': null
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

      },
      'parentId': 0,
      'name': '一级部门1',
      'orderNum': 0,
      'children': null
    },
    'ext': {

    }
  }
}

export const tree = () => {
  return {
    'ns': null,
    'code': 0,
    'msg': 'success',
    'result': [
      {
        'id': 14,
        'createdDate': null,
        'createdBy': null,
        'updatedDate': null,
        'updatedBy': null,
        'yn': 1,
        'dataMap': {

        },
        'parentId': 0,
        'name': '一级部门1',
        'orderNum': 0,
        'children': [
          {
            'id': 15,
            'createdDate': null,
            'createdBy': null,
            'updatedDate': null,
            'updatedBy': null,
            'yn': 1,
            'dataMap': {

            },
            'parentId': 14,
            'name': '二级部门1',
            'orderNum': 0,
            'children': [
              {
                'id': 16,
                'createdDate': null,
                'createdBy': null,
                'updatedDate': null,
                'updatedBy': null,
                'yn': 1,
                'dataMap': {

                },
                'parentId': 15,
                'name': '三级部门1',
                'orderNum': 0,
                'children': [

                ]
              }
            ]
          }
        ]
      }
    ],
    'ext': {

    }
  }
}
