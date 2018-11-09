<style lang="less">
  @import '../../components/moreco-components/moreco.less';
</style>
<template>
  <div>
    <div style="margin-top: 20px">
      <Card>
        <Button type="primary" icon="ios-search">新增</Button>
      </Card>
      <Card>
        <p slot="title">#目录列表</p>
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
                    this.show(params.index)
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
                    this.remove(params.index)
                  }
                }
              }, '删除')
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
