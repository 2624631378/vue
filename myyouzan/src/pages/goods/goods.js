import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_fade.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api'
import swiper from 'components/Swiper'
import qs from 'qs'


// let data = qs.parse(location.href.split('?')[1])
let {
  id
} = qs.parse(location.search.substr(1))   //利用qs获取url中的id值   qs.parse将url解析成对象形式
                                          // location.search是从当前URL的?号开始的字符串         substr指定位置截取， substr(1) 去除 ？ 



console.log(id + '-20190107')

new Vue({
  el: '.goodscontainer',
  data: {
    id,
    goodsdetail: {},
    swplists: [],
    curindex: 0,
    stnumber: 1,
    addcartqwewqe: false,
    showAddMessage: false,
    typenum: 0,
    addcarteds: false

  },

  created() {
    this.getgoodsdetail()
  },

  methods: {
    getgoodsdetail() {
      axios.get(url.goodsdetail, {
        id
      }).then(res => {
        let curgoodsdetail = res.data.goodsdetail
        curgoodsdetail.img.forEach(item => {
          this.swplists.push({        // 复用轮播组件，保持数据结构一致，则遍历所有项，添加link
            link: '',
            img: item.src
          })
        });
        this.goodsdetail = curgoodsdetail
      })
    },

    tablechage(index) {
      this.curindex = index
    },

    addcartse(i) {
      this.addcartqwewqe = true
      this.typenum = i
    },

    addnumber() {
      this.stnumber++
    },

    descnumber() {
      if (this.stnumber === 1) return;
      this.stnumber--
    },

    addcartst() {
      axios.get(url.addcart, {
        id,
        number: this.stnumber
      }).then(res => {
        if (res.data.statue === 200) {
          let self = this
          this.addcartqwewqe = false
          this.showAddMessage = true
          this.addcarteds = true
          setTimeout(function () {
            self.showAddMessage = false //注意回调函数的this问题，解决方案替换this或者用箭头函数
          }, 1000)
        }
      })
    },

  },

  components: {
    swiper
  },
  watch: {           // 监听属性，监听addcartqwewqe的变化，改变页面属性，保证下拉只是，导航定位在底部
    addcartqwewqe: function (val, oldval) {
      document.body.style.overflow = val ? 'hidden' : 'auto'
      document.body.style.height = val ? '100%' : 'auto'
      document.querySelector('html').style.overflow = val ? 'hidden' : 'auto'
      document.querySelector('html').style.height = val ? '100%' : 'auto'
    }

  }



})
