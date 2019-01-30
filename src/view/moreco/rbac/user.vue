<style lang="less">
  @import '../../../components/moreco/moreco.less';
</style>
<template>
  <div>
    <div style="margin-top: 20px">
      <Card>
        <p slot="title">#用户管理</p>
        <!--查询-->
        <Row>
          <Form :label-width="60" inline :model="listQuery">
            <FormItem label="用户名">
              <Input v-model="listQuery.username" placeholder="用户名"></Input>
            </FormItem>
            <FormItem label="真实姓名">
              <Input v-model="listQuery.username" placeholder="真实姓名"></Input>
            </FormItem>
            <FormItem label="邮箱">
              <Input v-model="listQuery.email" placeholder="邮箱"></Input>
            </FormItem>
            <FormItem label="电话">
              <Input v-model="listQuery.mobile" placeholder="电话"></Input>
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

    <!--修改-->
    <Modal v-model="editShow" title="编辑用户">
      <Form :label-width="70" ref="editForm" :model="temp" :rules="rules">
        <FormItem label="id" hidden>
          <Input v-model="temp.id"></Input>
        </FormItem>
        <FormItem label="用户名" prop="username">
          <Input v-model="temp.username" :disabled="temp.id !== null && temp.id !== undefined" placeholder="用户名"></Input>
        </FormItem>
        <FormItem label="真实姓名" prop="realName">
          <Input v-model="temp.realName" placeholder="真实姓名"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="temp.email" placeholder="邮箱"></Input>
        </FormItem>
        <FormItem label="电话" prop="mobile">
          <Input v-model="temp.mobile" placeholder="电话"></Input>
        </FormItem>
        <FormItem label="授权角色" prop="roleIds">
          <Select v-model="temp.roleIds" multiple filterable placeholder="请选择角色">
            <Option v-for="item in roles" :value="item.id"  :key="item.key">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="所属部门" hidden>
          <Input v-model="temp.deptId"></Input>
        </FormItem>
        <FormItem label="所属部门" prop="deptId">
          <Tree :data="userDepts" ref="userDeptTree"></Tree>
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
import { apiPage, apiDetail, apiSave } from '@/api/moreco/rbac/user'
import { apiTree as apiDeptTree } from '@/api/moreco/rbac/dept'
import { apiList as apiRoleList } from '@/api/moreco/rbac/role'
export default {
  data () {
    return {
      // 表格列
      columns: [
        {
          title: '用户名',
          key: 'username',
          width: 200,
          fixed: 'left'
        },
        {
          title: '真实姓名',
          key: 'realName'
        },
        {
          title: '所属部门',
          key: 'deptName'
        },
        {
          title: '邮箱',
          key: 'email'
        },
        {
          title: '手机号',
          key: 'mobile'
        },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            return h('div', null, params.row.dataMap.status)
          }
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
          width: 180,
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
              }, '修改')
            ])
          }
        }
      ],
      // 表格查询
      listQuery: {
        currentPage: 1,
        pageSize: 10,

        username: undefined,
        realName: undefined,
        email: undefined,
        mobile: undefined
      },
      // 表格参数
      pageData: [],

      totalCount: 0,
      // 编辑
      editShow: false,
      editLoading: false,
      temp: {},
      rules: {
        username: [
          {required: true, message: '用户名为必填项', trigger: 'blur'},
          {max: 255, message: '用户名最多为255个字符', trigger: 'blur'}
        ],
        realName: [
          {required: true, message: '真实姓名为必填', trigger: 'blur'},
          {max: 255, message: '真实姓名最多为255个字符', trigger: 'blur'}
        ],
        email: [
          {max: 255, message: '邮箱最多为255个字符', trigger: 'blur'}
        ],
        mobile: [
          {max: 255, message: '电话最多为255个字符', trigger: 'blur'}
        ],
        roleIds: [
          {required: true, message: '授权角色为必选', trigger: 'blur'}
        ],
        deptId: [
          {required: true, message: '所属部门为必选', trigger: 'blur'}
        ]
      },
      userDepts: [],
      roles: []
    }
  },
  methods: {
    // 表格查询
    doQuery () {
      apiPage(this.listQuery).then(res => {
        if (res.data.code === 0) {
          this.listQuery.currentPage = res.data.result.currentPage
          this.listQuery.pageSize = res.data.result.pageSize
          this.totalCount = res.data.result.totalCount
          this.pageData = res.data.result.list
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // reset
    resetQuery () {
      this.listQuery = {}
    },
    // 编辑
    openEdit (id) {
      if (id !== null) {
        apiDetail(id).then(res => {
          if (res.data.code === 0) {
            this.temp = res.data.result
          }
        }).then(this.permInit)
      } else {
        this.temp = {}
        this.permInit()
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
        if (valid){
          let depts = this.$refs.userDeptTree.getSelectedNodes()
          if (depts !== null && depts.length > 0) {
            this.temp.deptId = depts[0].id
          }
          apiSave(this.userObj).then(res => {
            if (res.data.code === 0) {
              this.editShow = false
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
    // 授权初始化
    permInit () {
      apiDeptTree().then(res => {
        if (res.data.code === 0) {
          this.userDepts = this.convert2DeptTree(res.data.result)
        }
      })
      apiRoleList().then(res => {
        if (res.data.code === 0) {
          this.roles = res.data.result
        }
      })
    },
    // 转换成树形数据
    convert2DeptTree (depts) {
      let deptTree = []
      for (let i in depts) {
        let item = depts[i]
        let dept = {}
        dept.id = item.id
        dept.title = item.name
        if (this.temp.deptId != null) {
          dept.selected = (this.userObj.deptId === item.id)
          if (dept.selected) {
            dept.expand = true
          }
        }
        if (item.children !== null) {
          dept.children = this.convert2DeptTree(item.children)
        }
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
