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
        this.swplists = res.data.bannerlist    // 赋值数据

      })

    },
    gethotLists() {
      if (this.allload) return;  // 如果全部加载完毕，则不再请求数据
      this.loading = true;       // 页面显示加载图标
      axios.get(url.hotLists, {  
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {

        let curhotLists = res.data.list

        if (curhotLists.length < this.pageSize) {   // 如果当前页数据长度小于pagesize，则判定所有数据加载完毕
          this.allload = true                       
        } else if (this.hotLists) {                 // 如果已经存在数据，则将新请求的数据追加到原数组中
          this.hotLists = this.hotLists.concat(curhotLists)
        } else {
          this.hotLists = curhotLists               // 如果不存在数据，则将请求的数据赋值给数组
        }
        this.loading = false;                       
        this.pageNum++                              // 加载下一页，页码递增

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
