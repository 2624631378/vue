import Vue from 'vue'
import Vuex from 'vuex'
import url from "js/api.js"
import axios from "axios"
Vue.use(Vuex)

const state = {
  addresslists: null
};

const mutations = {
  getaddresslists(state, addresslists) {
    state.addresslists = addresslists
  },

  add(state, instace) {
    state.addresslists.push(instace)
  },

  remove(state, addrId) {
    let lists = state.addresslists

    let index = lists.findIndex(item => {
       return item.addrId == addrId
      
    })
    lists.splice(index, 1)
  },
  updatalist(state,instace){
    let lists = JSON.parse(JSON.stringify(state.addresslists))  //注意此处深复制，保持数据的独立，否则更新数据的时候无法监听到数据的变化
    let index = lists.findIndex(item =>{
      return  item.addrId == instace.addrId
    })

    lists[index] = instace
    state.addresslists = lists        //重新赋值数组，传递数据
       
  },

  defalufset(state,addrId){
    let lists = state.addresslists
    lists.forEach(item => {
    item.is_default = item.addrId == addrId ? true:false
    
  });
  }

};

const actions = {
  getaddresslistsaction({
    commit
  }) {
    axios.get(url.addresslists).then(res => {
      commit('getaddresslists', res.data.data)
    });
  },

  addaction({
    commit
  }, instace) {
    axios.get(url.addaddress, {
      instace
    }).then(res => {
      instace.addrId = parseInt(Math.random()*10000)
      commit('add', instace)
    });
  },

  removeaction({
    commit
  }, addrId) {
    axios.get(url.deladress,{addrId}).then(res => {
      commit('remove', addrId)
    });
  },

  updatalistaction({commit},instace){
     axios.get(url.addresssave,{instace}).then(res =>{

      commit('updatalist',instace)
     })
  
  },

  defalufsetaction({commit},addrId){
    axios.get(url.updataaddress,{addrId}).then(res =>{
      commit('defalufset', addrId)
    })
  }

}


const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
