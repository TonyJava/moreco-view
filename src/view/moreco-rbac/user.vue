<style lang="less">
  @import '../../components/moreco/moreco.less';
</style>
<template>
  <div>
    <Card>
      <Form :model="queryObj" :label-width="80" class="query-form">
        <Row>
          <Col span="8">
            <FormItem label="用户名">
              <Input v-model="queryObj.username" placeholder="请输入用户名"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="真实姓名">
              <Input v-model="queryObj.realName" placeholder="请输入真实姓名"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="邮箱">
              <Input v-model="queryObj.email" placeholder="请输入邮箱"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="电话">
              <Input v-model="queryObj.mobile" placeholder="请输入电话"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div class="query-btns">
        <Button type="primary" icon="md-search" @click="doQuery">查询</Button>
        <Button icon="md-refresh" @click="resetQuery">重置</Button>
      </div>
    </Card>
    <div style="margin-top: 20px">
      <Card>
        <Button type="primary" icon="md-add" @click="openEdit(null)">新增</Button>
      </Card>
      <!--表格-->
      <Card>
        <p slot="title">#用户列表</p>
        <div class="moreco-table">
          <Table border stripe :columns="columns" :data="pageData"></Table>
        </div>
        <Page :current="currPage" :page-size="pageSize" :total="totalCount" size="small" show-sizer></Page>
      </Card>
    </div>
    <!--修改-->
    <Modal v-model="editShow" title="编辑用户">
      <Form :model="userObj" :label-width="60">
        <FormItem label="id" hidden>
          <Input v-model="userObj.id"></Input>
        </FormItem>
        <FormItem label="用户名">
          <Input v-model="userObj.username" :disabled="userObj.id !== null && userObj.id !== undefined" placeholder="请输入用户名"></Input>
        </FormItem>
        <FormItem label="真实姓名">
          <Input v-model="userObj.realName" placeholder="请输入真实姓名"></Input>
        </FormItem>
        <FormItem label="邮箱">
          <Input v-model="userObj.email" placeholder="请输入邮箱"></Input>
        </FormItem>
        <FormItem label="电话">
          <Input v-model="userObj.mobile" placeholder="请输入电话"></Input>
        </FormItem>
        <FormItem label="授权角色">
          <Select v-model="userObj.roleIds" multiple filterable placeholder="请选择角色">
            <Option v-for="item in roles" :value="item.id"  :key="item.key">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="所属部门" hidden>
          <Input v-model="userObj.deptId"></Input>
        </FormItem>
        <FormItem label="所属部门">
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
import { apiPage, apiDetail, apiSave } from '@/api/moreco-rbac/user'
import { apiTree as apiDeptTree } from '@/api/moreco-rbac/dept'
import { apiList as apiRoleList } from '@/api/moreco-rbac/role'
export default {
  data () {
    return {
      // 表格列
      columns: [
        {
          title: '用户名',
          key: 'username',
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
      userObj: {},
      userDepts: [],
      roles: []
    }
  },
  methods: {
    // 表格查询
    doQuery () {
      apiPage(this.currPage, this.queryObj).then(res => {
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
    // reset
    resetQuery () {
      this.queryObj = {}
    },
    // 编辑
    openEdit (id) {
      if (id !== null) {
        apiDetail(id).then(res => {
          if (res.data.code === 0) {
            this.userObj = res.data.result
          }
        }).then(this.permInit)
      } else {
        this.userObj = {}
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
      let depts = this.$refs.userDeptTree.getSelectedNodes()
      if (depts !== null && depts.length > 0) {
        this.userObj.deptId = depts[0].id
      }
      apiSave(this.userObj).then(res => {
        if (res.data.code === 0) {
          this.editShow = false
          this.doQuery()
        }
      }).finally(() => {
        this.editLoading = false
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
        if (this.userObj.deptId != null) {
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
