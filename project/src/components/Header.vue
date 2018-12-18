<template>
  <div class="header">
    <div class="wrap clearfix">
      <a href="https://www.9dcj.com/" class="header-logo fl">
        <img src="//cdn.9dcj.com/aliyun/2018-07-18/5b4ead96e8b22.png">
      </a>
      <ul class="header-nav fl" id="nav">
        <li class="nLi" v-for="(value, key, index) in navs">
          <a :href="value.ling" target="_blank">{{value.title}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navs: [
        { ling: "https://www.9dcj.com/", title: "财经大咖" },
        { ling: "https://zhibo.9dcj.com/", title: "直播大厅" },
        { ling: "https://finance.9dcj.com/", title: "图文" },
        { ling: "https://shixue.9dcj.com/", title: "视频" },
        { ling: "https://market.9dcj.com/", title: "行情" },
        { ling: "https://www.9dcj.com/index/activitylist.html", title: "活动" }
      ]
    };
  }
};
</script>
<style scoped>
@import "../header/9d_base.css"
</style>

