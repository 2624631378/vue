import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
Vue.use(Vuex)
const store = new Vuex.Store({

  state: {
    bloglists:[],
  },
  mutations: {
    getbloglists(state, bloglists) {
      state.bloglists = bloglists
    },
    delblog(state, id) {
      let list = state.bloglists
      console.log(list)
      let index = list.findIndex(item => {
        return item.id === id;
      });

      list.splice(index, 1)

      console.log(list)
      // state.bloglists = list
    }
  },
  actions: {
    getbloglistsaction({
      commit
    }) {
      axios
        .get("/posts.json")
        .then(res => {
          let _bloglists = res.data;
          let bloglists1 = [];
          for (let key in _bloglists) {
            _bloglists[key].id = key;
            bloglists1.push(_bloglists[key]);
           
          }

          commit('getbloglists', bloglists1)
        });
    },

    delblogaction({
      commit
    }, id) {
      axios
        .get("/posts.json")
        .then(res => {
          commit('delblog', id)
        })
    }
  },


})

export default store
