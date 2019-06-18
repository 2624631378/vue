
<template>
  <div class="container" style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block">
      <a
        class="block-item js-address-item address-item"
        v-for="(list,index) in addressList"
        :key="index"
        @click="toedit(list)"
        :class="{'address-item-default':list.is_default}"
      >
        <div class="address-title">{{list.consignee}} {{list.tel}}</div>
        <p>{{list.province}}{{list.city}}{{list.district}}{{list.address}}</p>
      </a>
    </div>
    <div class="block stick-bottom-row center">
       <router-link :to="{name:'addressAdd'}" class="btn btn-blue js-no-webview-block js-add-address-btn"> 新增地址 </router-link>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import url from "js/api";
export default {
  name: "address1",
  data() {
    return {
      addressList: null
    };
  },
  created() {
    this.getAddressList();
  },
  methods: {
    getAddressList() {
      axios.get(url.addresslists).then(res => {
        this.addressList = res.data.data;
      });
    },

     toedit(list) {
    this.$router.push({ path: "/address_edit", query: { instance: list } });
  }
  }

 
};
</script>
<style>
@import "../address_base.css";
@import "../address.css";
</style>

