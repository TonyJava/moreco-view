<style lang="less">
  @import '../../components/moreco/moreco.less';
</style>
<template>
  <div>
    <div style="margin-top: 20px">
      <Card>
        <Button type="primary" icon="md-add" @click="openEdit(null)">新增</Button>&nbsp;&nbsp;
      </Card>
      <!--表格-->
      <Card>
        <p slot="title">#报警列表</p>
        <div class="moreco-table">
          <Table border stripe :columns="columns" :data="pageData"></Table>
        </div>
        <Page :current="currPage" :page-size="pageSize" :total="totalCount" size="small" show-sizer></Page>
      </Card>
    </div>
    <!--修改-->
    <Modal v-model="editShow" title="编辑">
      <Form :model="projectObj" :label-width="60">
        <FormItem label="id" hidden>
          <Input v-model="projectObj.id"></Input>
        </FormItem>
        <FormItem label="名称">
          <Input v-model="projectObj.name" placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem label="编码">
          <Input v-model="projectObj.code" placeholder="请输入编码"></Input>
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
import {apiPage, apiDetail, apiSave, apiDelete} from '@/api/moreco-monitor/project-list'
export default {
  data () {
    return {
      // 表格列
      columns: [
        {
          title: '规则编号',
          key: 'name',
          fixed: 'left'
        },
        {
          title: '规则类型',
          key: 'code'
        },
        {
          title: '报警主题',
          key: 'code'
        },
        {
          title: '短信发送状态',
          key: 'code'
        },
        {
          title: '邮件发送状态',
          key: 'code'
        },
        {
          title: '类型',
          key: 'code'
        },
        {
          title: '创建时间',
          key: 'code'
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
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.openEdit(params.row.id)
                  }
                }
              }, '查看详情'),
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
      projectObj: {}
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
    }
  },
  mounted () {
    this.doQuery()
  }
}
</script>
