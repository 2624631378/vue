import 'css/common.css'
import './category.css'
import Vue from 'vue'
import url from 'js/api.js'
import axios from 'axios'

import foot from 'components/Foot'

new Vue({
  el: ".categorypage",
  data: {

    categorynavlist: null,
    curindex: 0,
    topindex:-1,
    caregorytoplists:null,
    ztoplists:null
    

  },
  created() {
    this.getcategorynavlist()
    this.getztoplists()

  },
  methods: {
    getcategorynavlist() {
      axios.get(url.categorynavlists).then(res => {
        this.categorynavlist =res.data.lists
      })
    },
    changelist(index,id){
        this.curindex = index
        this.topindex = id
        if(this.topindex>0){
            axios.get(url.caregorytoplists,{id}).then(res=>{
             this.caregorytoplists = res.data.toplists               
            })
        }else{
            this.getztoplists()
        } 
    },

    getztoplists(){
        axios.get(url.ztoplists).then(res=>{
            this.ztoplists = res.data.toplists              
           })       
    },

    tosearch(list){
      // location.href = `search.html?keyword=${list.title}&id=${list.id}`
      // location.href = `index.html?index=${list.id}`;
      location.href=`search.html?id=${list.id}&name=${list.title}`

    }
  },

  components: {
    foot,

  }


})
