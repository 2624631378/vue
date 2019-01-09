import Vue from 'vue'
import 'css/common.css'
import './index.css'

import url from 'js/api.js'
import axios from 'axios'
import swiper from 'components/Swiper'
import foot from 'components/Foot'
import miutuiswipe from 'components/Miutuiswipe'
// import elementswiper from 'components/Elementswiper'
import {
  InfiniteScroll
} from 'mint-ui'

Vue.use(InfiniteScroll)





Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '.container',
  data: {
    swplists: [],
    hotLists: null,
    pageNum: 1,
    pageSize: 6,
    loading: false,
    allload: false


  },
  created() {
    this.getswplists()
    this.gethotLists()


  },
  methods: {
    getswplists() {
      axios.get(url.bannerlists).then(res => {
        this.swplists = res.data.bannerlist

      })

    },
    gethotLists() {
      if (this.allload) return;
      this.loading = true;
      axios.get(url.hotLists, {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {

        let curhotLists = res.data.list

        if (curhotLists.length < this.pageSize) {
          this.allload = true
        } else if (this.hotLists) {
          this.hotLists = this.hotLists.concat(curhotLists)
        } else {
          this.hotLists = curhotLists
        }
        this.loading = false;
        this.pageNum++

      })

    },
  },
  components: {
    swiper,
    foot,
    miutuiswipe,
    // elementswiper
  },

})
