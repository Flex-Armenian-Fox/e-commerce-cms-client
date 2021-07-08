import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router";

const axios = Axios.create({
  baseURL: "http://localhost:3000"
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    isSignIn: false,
    isAdmin: false,
    signInFail: false,
    loading: ""
  },
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload;
      state.products.sort((a, b) => (a["createdAt"] > b["createdAt"] ? -1 : 1));
    },
    SET_IS_SIGNIN(state, payload) {
      state.isSignIn = payload;
    },
    SET_IS_ADMIN(state, payload) {
      state.isAdmin = payload;
    },
    SIGNIN_FAIL(state, payload) {
      state.signInFail = payload;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    signIn(context, payload) {
      axios({
        method: "POST",
        url: "/login",
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(result => {
          console.log(result);
          if (result.data.role == "admin") {
            context.commit("SET_IS_SIGNIN", true);
            context.commit("SET_IS_ADMIN", true);
            context.commit("SIGNIN_FAIL", false);
            localStorage.setItem("access_token", result.data.access_token);
            router.push("/");
          } else {
            context.commit("SIGNIN_FAIL", true);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchData(context) {
      axios({
        method: "GET",
        url: "/products",
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          console.log(result);
          context.commit("SET_PRODUCTS", result.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteProduct(context, id) {
      console.log(context);
      axios({
        method: "DELETE",
        url: "/products/" + id,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          console.log(result);
          context.dispatch("fetchData");
        })
        .catch(err => {
          console.log(err);
        });
    },
    async addProduct(context, payload) {
      const { name, price, stock, category, files } = payload;

      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        if (i < files.length - 1) {
          await axios
            .post("products/upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                access_token: localStorage.access_token
              },
              params: {
                index: i,
                lastImage: false
              }
            })
            .then(result => {
              console.log(result, " ", i);
            })
            .catch(err => {
              console.log(err);
            });
        } else if (i == files.length - 1) {
          await axios
            .post("products/upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                access_token: localStorage.access_token
              },
              params: {
                lastImage: true
              }
            })
            .then(result => {
              console.log(result, "last");
              axios({
                method: "POST",
                url: "/products",
                headers: {
                  access_token: localStorage.access_token
                },
                data: {
                  name,
                  price,
                  stock,
                  image_url: result.data.image_url,
                  category
                }
              })
                .then(result => {
                  console.log(result);
                  context.dispatch("fetchData");
                  context.commit("SET_LOADING", "done");
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    editProduct(context, payload) {
      const { name, price, stock, category, id } = payload;

      axios({
        method: "PUT",
        url: "/products/" + id,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          name,
          price,
          stock,
          category
        }
      })
        .then(result => {
          console.log(result);
          context.dispatch("fetchData");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  getters: {
    filter: state => category => {
      return state.products.filter(el => el.category == category);
    },
    dashboard(state) {
      return state.products
        .sort((a, b) => (a["createdAt"] > b["createdAt"] ? -1 : 1))
        .slice(0, 4);
    }
  }
});
