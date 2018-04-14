<style lang="less">
    @import '../taroco-components/tarcoco.less';
</style>
<template>
    <div>
        <Card>
            <Form :label-width="80">
                <Row>
                    <Col span="6">
                        <FormItem label="哈哈">
                            <Input type="text" placeholder="Username"/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="嘻嘻">
                            <Input type="password" placeholder="Password"/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem>
                            <Button type="primary" icon="ios-search">搜索</Button>
                            <Button >重置</Button>
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
                        title: 'Name',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                    {
                        title: 'Action',
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
                            ]);
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
            };
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                });
            },
            remove (index) {
                this.data6.splice(index, 1);
            }
        }
    };
</script>
