<template>
  <div class="container" style="min-height: 597px;">
    <div class="section section-first">
      <div class="block form js-form">
        <input class="js-id" name="id" type="hidden" value>
        <div class="block-item" style="border-top:0;">
          <label>收货人</label>
          <input
            type="text"
            placeholder="请输入姓名"
            name="user_name"
            value
            maxlength="20"
            v-model="name"
          >
        </div>
        <div class="block-item">
          <label>联系电话</label>
          <input type="tel" placeholder="联系电话" name="tel" value maxlength="11" v-model="tel">
        </div>
        <div class="block-item">
          <label>选择地区</label>
          <div class="select-group">
            <select class="js-province-selector" v-model="provincevalue">
              <option value="-1">选择省份</option>
              <option
                :value="addresslist.value"
                v-for="addresslist in addressdata.list"
                :key="addresslist.id"
              >{{addresslist.label}}</option>
            </select>
            <select class="js-city-selector" v-model="cityValue">
              <option value="-1">选择城市</option>
              <option
                :value="citylist.value"
                v-for="citylist in citylists"
                :key="citylist.id"
              >{{citylist.label}}</option>
            </select>
            <select class="js-county-selector" name="area_code" data-code v-model="districtValue">
              <option value="-1">选择地区</option>
              <option
                :value="districtlist.value"
                v-for="districtlist in districtlists"
                :key="districtlist.id"
              >{{districtlist.label}}</option>
            </select>
          </div>
        </div>
        <div class="block-item">
          <label>详细地址</label>
          <input
            type="text"
            placeholder="街道门牌信息"
            name="address_detail"
            value
            maxlength="100"
            v-model="address"
          >
        </div>
      </div>
    </div>
    <div class="block section js-save block-control-btn" @click="add">
      <div class="block-item c-blue center">保存</div>
    </div>
    <div class="block section js-delete hide block-control-btn">
      <div class="block-item c-red center">删除</div>
    </div>
    <div class="block stick-bottom-row center js-save-default hide">
      <button class="btn btn-standard js-save-default-btn">设为默认收货地址</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import url from "js/api";
export default {
  data() {
    return {
      name: null,
      tel: null,
      address: null,
      addressdata: require("js/address"),
      citylists: null,
      districtlists: null,
      provincevalue: -1,
      cityValue: -1,
      districtValue: -1
    };
  },

  computed: {
    addresslists() {
      return this.$store.state.addresslists;
    }
  },
  methods: {
    add() {

        let data = {
          name: this.name,
          address: this.address,
          tel: this.tel,
          province_id: this.provincevalue,
          city_id: this.cityValue,
          district_id: this.districtValue
        };
        this.$store.dispatch("addaction", data);
     
    }
  },
  watch: {
    addresslists() {
      this.$router.go(-1);
    },

    provincevalue(val) {
      if (val === -1) return;
      let index = this.addressdata.list.findIndex(item => {
        return item.value == val;
      });
      this.citylists = this.addressdata.list[index].children;
      this.cityValue = -1;
      this.districtValue = -1;
    },
    cityValue(val) {
      if (val === -1) return;
      let index = this.citylists.findIndex(item => {
        return item.value == val;
      });
      this.districtlists = this.citylists[index].children;
      this.districtValue = -1;
    }
  }
};
</script>
<style scoped>
@import "./address_base.css";
@import "./address.css";
</style>