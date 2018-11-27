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
        <p slot="title">#服务器列表</p>
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
import {apiPage, apiDetail, apiSave, apiDelete} from '@/api/moreco-monitor/server-list'
export default {
  data () {
    return {
      // 表格列
      columns: [
        {
          title: '主机',
          align: 'center',
          children: [
            {
              title: 'IP',
              key: 'ipAddress'
            },
            {
              title: '操作系统',
              key: 'osName',
              render: (h, params) => {
                return h('div', null, params.row.dataMap.osName)
              }
            },
            {
              title: '状态',
              align: 'center',
              key: 'serverStatus',
              width: 100,
              render: (h, params) => {
                let clazz = null
                switch (params.row.serverStatus) {
                  case 0:
                    clazz = 'moreco-label label-error'
                    break
                  case 1:
                    clazz = 'moreco-label label-success'
                    break
                  default:
                    clazz = 'moreco-label label-info'
                    break
                }
                return h('div', {
                  class: clazz
                }, params.row.dataMap.serverStatus)
              }
            }
          ]
        },
        {
          title: 'CPU',
          align: 'center',
          children: [
            {
              title: '核心数',
              key: 'cpuCore',
              width: 100
            },
            {
              title: '占用率',
              key: 'cpuUseRate',
              width: 100,
              render: (h, params) => {
                let percent = Math.floor(params.row.cpuUseRate / 25)
                let clazz = null
                switch (percent) {
                  case 0:
                    clazz = 'moreco-label label-success'
                    break
                  case 1:
                    clazz = 'moreco-label label-info'
                    break
                  case 2:
                    clazz = 'moreco-label label-warring'
                    break
                  case 3:
                    clazz = 'moreco-label label-error'
                    break
                  default:
                    clazz = 'moreco-label label-error'
                    break
                }
                return h('div', {
                  class: clazz
                }, params.row.cpuUseRate + '%')
              }
            }
          ]
        },
        {
          title: '内存',
          align: 'center',
          children: [
            {
              title: '总数',
              key: 'memTotal',
              render: (h, params) => {
                return h('div', null, params.row.memTotal + 'M')
              }
            },
            {
              title: '已用',
              key: 'memUsed',
              render: (h, params) => {
                return h('div', null, params.row.memUsed + 'M')
              }
            }
          ]
        },
        {
          title: 'Agent',
          align: 'center',
          children: [
            {
              title: '心跳时间',
              key: 'heartBeat',
              render: (h, params) => {
                return h('div', null, params.row.dataMap.heartBeat)
              }
            },
            {
              title: '状态',
              align: 'center',
              key: 'agentStatus',
              width: 100,
              render: (h, params) => {
                let clazz = null
                switch (params.row.agentStatus) {
                  case 0:
                    clazz = 'moreco-label label-error'
                    break
                  case 1:
                    clazz = 'moreco-label label-success'
                    break
                  default:
                    clazz = 'moreco-label label-info'
                    break
                }
                return h('div', {
                  class: clazz
                }, params.row.dataMap.agentStatus)
              }
            }
          ]
        },
        {
          title: '报警',
          align: 'center',
          children: [
            {
              title: '性能报警',
              key: 'performanceAlarm',
              width: 100,
              render: (h, params) => {
                let clazz = null
                switch (params.row.performanceAlarm) {
                  case 0:
                    clazz = 'moreco-label label-error'
                    break
                  case 1:
                    clazz = 'moreco-label label-success'
                    break
                  default:
                    clazz = 'moreco-label label-info'
                    break
                }
                return h('div', {
                  class: clazz
                }, params.row.dataMap.performanceAlarm)
              }
            },
            {
              title: '存活报警',
              key: 'aliveAlarm',
              width: 100,
              render: (h, params) => {
                let clazz = null
                switch (params.row.aliveAlarm) {
                  case 0:
                    clazz = 'moreco-label label-error'
                    break
                  case 1:
                    clazz = 'moreco-label label-success'
                    break
                  default:
                    clazz = 'moreco-label label-info'
                    break
                }
                return h('div', {
                  class: clazz
                }, params.row.dataMap.aliveAlarm)
              }
            }
          ]
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
