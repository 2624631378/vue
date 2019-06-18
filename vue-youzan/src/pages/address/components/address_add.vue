<template>
  <div class="container" style="min-height: 597px;">
    <div class="section section-first">
      <div class="block form js-form">
        <input class="js-id" name="id" type="hidden" value="69150287">
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
            <select
              class="js-province-selector"
              v-model="province_id"
              @change="province(province_id) "
            >
              <option value="-1">选择省份</option>
              <option
                :value="item.value"
                :key="index"
                v-for="(item,index) in addressList.list"
              >{{item.label}}</option>
            </select>
            <select class="js-city-selector" v-model="city_id" @change="citychange(city_id)">
              <option value="-1">选择城市</option>
              <option
                :value="item.value"
                :key="index"
                v-for="(item,index) in cityList"
              >{{item.label}}</option>
            </select>
            <select class="js-county-selector" name="area_code" v-model="district_id">
              <option value="-1">选择地区</option>
              <option
                :value="item.value"
                :key="index"
                v-for="(item,index) in districtList"
              >{{item.label}}</option>
            </select>
          </div>
        </div>
        <div class="block-item">
          <label>详细地址</label>
          <input
            type="text"
            placeholder="街道门牌信息"
            name="address_detail"
            value="南方软件园"
            maxlength="100"
          >
        </div>
      </div>
    </div>
    <div class="block section js-save block-control-btn">
      <router-link :to="{name:'addressIndex'}">
        <div class="block-item c-blue center">保存</div>
      </router-link>
    </div>

    <div class="block stick-bottom-row center js-save-default">
      <button class="btn btn-standard js-save-default-btn">设为默认收货地址</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import url from "js/api";
export default {
  name: "addressedit",

  data() {
    return {
      name: null,
      tel: null,
      province_id: null,
      city_id: null,
      district_id: null,
      cityList: [],
      districtList: [],
      district: null,
      address: null,
      addressList: null
    };
  },
  created() {
    this.addressList = require("js/address.json");
    if (!this.province_id) {
      this.province_id = "-1";
    }
    if (!this.city_id) {
      this.city_id = "-1";
    }
    if (!this.district_id) {
      this.district_id = "-1";
    }
    this.init(this.province_id, this.city_id);
  },
  methods: {
    init(province_id, city_id) {
      this.addressList.list.forEach(res => {
        if (province_id == res.value) {
          this.cityList = res.children;
          this.cityList.forEach(res => {
            if (city_id == res.value) {
              this.districtList = res.children;
            }
          });
        }
      });
    },
    province(province_id) {
      this.city_id = "-1";
      this.district_id = "-1";
      this.districtList = [];

      this.addressList.list.forEach(res => {
        if (province_id == res.value) {
          this.cityList = res.children;
        }
      });
    },

    citychange(city_id) {
      this.district_id = "-1";
      this.cityList.forEach(res => {
        if (city_id == res.value) {
          this.districtList = res.children;
        }
      });
    }
  }
  // watch: {
  //   province_id: function(newValue, oldValue) {

  //   }
  // }
};
</script>
<style>
@import "../address_base.css";
@import "../address.css";
</style>
