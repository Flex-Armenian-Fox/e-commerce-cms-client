<template>
  <Menu :theme="navbarTheme" :open-names="['1','2','3']">
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
      <MenuItem name="1-1" style="padding-left:2em">
        <Icon type="md-add"/>
        <a class="link" href="#" @click.prevent="navigateMenu('addproduct')">
          Add Product
        </a>
      </MenuItem>
      <MenuItem name="1-2" style="padding-left:2em">
        <Icon type="ios-list-box-outline"/>
        <a class="link" href="#" @click.prevent="navigateMenu('products')">List Product</a>
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
        <Icon type="md-add"/>
        <a class="link" href="#" @click.prevent="navigateMenu('addcategory')">Add Categories</a>
      </MenuItem>
      <MenuItem name="2-2">
       <Icon type="ios-list-box-outline"/>
       <a class="link" href="#" @click.prevent="navigateMenu('category')">List Categories</a>
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
      <MenuItem name="3-1" style="padding-left:0.5em">
       <Icon type="md-exit"/>
       <a class="link" href="#" @click.prevent="signOut">Signout</a>
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
      isCollapsed: false,
      activeName: '',
      activeSubMenu: []
    }
  },
  methods: {
    signOut () {
      this.$Message.success('Admin Logged Out')
      localStorage.clear()
      this.$router.push({ name: 'Login' })
    },
    navigateMenu (location) {
      switch (location) {
        case 'products':
          this.$router.push(`/${location}`).catch(() => {})
          break
        case 'category':
          this.$router.push(`/${location}`).catch(() => {})
          break
        case 'addproduct':
          this.$router.push(`/${location}`).catch(() => {})
          break
        case 'addcategory':
          this.$router.push(`/${location}`).catch(() => {})
          break
        default:
          break
      }
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
  .link {
    text-decoration: none;
    background-color: none;
    color: royalblue;
  }
</style>
