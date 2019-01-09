<template>

    <el-carousel :interval="4000" height="180px">
      <el-carousel-item v-for="item in swplists" :key="item.id">
        <a class="js-no-follow" :href="item.link">
          <img class="goods-main-photo fadeIn" :src="item.img">
        </a>
      </el-carousel-item>
    </el-carousel>

</template>
<script>
import { Carousel, CarouselItem } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
export default {
  props: {
    swplists: {
      type: Array
    }
  },
  data() {
    return {};
  },
  components: {
    "el-carousel": Carousel,
    "el-carousel-item": CarouselItem
  }
};
</script>
<style scoped>
img {
  width: 100%; height: 100%;
}
/* .el-carousel__container{height: 180px;} */

</style>