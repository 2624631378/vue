import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import url from 'js/api'
import axios from 'axios'
import Velocity from 'velocity-animate'

new Vue({
  el: '.container',
  data: {
    cartlist: [],
    allchecked: true

  },
  created() {
    this.getCartList()
  },
  computed: {
    totaltotlaPrice() {
      let totlaPrice = 0;
      let goodlenght = 0;
      let checkArr = [];
      this.cartlist.forEach(shop => {
        shop.goodslists.forEach(item => {
          if (item.goodchecked == true && item.deleta == false) {
            let itemtotlaPrice = item.price * item.number;
            totlaPrice += itemtotlaPrice;
            goodlenght++;
            checkArr.push(item)
          }
        })
      });
      return {
        totlaPrice,
        goodlenght,
        checkArr
      };

    }


  },
  methods: {

    getCartList() {

      axios.get(url.cartlist).then(res => {
        let curcartlist = res.data.cartlist;
        curcartlist.forEach(shop => {
          shop.shopchecked = true;
          shop.deleta = false;
          shop.edting = false;
          shop.edtingtext = '编辑';
          shop.goodslists.forEach(item => {
            item.goodchecked = true;
            item.deleta = false
          })
        });
        this.cartlist = curcartlist;
      })
    },

    shopchecked(shop) {
      shop.shopchecked = !shop.shopchecked;
      shop.goodslists.forEach(item => {
        item.goodchecked = shop.shopchecked;
      })
      this.allchecked = this.cartlist.every(list => {
        return list.shopchecked
      })
    },

    goodchecked(list, shop) {
      list.goodchecked = !list.goodchecked;
      shop.shopchecked = shop.goodslists.every(item => {
        return item.goodchecked == true;
      })
      this.allchecked = this.cartlist.every(list => {
        return list.shopchecked
      })
    },

    allcheck() {
      this.allchecked = !this.allchecked;
      this.cartlist.forEach(shop => {
        shop.shopchecked = this.allchecked;
        shop.goodslists.forEach(item => {
          item.goodchecked = this.allchecked;
        })
      });
    },

    edting(shop) {
      // shop.edting = true;
      if (shop.edting) {
        shop.edting = !shop.edting;
        shop.shopchecked = true;
        shop.goodslists.forEach(item => {
          item.goodchecked = true;
        });
      } else {
        shop.edting = !shop.edting;
        shop.shopchecked = false;
        shop.goodslists.forEach(item => {
          item.goodchecked = false;
        });
      }
      shop.edtingtext = shop.edting ? '完成' : '编辑';
      this.allchecked = this.cartlist.every(list => {
        return list.shopchecked
      })
    },

    addNum(i, list) {
      if (i < 0 && list.number <= 1) return;
      list.number += i;
    },

    postgood(arr) {
      console.log(arr)
    },

    deletelist(list, shop) {
      list.deleta = true;
      shop.deleta = shop.goodslists.every(item => {
        return item.deleta == true
      })
    },


    start(e, list) {
      list.startX = e.changedTouches[0].clientX

    },

    end(e, list, listIndex,shopIndex) {
      let endX = e.changedTouches[0].clientX;
      let left = '0';
      if (list.startX - endX > 100) {
        left = "-60px"
      }

      if (endX - list.startX < 100) {
        left = "0px"
      }
      Velocity(this.$refs['goods-${shopIndex}-${listIndex}'], {
        left
      })
      console.log(list.startX,endX);
      




    }


  }
})
