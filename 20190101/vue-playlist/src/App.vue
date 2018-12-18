<template>
  <div id="app">
    <Header v-bind:navs12="navs" />
    <Foot/>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import Foot from "./components/Foot";
import Header from "./components/Header";

export default {
  name: "App",
  data() {
    return {
      navs: [
        { link: "https://www.9dcj.com/", title: "财经大咖" },
        { link: "https://zhibo.9dcj.com/", title: "直播大厅" },
        { link: "https://finance.9dcj.com/", title: "图文" },
        { link: "https://shixue.9dcj.com/", title: "视频" },
        { link: "https://market.9dcj.com/", title: "行情" },
        { link: "https://www.9dcj.com/index/activitylist.html", title: "活动" }
      ]
    };
  },
  components: {
    HelloWorld,
    Foot,
    Header
  }
};
</script>

<style>
@import "./components/9d_base.css";
</style>
