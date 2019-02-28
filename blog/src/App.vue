<template>
  <div id="app">
    <blogheader></blogheader>
    <router-view></router-view>
  </div>
</template>

<script>
import blogheader from "./components/BlogHeader";
export default {
  name: "App",
  components: {
    blogheader
  }
};
</script>

<style>

</style>
