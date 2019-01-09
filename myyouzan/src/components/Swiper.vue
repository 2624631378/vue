<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swp-page swiper-slide" v-for="(list,index) in swplists" :key="index">
        <a class="js-no-follow" :href="list.link">
          <img class="goods-main-photo fadeIn" :src="list.img">
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";

export default {
  props: {
    swplists: {
      type: Array,
      required: true
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      new Swiper(".swiper-container", {
        loop: true,
        pagination: {
          el: ".swiper-pagination"
        },
        speed: 600, // 切换速度
        autoplay: {
          // 自动切换
          delay: 4000, // 自动切换的时间间隔
         
          disableOnInteraction: false // 用户操作swiper之后,是否禁止autoplay.默认为true:停止
        }
      });
    }
  }
};
</script>

<style>
.swiper-slide img {
  width: 100%;
  height: 100%;
}
</style>
