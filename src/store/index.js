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
    products: []
  },
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    }
  },
  actions: {
    fetchData(context) {
      axios({
        method: "GET",
        url: "/products",
        headers: {
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluIiwiaWF0IjoxNjI1MzI5MjczfQ.7ytvi2U-ecdsF65T4jAu5-VG9EeqhZiogCivvfqPQm0"
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
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluIiwiaWF0IjoxNjI1MzI5MjczfQ.7ytvi2U-ecdsF65T4jAu5-VG9EeqhZiogCivvfqPQm0"
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
    addProduct(context, payload) {
      const { name, price, stock, image_url, category, file } = payload;
      const formData = new FormData();
      formData.append("file", file);

      axios
        .post("products/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluIiwiaWF0IjoxNjI1MzI5MjczfQ.7ytvi2U-ecdsF65T4jAu5-VG9EeqhZiogCivvfqPQm0"
          }
        })
        .then(result => {
          console.log(result);
          axios({
            method: "POST",
            url: "/products",
            headers: {
              access_token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluIiwiaWF0IjoxNjI1MzI5MjczfQ.7ytvi2U-ecdsF65T4jAu5-VG9EeqhZiogCivvfqPQm0"
            },
            data: {
              name,
              price,
              stock,
              image_url,
              category,
              path: result.data.path
            }
          })
            .then(result => {
              console.log(result);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    editProduct(context, payload) {
      const { name, price, stock, image_url, category, id } = payload;

      axios({
        method: "PUT",
        url: "/products/" + id,
        headers: {
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluIiwiaWF0IjoxNjI1MzI5MjczfQ.7ytvi2U-ecdsF65T4jAu5-VG9EeqhZiogCivvfqPQm0"
        },
        data: {
          name,
          price,
          stock,
          image_url,
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
