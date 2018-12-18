import './index.css'
import 'css/common.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

new Vue({

  el: '.vue-el',
  data: {
    bannerlists: null,


  },
  created: function () {

    this.getbannerlists()
  },
  methods: {
    getbannerlists() {

      axios.get(url.bannerlists).then(res => {
        this.bannerlists = res.data.list
        console.log(this.bannerlists);
      })
    },
  }

})
