import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'

import Vue from 'vue'
import url from 'js/api'
import axios from 'axios'
import swiper from 'components/swiper'

new Vue({
  el: '.goods',
  data: {
    detailes: null,
    swplists: [],
    tableindex: 0,
    goucen: false,
    addx: false,
    addy: false,
    righticon: false,
    cur: false,
    goodsNum: 1

  },
  created() {
    this.getGoodsDetail()
  },
  methods: {

    getGoodsDetail(id) {
      axios.get(url.goodsdetail, {
        id
      }).then(res => {

        let curdetailes = res.data.goodsdetail
        curdetailes.img.forEach(element => {
          this.swplists.push({
            link: ' ',
            img: element.src
          })
        });
        this.detailes = curdetailes;
      })
    },

    tableChange(index) {
      this.tableindex = index;
    },

    addcart(boo) {
      this.goucen = !this.goucen;
      if (boo == 1) {
        this.addx = !this.addx;
      } else if (boo == 2) {
        this.addy = !this.addy;
      } else if (boo == 3) {
        this.addx = false;
        this.addy = false;
      } else if (boo == 4) {
        this.goucen = false;
        this.addx = false;
        this.cur = !this.cur;
        this.righticon = true;
        setTimeout(() => {
          this.cur = !this.cur;
        
        }, 2000);

      }
    },

    addNum(i) {
      if (i < 0 && this.goodsNum <= 1) return;
      this.goodsNum += i;
    }

  },
  watch: {
    goucen:function (val,oldVal) {
      console.log(val,oldVal);
      document.body.style.overflow = val? 'hidden':'auto';
      document.body.style.height = val? '100%':'auto';
      document.querySelector('html').style.overflow = val ? 'hidden' : 'auto'
      document.querySelector('html').style.height = val ? '100%' : 'auto'


    }

  },
  components: {
    swiper
  }
})
