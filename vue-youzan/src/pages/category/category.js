

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api'
import Foot from "components/Foot.vue"

import './category.css'
import 'css/common.css'

new Vue({
  el: ".category",
  data: {
    navList: null,
    toplists: null,
    ztoplists: null,
    curIndex1: 0


  },
  mounted() {
    this.getNavlist()
    this.getztoplists()
  },
  methods: {
    getNavlist() {
      axios.get(url.navlist).then(res => {
        this.navList = res.data.lists;
      })
    },

    navChange(index,id) {
      this.curIndex1 = index;
      if (id < 0) {
        this.getztoplists()
      } else {
        axios.get(url.toplists,{
            id
        }).then(res => {                      
          this.toplists = res.data.toplists;         
        })
      }
    },

    getztoplists() {
      axios.get(url.ztoplists).then(res => {
        this.ztoplists = res.data.toplists;
      })
    },

  },
  components: {
    Foot
  }
})
