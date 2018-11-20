<style lang="less">
  @import '../../components/moreco/moreco.less';
</style>
<template>
  <div>
    <div style="margin-top: 20px">
      <Card>
        <Button type="primary" icon="ios-search" @click="openEdit(null)">新增</Button>
      </Card>
      <!--表格-->
      <Card>
        <p slot="title">#角色列表</p>
        <div class="table-page-footer">
          <Table border stripe :columns="columns" :data="pageData"></Table>
        </div>
        <Page :current="currPage" :page-size="pageSize" :total="totalCount" size="small" show-sizer></Page>
      </Card>
    </div>
    <!--修改-->
    <Modal v-model="editShow" title="编辑角色" @on-ok="save()">
      <Form :model="roleObj" :label-width="60">
        <FormItem label="id" hidden>
          <Input v-model="roleObj.id"></Input>
        </FormItem>
        <FormItem label="名称">
          <Input v-model="roleObj.name" placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem label="备注">
          <Input v-model="roleObj.remark" placeholder="请输入备注"></Input>
        </FormItem>
        <Row>
          <Col span="12">
            <div>目录权限</div>
            <Tree :data="roleMenus" show-checkbox ref="roleMenuTree"></Tree>
          </Col>
          <Col span="12">
            <div>数据权限</div>
            <Tree :data="roleDepts" show-checkbox ref="roleDeptTree"></Tree>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { page, detail, save, del } from '@/api/moreco-rbac/role'
import { menuTree } from '@/api/moreco-rbac/menu'
import { deptTree } from '@/api/moreco-rbac/dept'
export default {
  data () {
    return {
      // 表格列
      columns: [
        {
          title: '名称',
          key: 'name',
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
      // 表格参数
      pageData: [],
      currPage: 1,
      pageSize: 10,
      totalCount: 0,
      // 编辑
      editShow: false,
      roleObj: {},
      roleMenus: [],
      roleDepts: []
    }
  },
  methods: {
    // 表格查询
    doQuery () {
      page(this.currPage).then(res => {
        if (res.data.code === 0) {
          this.currPage = res.data.result.currPage
          this.pageSize = res.data.result.pageSize
          this.totalCount = res.data.result.totalCount
          this.pageData = res.data.result.list
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 打开编辑
    openEdit (id) {
      if (id !== null) {
        detail(id).then(res => {
          if (res.data.code === 0) {
            this.roleObj = res.data.result
          }
        }).then(this.permInit)
      }
      this.editShow = true
    },
    // 删除
    remove (id) {
      del(id).then(res => {
        if (res.data.code === 0) {
          this.doQuery()
        }
      })
    },
    // 保存
    save () {
      var menuNodes = this.$refs.roleMenuTree.getCheckedNodes()
      var deptNodes = this.$refs.roleDeptTree.getCheckedNodes()
      var menuIdList = []
      var deptIdList = []
      for (var i in menuNodes) {
        menuIdList.push(menuNodes[i].id)
      }
      for (var j in deptNodes) {
        deptIdList.push(deptNodes[j].id)
      }
      this.roleObj.menuIdList = menuIdList
      this.roleObj.deptIdList = deptIdList
      save(this.roleObj).then(res => {
        if (res.data.code === 0) {
          this.doQuery()
        }
      })
    },
    // 授权拼接
    permInit () {
      menuTree().then(res => {
        if (res.data.code === 0) {
          this.roleMenus = this.convert2MenuTree(res.data.result)
        }
      })
      deptTree().then(res => {
        if (res.data.code === 0) {
          this.roleDepts = this.convert2DeptTree(res.data.result)
        }
      })
    },
    // 转换成树形数据
    convert2MenuTree (menus) {
      var menuTree = []
      for (var i in menus) {
        var item = menus[i]
        var menu = {}
        menu.id = item.id
        menu.title = item.name
        menu.expand = false
        menu.checked = (this.roleObj.menuIdList.indexOf(item.id) > -1)
        menu.children = this.convert2MenuTree(item.children)
        menuTree.push(menu)
      }
      return menuTree
    },
    // 转换成树形数据
    convert2DeptTree (depts) {
      var deptTree = []
      for (var i in depts) {
        var item = depts[i]
        var dept = {}
        dept.id = item.id
        dept.title = item.name
        dept.expand = false
        dept.checked = this.roleObj.deptIdList.indexOf(item.id) > -1
        dept.children = this.convert2DeptTree(item.children)
        deptTree.push(dept)
      }
      return deptTree
    }
  },
  mounted () {
    this.doQuery()
  }
}
</script>
