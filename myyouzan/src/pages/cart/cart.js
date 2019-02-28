import './cart_base.css'
import './cart_trade.css'
import './cart.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

new Vue({
  el: ".container",
  data: {
    cartlists: null,
    allchecked: true,
    total: 0
  },
  computed: {
    getallgoods() {
      if (this.cartlists && this.cartlists.length !== 0) {
        let arr = []
        let total = 0
        this.cartlists.forEach(shop => {
          shop.goodslists.forEach(good => {
            if (good.checked) {
              arr.push(good)
              total += good.number * good.price
            }
          })
        });
        this.total = total
        return arr
      }
    }
  },
  created() {
    this.getcartlists()
  },

  methods: {
    getcartlists() {
      axios.get(url.cartlist).then(res => {
        let lists = res.data.cartlist
        lists.forEach(shop => {
          shop.checked = true   // 添加属性，默认设置为全部选中
          shop.removechecked = false      // 删除选中属性不可用
          shop.edited = false
          shop.editedtext = '编辑'
          shop.goodslists.forEach(good => {
            good.checked = true
          })
        });
        this.cartlists = lists
      })
    },
    goodschecked(list, item) {
      item.checked = !item.checked
      list.checked = list.goodslists.every(item => {
        return item.checked
      })
      this.allchecked = this.cartlists.every(list => {
        return list.checked
      })

    },

    shopschecked(list) {
      list.checked = !list.checked
      list.goodslists.forEach(good => {
        good.checked = list.checked
      })
      this.allchecked = this.cartlists.every(list => {
        return list.checked
      })

    },
    allcheck() {
      this.allchecked = !this.allchecked
      this.cartlists.forEach(shop => {
        shop.checked = this.allchecked
        shop.goodslists.forEach(good => {
          good.checked = this.allchecked
        })
      });
    },
    editedshop(list, shopindex) {
      list.edited = !list.edited
      list.editedtext = list.edited ? '完成' : '编辑'
      this.cartlists.forEach((item, i) => {
        if (shopindex != i) {
          item.edited = false
          item.editedtext = list.edited ? '' : '编辑'
        }
      })


    },
    addnumber(item, i) {
      if (i < 0) {
        if (item.number === 1) return
      }
      item.number += Number(i)
    },
  },

})
