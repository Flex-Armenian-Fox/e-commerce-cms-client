<template>
  <Menu :theme="navbarTheme" active-name="1-2" :open-names="['1']">
    <MenuGroup title="Administrator Menu"></MenuGroup>
    <Submenu name="1">
      <template slot="title">
        <div class="custom-icon-align">
         <Icon type="ios-basket"/>
        </div>
        <div>
          <p class="custom-text-align">Manage Products</p>
        </div>
      </template>
      <MenuItem name="1-1">
        <Icon type="md-add"/>
        <router-link to="/addproduct">Add Product</router-link>
      </MenuItem>
      <MenuItem name="1-2">
       <Icon type="ios-list-box-outline"/>
       <router-link to="/products">List Product</router-link>
      </MenuItem>
    </Submenu>
    <Submenu name="2">
      <template slot="title">
        <div class="custom-icon-align">
         <Icon type="md-pricetag"/>
        </div>
        <div>
          <p class="custom-text-align">Manage Categories</p>
        </div>
      </template>
      <MenuItem name="2-1">
        <Icon type="md-add"/>Add Categories
      </MenuItem>
      <MenuItem name="2-2">
       <Icon type="ios-list-box-outline"/>List Categories
      </MenuItem>
    </Submenu>
    <Submenu name="3">
      <template slot="title">
        <div class="custom-icon-align">
          <Icon type="md-person"/>
        </div>
        <div>
          <p class="custom-text-align">Manage User</p>
        </div>
      </template>
      <MenuItem name="3-1">
       <Icon type="md-exit"/> <a href="#" @click.prevent="signOut">Signout</a>
      </MenuItem>
    </Submenu>
  </Menu>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      navbarTheme: 'light',
      isCollapsed: false
    }
  },
  methods: {
    signOut () {
      this.$Message.success('Admin Logged Out')
      localStorage.clear()
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>
  .custom-icon-align {
    float: left;
  }
  .custom-text-align {
    text-align: left;
    margin-left: 3vw;
  }
</style>
