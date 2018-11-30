<style lang="less">
  @import '../../components/moreco/moreco.less';
</style>
<template>
  <div>
    <div style="margin-top: 20px">
      <Card>
        <Button type="primary" icon="md-add" @click="openEdit(null)">新增</Button>&nbsp;&nbsp;
        <Button type="success" icon="ios-arrow-back" @click="goBack()" v-if="this.parentId !== 0">返回上级</Button>
      </Card>
      <!--表格-->
      <Card>
        <p slot="title">#组织机构列表</p>
        <div class="moreco-table">
          <Table border stripe :columns="columns" :data="pageData"></Table>
        </div>
        <Page :current="currPage" :page-size="pageSize" :total="totalCount" size="small" show-sizer></Page>
      </Card>
    </div>
    <!--修改-->
    <Modal v-model="editShow" title="编辑组织机构">
      <Form :model="deptObj" :label-width="60">
        <FormItem label="id" hidden>
          <Input v-model="deptObj.id"></Input>
        </FormItem>
        <FormItem label="parentId" hidden>
          <Input v-model="deptObj.parentId"></Input>
        </FormItem>
        <FormItem label="上级机构">
          <Input v-model="this.parentName" disabled="disabled"></Input>
        </FormItem>
        <FormItem label="名称">
          <Input v-model="deptObj.name" placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem label="排序">
          <Input v-model="deptObj.orderNum" placeholder="请输入排序值"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="closeEdit">取消</Button>
        <Button type="primary" :loading="editLoading" @click="save">保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { apiPage, apiDetail, apiSave, apiDelete } from '@/api/moreco-rbac/dept'
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
          title: '排序',
          key: 'orderNum'
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.parentIdStack.push(this.parentId)
                    this.parentNameStack.push(this.parentName)
                    this.parentId = params.row.id
                    this.parentName = params.row.name
                    this.doQuery()
                  }
                }
              }, '管理下级'),
              h('span', {}, ' '),
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
      // 查询
      queryObj: {},
      // 编辑
      editShow: false,
      editLoading: false,
      deptObj: {},
      parentId: 0,
      parentName: '顶级部门',
      parentIdStack: [],
      parentNameStack: [],
      menuTypes: []
    }
  },
  methods: {
    // 表格查询
    doQuery () {
      this.queryObj.parentId = this.parentId
      apiPage(this.currPage, this.queryObj).then(res => {
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
            this.deptObj = res.data.result
          }
        })
      } else {
        this.deptObj = {}
      }
      this.editShow = true
    },
    // 关闭编辑
    closeEdit () {
      this.editShow = false
      this.editLoading = false
    },
    // 保存
    save () {
      this.editLoading = true
      this.deptObj.parentId = this.parentId
      apiSave(this.deptObj).then(res => {
        if (res.data.code === 0) {
          this.editShow = false
          this.doQuery()
        }
      }).finally(() => {
        this.editLoading = false
      })
    },
    // 删除
    remove (id) {
      apiDelete(id).then(res => {
        if (res.data.code === 0) {
          this.doQuery()
        }
      })
    },
    // 返回上级
    goBack () {
      this.parentId = this.parentIdStack.pop()
      this.parentName = this.parentNameStack.pop()
      this.doQuery()
    }
  },
  mounted () {
    this.doQuery()
  }
}
</script>
