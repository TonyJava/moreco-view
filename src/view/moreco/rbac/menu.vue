<style lang="less">
  @import '../../../components/moreco/moreco.less';
</style>
<template>
  <div>
    <div style="margin-top: 20px">
      <Card>
        <p slot="title">#目录管理</p>
        <!--查询-->
        <Row>
          <Form label-position="left" :label-width="60" inline ref="formInline" :model="listQuery">
            <FormItem label="目录类型">
              <Select v-model="listQuery.type" style="width:200px">
                <Option v-for="item in menuTypes" :value="item.key" :key="item.key">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <Button type="primary" @click="doQuery">查询</Button>
          </Form>
        </Row>
        <Row class="moreco-table-options">
          <Button type="primary" icon="md-add" @click="openEdit(null)">新增</Button>&nbsp;&nbsp;
          <Button type="success" icon="ios-arrow-back" @click="goBack()" v-if="this.listQuery.parentId !== 0">返回上级</Button>
        </Row>
        <!--表格-->
        <div class="moreco-table">
          <Table border stripe :columns="columns" :data="pageData"></Table>
        </div>
        <Page :current="listQuery.currentPage" :page-size="listQuery.pageSize" :total="totalCount" size="small" show-sizer></Page>
      </Card>
    </div>
    <!--修改-->
    <Modal v-model="editShow" title="编辑目录">
      <Form :label-width="70" ref="editForm" :model="temp" :rules="rules">
        <FormItem label="id" hidden>
          <Input v-model="temp.id"></Input>
        </FormItem>
        <FormItem label="parentId" hidden>
          <Input v-model="temp.parentId"></Input>
        </FormItem>
        <FormItem label="上级目录">
          <Input v-model="this.listQuery.parentName" disabled="disabled"></Input>
        </FormItem>
        <FormItem label="名称" prop="name">
          <Input v-model="temp.name" placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem label="图标" prop="icon">
          <Input v-model="temp.icon" placeholder="请输入图标"></Input>
        </FormItem>
        <FormItem label="类型" prop="type">
          <Select v-model="temp.type" style="width:200px">
            <Option v-for="item in menuTypes" :value="item.key" aria-selected="temp.type === item.key" :key="item.key">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="路由" prop="url">
          <Input v-model="temp.url" placeholder="请输入路由"></Input>
        </FormItem>
        <FormItem label="是否显示" prop="show">
          <i-switch v-model="temp.show">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </FormItem>
        <FormItem label="排序" prop="orderNum">
          <Input v-model="temp.orderNum" placeholder="请输入排序值"></Input>
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
import { apiPage, apiToPage, apiDetail, apiSave, apiDelete } from '@/api/moreco/rbac/menu'
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
            let color = null
            switch (params.row.type) {
              case 1:
                color = 'primary'
                break
              case 2:
                color = 'success'
                break
              default:
                color = 'default'
                break
            }
            return h('Tag', {
              props: {
                color: color
              }
            }, params.row.dataMap.type)
          }
        },
        {
          title: '路由',
          key: 'url'
        },
        {
          title: '是否显示',
          key: 'show',
          render: (h, params) => {
            return h('i-switch', {
              props: {
                disabled: true
              }
            }, params.row.show)
          }
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
                    this.parentIdStack.push(this.listQuery.parentId)
                    this.parentNameStack.push(this.listQuery.parentName)
                    this.listQuery.parentId = params.row.id
                    this.listQuery.parentName = params.row.name
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
      // 表格查询
      listQuery: {
        currentPage: 1,
        pageSize: 10,

        parentId: 0,
        parentName: '顶级目录',
        type: undefined
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
          { required: true, message: '名称为必填项', trigger: 'blur' },
          { max: 255, message: '名称最多为255个字符', trigger: 'blur' }
        ],
        icon: [
          { max: 255, message: '图标最多为255个字符', trigger: 'blur' }
        ],
        tag: [
          { required: true, message: '标签为必填项', trigger: 'blur' },
          { max: 255, message: '标签最多为255个字符', trigger: 'blur' }
        ],
        remark: [
          { max: 255, message: '备注最多为255个字符', trigger: 'blur' }
        ],
        orderNum: [
          { min: -99999, max: 99999, message: '排序只能是-99999~99999', trigger: 'blur' }
        ]
      },
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
        })
      } else {
        this.temp = {
          parentId: this.listQuery.parentId,
          show: true,
          orderNum: 0
        }
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
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          if (this.temp.parentId === undefined) {
            this.temp.parentId = this.listQuery.parentId
          }
          apiSave(this.temp).then(res => {
            this.editLoading = false
            this.editShow = false
            if (res.data.code === 0) {
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
      this.listQuery.parentId = this.parentIdStack.pop()
      this.listQuery.parentName = this.parentNameStack.pop()
      this.doQuery()
    }
  },
  mounted () {
    this.initPage()
    this.doQuery()
  }
}
</script>
