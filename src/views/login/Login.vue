<template>
  <Row type="flex" justify="center" align="middle" class="login">
    <Col span="4">
      <Card>
        <p slot="title">
          <Icon type="ios-person"></Icon>
          Administrator Login
        </p>
        <Form ref="formInline" :model="formLogin" :rules="loginRule">
          <FormItem prop="email">
            <Input type="email" v-model="formLogin.email" placeholder="email">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formLogin.password" placeholder="password">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')" long>Sign In</Button>
          </FormItem>
        </Form>
      </Card>
    </Col>
  </Row>
</template>

<script>
export default {
  data () {
    return {
      formLogin: {
        email: '',
        password: ''
      },
      loginRule: {
        email: [
          { required: true, message: 'Please fill in the email', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please fill in the password', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(() => {
        this.$store.dispatch('login', { formLogin: this.formLogin })
      })
    }
  }
}
</script>

<style>
.login {
  height: 100vh;
  background-color: #f8f8f9;
}
</style>
