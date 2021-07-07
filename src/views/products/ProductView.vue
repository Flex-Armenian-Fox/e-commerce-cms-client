<template>
  <div class="layout">
    <Layout>
      <Sider hide-trigger>
        <Navbar :style="{ height: '100vh' }" />
      </Sider>
      <Layout>
        <Content :style="{ height: '100vh' }">
          <Row :gutter="16" class="custom-row">
            <router-view></router-view>
          </Row>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import Navbar from '@/components/utils/Navbar.vue'

export default {
  name: 'ProductView',
  components: { Navbar }
}
</script>

<style scoped>
  .custom-row {
    background: #eee;
    height:100%;
    overflow:auto;
    white-space:nowrap;
  }
</style>
