<style lang="less">
  @import '../../../../components/moreco/moreco.less';
</style>
<template>
  <div>
    <div style="margin-top: 20px">
      <Card>
        <p slot="title">#资源管理</p>
        <!--查询-->
        <Row>
          <Form :label-width="60" inline :model="listQuery">
            <FormItem label="资源名称">
              <Input type="text" v-model="listQuery.name" placeholder="资源名称">
              </Input>
            </FormItem>
            <FormItem label="路径">
              <Input type="text" v-model="listQuery.path" placeholder="路径">
              </Input>
            </FormItem>
            <FormItem label="标签">
              <Input type="text" v-model="listQuery.tag" placeholder="标签">
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
    <!--资源-->
    <Modal v-model="editShow" title="编辑资源">
      <Form :label-width="70" ref="editForm" :model="temp" :rules="rules">
        <FormItem label="id" hidden>
          <Input v-model="temp.id"></Input>
        </FormItem>
        <FormItem label="名称" prop="name">
          <Input v-model="temp.name" placeholder="名称"></Input>
        </FormItem>
        <FormItem label="路径" prop="path">
          <Input v-model="temp.path" placeholder="路径"></Input>
        </FormItem>
        <!--<FormItem label="请求方法" prop="method">-->
          <!--<Input v-model="temp.method" placeholder="请输入请求方法"></Input>-->
        <!--</FormItem>-->
        <FormItem label="标签" prop="tag">
          <Input v-model="temp.tag" placeholder="标签"></Input>
        </FormItem>
        <FormItem label="备注" prop="remark">
          <Input v-model="temp.remark" placeholder="备注"></Input>
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
import { apiPage, apiDetail, apiSave, apiDelete } from '@/api/moreco/component/rbac/resource'

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
          title: '路径',
          key: 'path'
        },
        {
          title: '标签',
          key: 'tag'
        },
        {
          title: '备注',
          key: 'remark'
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
        name: undefined,
        path: undefined
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
        path: [
          { required: true, message: '路径为必填项', trigger: 'blur' },
          { max: 255, message: '路径最多为255个字符', trigger: 'blur' }
        ],
        // method: [
        //   {required: true, message: '请求方法为必填项', trigger: 'blur'}
        // ],
        tag: [
          { required: true, message: '标签为必填项', trigger: 'blur' },
          { max: 255, message: '标签最多为255个字符', trigger: 'blur' }
        ],
        remark: [
          { max: 255, message: '备注最多为255个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 表格查询
    doQuery () {
      apiPage(this.listQuery).then(res => {
        this.listQuery.currentPage = res.currentPage
        this.listQuery.pageSize = res.pageSize
        this.totalCount = res.totalCount
        this.pageData = res.list
      })
    },
    // 打开编辑
    openEdit (id) {
      if (id !== null) {
        apiDetail(id).then(res => {
          this.temp = res
        })
      } else {
        this.temp = {}
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
        this.doQuery()
      })
    },
    // 保存
    save () {
      this.editLoading = true
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          apiSave(this.temp).then(res => {
            this.editShow = false
            this.doQuery()
          }).finally(() => {
            this.editLoading = false
          })
        } else {
          this.editLoading = false
        }
      })
    }
  },
  mounted () {
    this.doQuery()
  }
}
</script>
