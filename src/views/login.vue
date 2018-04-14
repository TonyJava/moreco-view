<style lang="less">
    @import './login.less';
</style>

<template>

    <div class="login">
        <div class="login-wrapper">
            <div class="login-box">
                <h1>TAROCO后台系统</h1>
                <h3>EDA DDD 微服务架构设计</h3>
                <div style="margin-top: 50px">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend"><Icon :size="16" type="person"></Icon></span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend"><Icon :size="14" type="locked"></Icon></span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';

    export default {
        data() {
            return {
                form: {
                    userName: 'taroco',
                    password: ''
                },
                rules: {
                    userName: [
                        {required: true, message: '账号不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            handleSubmit() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        Cookies.set('user', this.form.userName);
                        Cookies.set('password', this.form.password);
                        this.$store.commit('setAvator', 'https://avatars0.githubusercontent.com/u/23130993?s=460&v=4');
                        if (this.form.userName === 'taroco') {
                            Cookies.set('access', 0);
                        } else {
                            Cookies.set('access', 1);
                        }
                        this.$router.push({
                            name: 'home_index'
                        });
                    }
                });
            }
        }
    };
</script>

<style>

</style>
