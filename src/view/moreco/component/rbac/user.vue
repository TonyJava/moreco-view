<style lang="less">
  @import '../../../../components/moreco/moreco.less';
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
              <Input v-model="listQuery.realName" placeholder="真实姓名"></Input>
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
import { apiPage, apiDetail, apiSave, apiChangeStatus, apiResetPassword } from '@/api/moreco/component/rbac/user'
import { apiTree as apiDeptTree } from '@/api/moreco/component/rbac/dept'
import { apiList as apiRoleList } from '@/api/moreco/component/rbac/role'
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
          key: 'deptName',
          render: (h, params) => {
            return h('div', null, params.row.dataMap.deptName)
          }
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
            let color = null
            switch (params.row.status) {
              case 0:
                color = 'error'
                break
              case 1:
                color = 'success'
                break
              case 2:
                color = 'warning'
                break
              default:
                color = 'default'
                break
            }
            return h('Tag', {
              props: {
                color: color
              }
            }, params.row.dataMap.status)
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
                  type: 'error',
                  size: 'small',
                  disabled: params.row.status === 0
                },
                style: {
                  marginRight: '5px',
                  marginTop: '5px'
                },
                on: {
                  click: () => {
                    this.changeEnableStatus(params.row.id, 0)
                  }
                }
              }, '禁用'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small',
                  disabled: params.row.status === 1
                },
                style: {
                  marginRight: '5px',
                  marginTop: '5px'
                },
                on: {
                  click: () => {
                    this.changeEnableStatus(params.row.id, 1)
                  }
                }
              }, '启用'),
              h('br'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  icon: 'md-lock',
                  disabled: params.row.status === 2
                },
                style: {
                  marginRight: '5px',
                  marginTop: '5px'
                },
                on: {
                  click: () => {
                    this.changeLockStatus(params.row.id, 2)
                  }
                }
              }, '锁定'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small',
                  icon: 'md-unlock',
                  disabled: params.row.status === 1
                },
                style: {
                  marginRight: '5px',
                  marginTop: '5px'
                },
                on: {
                  click: () => {
                    this.changeLockStatus(params.row.id, 1)
                  }
                }
              }, '解锁'),
              h('br'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small',
                  icon: 'md-refresh'
                },
                style: {
                  marginRight: '5px',
                  marginTop: '5px'
                },
                on: {
                  click: () => {
                    this.resetPassword(params.row.id)
                  }
                }
              }, '重置密码'),
              h('br'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  marginTop: '5px'
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
          { required: true, message: '用户名为必填项', trigger: 'blur' },
          { max: 255, message: '用户名最多为255个字符', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '真实姓名为必填', trigger: 'blur' },
          { max: 255, message: '真实姓名最多为255个字符', trigger: 'blur' }
        ],
        email: [
          { max: 255, message: '邮箱最多为255个字符', trigger: 'blur' }
        ],
        mobile: [
          { max: 255, message: '电话最多为255个字符', trigger: 'blur' }
        ]
        // roleIds: [
        //   {required: true, message: '授权角色为必选', trigger: 'blur'}
        // ],
        // deptId: [
        //   {required: true, message: '所属部门为必选', trigger: 'blur'}
        // ]
      },
      userDepts: [],
      roles: []
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
      }).catch(err => {
        console.log(err)
      })
    },
    // 编辑
    openEdit (id) {
      if (id !== null) {
        apiDetail(id).then(res => {
          this.temp = res
          this.temp.roleIds = this.temp.dataMap.roleIds
          this.temp.deptId = this.temp.dataMap.deptId
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
        if (valid) {
          let depts = this.$refs.userDeptTree.getSelectedNodes()
          if (depts !== null && depts.length > 0) {
            this.temp.deptId = depts[0].id
          }
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
    },
    // 授权初始化
    permInit () {
      apiDeptTree().then(res => {
        this.userDepts = this.convert2DeptTree(res)
      })
      apiRoleList().then(res => {
        this.roles = res
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
          dept.selected = (this.temp.deptId === item.id)
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
    },
    // 禁用、启用
    changeEnableStatus (userId, targetStatus) {
      let title
      let content
      let msg
      switch (targetStatus) {
        case 0:
          title = '禁用账户'
          content = '确认禁用该账户？'
          msg = '禁用账户成功'
          break
        case 1:
          title = '启用账户'
          content = '确认启用该账户？'
          msg = '启用账户成功'
          break
      }
      this.$Modal.confirm({
        title: title,
        content: content,
        loading: true,
        onOk: () => {
          apiChangeStatus(userId, targetStatus).then(res => {
            this.$Modal.remove()
            this.$Message.info(msg)
          })
        }
      })
    },
    // 锁定、解锁
    changeLockStatus (userId, targetStatus) {
      let title
      let content
      let msg
      switch (targetStatus) {
        case 1:
          title = '解锁账户'
          content = '确认解锁该账户？'
          msg = '解锁账户成功'
          break
        case 2:
          title = '锁定账户'
          content = '确认锁定该账户？'
          msg = '锁定账户成功'
          break
      }
      this.$Modal.confirm({
        title: title,
        content: content,
        loading: true,
        onOk: () => {
          apiChangeStatus(userId, targetStatus).then(res => {
            this.$Modal.remove()
            this.$Message.info(msg)
          })
        }
      })
    },
    // 重置密码
    resetPassword (userId) {
      this.$Modal.confirm({
        title: '重置密码',
        content: '确认重置该用户的密码？',
        loading: true,
        onOk: () => {
          apiResetPassword(userId).then(res => {
            this.$Modal.remove()
            this.$Message.info('重置密码成功')
          })
        }
      })
    }
  },
  mounted () {
    this.doQuery()
  }
}
</script>
