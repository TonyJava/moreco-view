<style lang="less">
  @import '../../components/moreco-components/moreco.less';
</style>
<template>
  <div>
    <div style="margin-top: 20px">
      <Card>
        <Button type="primary" icon="ios-search" @click="edit(null)">新增</Button>
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
      <input v-model="editObj.id" hidden></input>
      <div class="input-line">
        名称：<Input placeholder="请输入名称" style="width: 200px" />
      </div>
      <div class="input-line">
        图标：<Input placeholder="请输入图标" style="width: 200px" />
      </div>
      <div class="input-line">
        类型：<Input placeholder="请输入类型" style="width: 200px" />
      </div>
      <div class="input-line">
        路由：<Input placeholder="请输入类型" style="width: 200px" />
      </div>
      <div class="input-line">
        授权标识：<Input placeholder="请输入类型" style="width: 200px" />
      </div>
    </Modal>
  </div>
</template>
<script>
import { page } from '@/api/moreco-rbac/menu'
export default {
  data () {
    return {
      // 表格列
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '图标',
          key: 'icon'
        },
        {
          title: '类型',
          key: 'type'
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
          width: 150,
          align: 'center',
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
      editObj: {}
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
    // 编辑
    edit (id) {
      console.log(id)
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
    this.doQuery()
  }
}
</script>
