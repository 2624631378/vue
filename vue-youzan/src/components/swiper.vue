<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swp-page swiper-slide" v-for="(item,index) in swplists" :key="index">
        <a class="js-no-follow" :href="item.link">
          <img class="goods-main-photo fadeIn" :src="item.img">
        </a>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <!-- <div class="swiper-button-prev"></div> -->
    <!-- <div class="swiper-button-next"></div> -->

    <!-- 如果需要滚动条 -->
    <!-- <div class="swiper-scrollbar"></div> -->
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

