import 'css/common.css'
import './search.css'
import Vue from 'vue'
import url from 'js/api.js'
import axios from 'axios'
import {
  InfiniteScroll
} from 'mint-ui'
import qs from 'qs'
Vue.use(InfiniteScroll)


new Vue({
  el: "#searchpages",
  data: {
    searchlists: null,
    id: '12',
    name: '12',
    pageNum: 1,
    pageSize: 6,
    loading: false,
    allload: false,
    isshow: false

  },
  created() {
    this.getsearchlists()
    // this.id = this.getUrlKey("id");
    // this.name = this.getUrlKey("name");
  },
  methods: {
    // getUrlKey(name) {
    //   return (
    //     decodeURIComponent(
    //       (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
    //         location.href
    //       ) || [, ""])[1].replace(/\+/g, "%20")
    //     ) || null
    //   );
    // },
    getsearchlists() {
      if (this.allload) return;
      this.loading = true;
      axios.get(url.searchlists, {
        id: this.id,
        name: this.name,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        console.log(res)
        let curhotLists = res.data.searchlists
        if (curhotLists.length < this.pageSize) {
          this.allload = true
        } else if (this.searchlists) {
          this.searchlists = this.searchlists.concat(curhotLists)
        } else {
          this.searchlists = curhotLists
        }
      })
      this.loading = false
      this.pageNum++
    },

    move() {         
      if (document.body.scrollTop > 30) {
        this.isshow = true
      } else {
        this.isshow = false
      }
    }

  }
})
