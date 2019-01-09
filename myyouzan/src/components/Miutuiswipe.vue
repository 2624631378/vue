<template>

    <mt-swipe :auto="2000">
      <mt-swipe-item v-for="item in swplists" :key="item.id">
        <a class="js-no-follow" :href="item.link">
          <img class="goods-main-photo fadeIn" :src="item.img">
        </a>
      </mt-swipe-item>
    </mt-swipe>

</template>
<script>
import { Swipe, SwipeItem } from "mint-ui"
import "mint-ui/lib/style.css"
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
    "mt-swipe": Swipe,
    "mt-swipe-item": SwipeItem
  }
};
</script>
<style scoped>
 img {
  width: 100%;
}
.mint-swipe {
  height:180px;
}

</style>