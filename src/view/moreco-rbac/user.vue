<style lang="less">
  @import '../../components/moreco/moreco.less';
</style>
<template>
  <div>
    <Card>
      <Form :label-width="80">
        <Row>
          <Col span="6">
            <FormItem label="用户名">
              <Input type="text" placeholder="用户名"/>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem>
              <Button type="primary" icon="ios-search">搜索</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <div style="margin-top: 20px">
      <Card>
        <p slot="title">#用户列表</p>
        <div class="table-page-footer">
          <Table border stripe :columns="columns7" :data="data6"></Table>
        </div>
        <Page :page-size="10" :current="2" :total="100" size="small" show-sizer></Page>
      </Card>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      value: '',
      columns7: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '用户名',
          key: 'name'
        },
        {
          title: '所属部门',
          key: ''
        },
        {
          title: '邮箱',
          key: 'age'
        },
        {
          title: '手机号',
          key: 'address'
        },
        {
          title: '状态',
          key: 'address'
        },
        {
          title: '创建时间',
          key: 'address'
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
                    this.show(params.index)
                  }
                }
              }, 'View'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, 'Delete')
            ])
          }
        }
      ],
      data6: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park'
        }
      ]
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
      })
    },
    remove (index) {
      this.data6.splice(index, 1)
    }
  }
}
</script>
