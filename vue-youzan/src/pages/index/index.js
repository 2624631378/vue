import 'css/common.css'
import './index.css'
import Vue from "vue"
import axios from 'axios'
import url from 'js/api.js'

import {
  InfiniteScroll
} from 'mint-ui'
Vue.use(InfiniteScroll);

import Foot from "components/Foot.vue"
import swiper from "components/swiper.vue"

new Vue({
  el: '#app',
  data: {
    hotLists: null,
    swiperList:[],
    pageNum: 1,
    pageSize: 6,
    loading: false,
    allLoading: false,
    msg:"Wellcom the vue world, you are best,so all will better best wish to you have a nice shopping  "


  },
  created() {
    this.getList()
  },
  methods: {

    getList() {
      if(this.allLoading) return;
      this.loading = true;
      axios.get(url.hotLists, {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
    
        this.swiperList =res.data.wrapper;        
        let curList = res.data.list;
        let listLength = curList.length;
        if (listLength < this.pageSize) {
          this.allLoading = true;
        }
        if (this.hotLists) {
          this.hotLists = this.hotLists.concat(curList)
        } else {
          this.hotLists = curList;
        }

      })
      this.pageNum++;
      this.loading = false;
    }

  },
  components:{
    Foot,
    swiper
  }
})
