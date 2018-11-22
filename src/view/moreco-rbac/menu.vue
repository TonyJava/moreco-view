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
        <p slot="title">#目录列表</p>
        <div class="moreco-table">
          <Table border stripe :columns="columns" :data="pageData"></Table>
        </div>
        <Page :current="currPage" :page-size="pageSize" :total="totalCount" size="small" show-sizer></Page>
      </Card>
    </div>
    <!--修改-->
    <Modal v-model="editShow" title="编辑目录">
      <Form :model="menuObj" :label-width="60">
        <FormItem label="id" hidden>
          <Input v-model="menuObj.id"></Input>
        </FormItem>
        <FormItem label="parentId" hidden>
          <Input v-model="menuObj.parentId"></Input>
        </FormItem>
        <FormItem label="上级目录">
          <Input v-model="this.parentName" disabled="disabled"></Input>
        </FormItem>
        <FormItem label="名称">
          <Input v-model="menuObj.name" placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem label="图标">
          <Input v-model="menuObj.icon" placeholder="请输入图标"></Input>
        </FormItem>
        <FormItem label="类型">
          <Select v-model="menuObj.type" style="width:200px">
            <Option v-for="item in menuTypes" :value="item.key" aria-selected="menuObj.type === item.key" :key="item.key">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="排序">
          <Input v-model="menuObj.orderNum" placeholder="请输入排序值"></Input>
        </FormItem>
        <FormItem label="路由">
          <Input v-model="menuObj.url" placeholder="请输入路由"></Input>
        </FormItem>
        <FormItem label="授权标识">
          <Input v-model="menuObj.perms" placeholder="请输入授权标识"></Input>
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
import { apiPage, apiToPage, apiDetail, apiSave, apiDelete } from '@/api/moreco-rbac/menu'
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
          title: '图标',
          key: 'icon',
          render: (h, params) => {
            return h('Icon', {
              props: {
                type: params.row.icon,
                size: 24
              }
            })
          }
        },
        {
          title: '类型',
          key: 'type',
          render: (h, params) => {
            return h('div', {}, params.row.dataMap.type)
          }
        },
        {
          title: '排序',
          key: 'orderNum'
        },
        {
          title: '路由',
          key: 'url'
        },
        {
          title: '授权标识',
          key: 'perms'
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
      // 编辑
      editShow: false,
      editLoading: false,
      menuObj: {},
      parentId: 0,
      parentName: '顶级目录',
      parentIdStack: [],
      parentNameStack: [],
      menuTypes: []
    }
  },
  methods: {
    // 页面初始化
    initPage () {
      apiToPage().then(res => {
        if (res.data.code === 0) {
          this.menuTypes = res.data.result.menuTypes
        }
      })
    },
    // 表格查询
    doQuery () {
      apiPage(this.parentId, this.currPage).then(res => {
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
            this.menuObj = res.data.result
          }
        })
      } else {
        this.menuObj = {}
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
      if (this.menuObj.parentId === 'undefined') {
        this.menuObj.parentId = this.parentId
      }
      apiSave(this.menuObj).then(res => {
        this.editLoading = false
        this.editShow = false
        if (res.data.code === 0) {
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
    this.initPage()
    this.doQuery()
  }
}
</script>
