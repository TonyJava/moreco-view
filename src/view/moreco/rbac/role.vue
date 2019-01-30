<style lang="less">
  @import '../../../components/moreco/moreco.less';
</style>
<template>
  <div>
    <div style="margin-top: 20px">
      <Card>
        <p slot="title">#角色管理</p>
        <!--查询-->
        <Row>
          <Form :label-width="60" inline :model="listQuery">
            <FormItem label="名称">
              <Input type="text" v-model="listQuery.name" placeholder="角色名称">
              </Input>
            </FormItem>
            <Button type="primary" @click="doQuery()">查询</Button>
          </Form>
        </Row>
        <Row class="moreco-table-options">
          <Button type="primary" icon="md-add" @click="openEdit(null)">新增</Button>
        </Row>
        <!--表格-->
        <div class="moreco-table">
          <Table border stripe :columns="columns" :data="pageData"></Table>
        </div>
        <Page :current="listQuery.currentPage" :page-size="listQuery.pageSize" :total="totalCount" size="small"
              show-sizer></Page>
      </Card>
    </div>
    <!--修改-->
    <Modal v-model="editShow" title="编辑角色">
      <Form :label-width="70" ref="editForm" :model="temp" :rules="rules">
        <FormItem label="id" hidden>
          <Input v-model="temp.id"></Input>
        </FormItem>
        <FormItem label="名称" prop="name">
          <Input v-model="temp.name" placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem label="备注" prop="remark">
          <Input v-model="temp.remark" placeholder="请输入备注"></Input>
        </FormItem>
        <div>目录权限</div>
        <Tree :data="roleMenus" show-checkbox ref="roleMenuTree"></Tree>
      </Form>
      <div slot="footer">
        <Button @click="closeEdit">取消</Button>
        <Button type="primary" :loading="editLoading" @click="save">保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { apiPage, apiDetail, apiSave, apiDelete } from '@/api/moreco/rbac/role'
import { apiTree as apiMenuTree } from '@/api/moreco/rbac/menu'
export default {
  data () {
    return {
      // 表格列
      columns: [
        {
          title: '名称',
          key: 'name',
          width: 200,
          fixed: 'left'
        },
        {
          title: '备注',
          key: 'remark'
        },
        {
          title: '创建时间',
          key: 'createdDate',
          render: (h, params) => {
            return h('div', null, params.row.dataMap.createdDate)
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.openEdit(params.row.id)
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.row.id)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      // 表格查询
      listQuery: {
        currentPage: 1,
        pageSize: 10,

        name: undefined
      },
      // 表格参数
      pageData: [],
      totalCount: 0,
      // 编辑
      editShow: false,
      editLoading: false,
      temp: {},
      rules: {
        name: [
          {required: true, message: '名称为必填项', trigger: 'blur'},
          {max: 255, message: '名称最多为255个字符', trigger: 'blur'}
        ],
        orderNum: [
          {min: -99999, max: 99999, message: '排序只能是-99999~99999', trigger: 'blur'}
        ]
      },
      roleMenus: []
    }
  },
  methods: {
    // 表格查询
    doQuery () {
      apiPage(this.listQuery).then(res => {
        if (res.data.code === 0) {
          this.listQuery.currentPage = res.data.result.currentPage
          this.listQuery.pageSize = res.data.result.pageSize
          this.totalCount = res.data.result.totalCount
          this.pageData = res.data.result.list
        }
      })
    },
    // 打开编辑
    openEdit (id) {
      if (id !== null) {
        apiDetail(id).then(res => {
          if (res.data.code === 0) {
            this.temp = res.data.result
          }
        }).then(this.permInit)
      } else {
        this.temp = {}
        this.permInit()
      }
      this.editShow = true
    },
    // 关闭编辑
    closeEdit () {
      this.editShow = false
      this.editLoading = false
    },
    // 删除
    remove (id) {
      apiDelete(id).then(res => {
        if (res.data.code === 0) {
          this.doQuery()
        }
      })
    },
    // 保存
    save () {
      this.editLoading = true
      this.$refs['editForm'].validate((valid) => {
        if (valid){
          let menuNodes = this.$refs.roleMenuTree.getCheckedNodes()
          let menuIdList = []
          for (let i in menuNodes) {
            menuIdList.push(menuNodes[i].id)
          }
          this.temp.menuIdList = menuIdList
          apiSave(this.temp).then(res => {
            if (res.data.code === 0) {
              this.editShow = false
              this.doQuery()
            }
          }).finally(() => {
            this.editLoading = false
          })
        } else {
          this.editLoading = false
        }
      })
    },
    // 授权初始化
    permInit () {
      apiMenuTree().then(res => {
        if (res.data.code === 0) {
          this.roleMenus = this.convert2MenuTree(res.data.result)
        }
      })
    },
    // 转换成树形数据
    convert2MenuTree (menus) {
      let menuTree = []
      for (let i in menus) {
        let item = menus[i]
        let menu = {}
        menu.id = item.id
        menu.title = item.name
        if (this.temp.menuIdList != null) {
          menu.checked = (this.temp.menuIdList.indexOf(item.id) > -1)
        }
        menu.children = this.convert2MenuTree(item.children)
        menuTree.push(menu)
      }
      return menuTree
    }
  },
  mounted () {
    this.doQuery()
  }
}
</script>
