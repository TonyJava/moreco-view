<style lang="less">
  @import '../../components/moreco/moreco.less';
</style>
<template>
  <div>
    <div style="margin-top: 20px">
      <Card>
        <Button type="primary" icon="md-add" @click="openEdit(null)">新增</Button>
      </Card>
      <!--表格-->
      <Card>
        <p slot="title">#角色列表</p>
        <div class="moreco-table">
          <Table border stripe :columns="columns" :data="pageData"></Table>
        </div>
        <Page :current="currPage" :page-size="pageSize" :total="totalCount" size="small" show-sizer></Page>
      </Card>
    </div>
    <!--修改-->
    <Modal v-model="editShow" title="编辑角色">
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
import { apiPage, apiDetail, apiSave, apiDelete } from '@/api/moreco-rbac/role'
import { apiTree as apiMenuTree } from '@/api/moreco-rbac/menu'
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
      editLoading: false,
      roleObj: {},
      roleMenus: []
    }
  },
  methods: {
    // 表格查询
    doQuery () {
      apiPage(this.currPage).then(res => {
        if (res.data.code === 0) {
          this.currPage = res.data.result.currPage
          this.pageSize = res.data.result.pageSize
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
            this.roleObj = res.data.result
          }
        }).then(this.permInit)
      } else {
        this.roleObj = {}
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
      let menuNodes = this.$refs.roleMenuTree.getCheckedNodes()
      let menuIdList = []
      for (let i in menuNodes) {
        menuIdList.push(menuNodes[i].id)
      }
      this.roleObj.menuIdList = menuIdList
      apiSave(this.roleObj).then(res => {
        if (res.data.code === 0) {
          this.editShow = false
          this.doQuery()
        }
      }).finally(() => {
        this.editLoading = false
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
        if (this.roleObj.menuIdList != null) {
          menu.checked = (this.roleObj.menuIdList.indexOf(item.id) > -1)
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
