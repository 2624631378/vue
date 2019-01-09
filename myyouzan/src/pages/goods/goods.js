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
} = qs.parse(location.search.substr(1))



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
    addcarteds:false

  },
  methods: {

    getgoodsdetail() {
      axios.get(url.goodsdetail, {
        id
      }).then(res => {

        console.log(res)
        let curgoodsdetail = res.data.goodsdetail

        curgoodsdetail.img.forEach(item => {

          this.swplists.push({
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
          console.log(res.data.message)

          let self = this
          this.addcartqwewqe = false
          this.showAddMessage = true
          this.addcarteds = true
          setTimeout(function () {
            self.showAddMessage = false //注意回调函数的this问题，解决方案替换this或者用箭头函数
          }, 1000)
        }
      })



    }


  },
  created() {
    this.getgoodsdetail()

  },
  components: {
    swiper

  },
  watch: {
    addcartqwewqe: function (val, oldval) {
      document.body.style.overflow = val ? 'hidden' : 'auto'
      document.body.style.height = val ? '100%' : 'auto'
      document.querySelector('html').style.overflow = val ? 'hidden' : 'auto'
      document.querySelector('html').style.height = val ? '100%' : 'auto'
    }

  }



})
