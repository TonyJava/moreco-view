<style lang="less">
  @import '../../components/moreco/moreco.less';
</style>
<template>
  <div>
    <div style="margin-top: 20px">
      <Card>
        <Button type="primary" icon="md-add" @click="edit(null)">新增</Button>
      </Card>
      <!--表格-->
      <Card>
        <p slot="title">#目录列表</p>
        <div class="table-page-footer">
          <Table border stripe :columns="columns" :data="pageData"></Table>
        </div>
        <Page :current="currPage" :page-size="pageSize" :total="totalCount" size="small" show-sizer></Page>
      </Card>
    </div>
    <!--修改-->
    <Modal v-model="editShow" title="编辑目录" @on-ok="ok" @on-cancel="cancel">
      <Form :model="editObj" :label-width="60">
        <FormItem label="id" hidden>
          <Input v-model="editObj.id"></Input>
        </FormItem>
        <FormItem label="名称">
          <Input v-model="editObj.input" placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem label="图标">
          <Input v-model="editObj.icon" placeholder="请输入图标"></Input>
        </FormItem>
        <FormItem label="类型">
          <Select v-model="editObj.type" style="width:200px">
            <Option v-for="item in menuTypes" :value="item.key" :key="item.key">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="排序">
          <Input v-model="editObj.input" placeholder="请输入排序值"></Input>
        </FormItem>
        <FormItem label="路由">
          <Input v-model="editObj.input" placeholder="请输入路由"></Input>
        </FormItem>
        <FormItem label="授权标识">
          <Input v-model="editObj.input" placeholder="请输入授权标识"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { page, toList } from '@/api/moreco-rbac/menu'
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
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.edit(params.id)
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.id)
                  }
                }
              }, '管理下级'),
              h('span', {}, ' '),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.id)
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
      editObj: {},
      parentId: null,
      menuTypes: []
    }
  },
  methods: {
    // 页面初始化
    initPage () {
      toList().then(res => {
        if (res.data.code === 0) {
          this.menuTypes = res.data.result.menuTypes
        }
      })
    },
    // 表格查询
    doQuery () {
      page(this.parentId, this.currPage).then(res => {
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
    // 编辑
    edit (id) {
      this.editShow = true
    },
    remove (index) {
      this.data6.splice(index, 1)
    },
    ok () {
      this.$Message.info('Clicked ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    }
  },
  mounted () {
    this.initPage()
    this.doQuery()
  }
}
</script>
