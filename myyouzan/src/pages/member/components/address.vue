<template>
  <div class="container" style="min-height: 597px;">
    <div
      class="block-list address-list section section-first js-no-webview-block"
      v-if="addresslists && addresslists.length"
    >
      <a
        class="block-item js-address-item address-item"
        @click="toedit(list)"
        v-for="list in addresslists"
        :key="list.id"
        :class="{'address-item-default': list.is_default}"
      >
        <div class="address-title">{{list.consignee}} {{list.tel}}</div>
        <p>{{list.province}}{{list.city}}{{list.district}}{{list.address}}</p>
      </a>
    </div>
    <div class="block stick-bottom-row center" @click="routertoadd">
      <a class="btn btn-blue js-no-webview-block js-add-address-btn"
      >新增地址</a>
    </div>
  </div>
</template>
<style scoped>
@import "./address_base.css";
@import "./address.css";
</style>
<script>
export default {
  computed: {
    addresslists() {
      return this.$store.state.addresslists;
    }
  },

  created() {
    if (!this.addresslists) {
      this.$store.dispatch("getaddresslistsaction");
    }
  },
  methods: {
    routertoadd(){
      if(this.$store.state.addresslists.length>6){
        alert('最多只能添加7个地址')
      }else{
         this.$router.push({ path: "/address_add"});
      }
    },
    toedit(list) {
      this.$router.push({ path: "/address_edit", query: { instance: list } });
    }
  }
};
</script>



