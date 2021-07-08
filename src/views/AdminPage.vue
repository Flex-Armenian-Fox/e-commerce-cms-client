<template>
    <div class="container-fluid">
      <div class="row flex-nowrap">
          <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
              <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                  <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                      <br><br><br>
                      <li class="nav-item">
                          <a href="#" class="nav-link align-middle px-0">
                              <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Dashboard</span>
                          </a>
                      </li>
                      <li>
                          <a data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                              <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Master Data</span> </a>
                          <ul class="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                              <li class="w-100">
                                  <router-link to="/categories">Categories</router-link>
                              </li>
                              <li>
                                  <router-link to="/products">Products</router-link>
                              </li>
                          </ul>
                      </li>
                      <li>
                          <a class="nav-link px-0 align-middle">
                              <router-link to="/orders/new">New Orders</router-link></a>
                      </li>
                      <li>
                          <a class="nav-link px-0 align-middle">
                              <router-link to="/orders/process">Orders On Process</router-link></a>
                      </li>
                      <li>
                          <a class="nav-link px-0 align-middle">
                              <router-link to="/orders/done">Orders Done</router-link></a>
                      </li>
                      <li>
                          <a class="nav-link px-0 align-middle">
                              <router-link to="/customers">Customers</router-link></a>
                      </li>
                  </ul>
                  <hr>
              </div>
          </div>
          <div class="col py-3">
              <router-view />
          </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'AdminPage',
  component: {},
  methods: {}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
