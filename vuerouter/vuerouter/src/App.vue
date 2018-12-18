<template>
  <div id="app">
    <div class="container">
      <app-header></app-header>
    </div>
    <div class="container">
      <router-view></router-view>

      <!-- <app-home></app-home> -->
    </div>
    <div class="container">

      <div class="row">

        <div class="col-sm-12 col-md-4">

          <router-view name="orderingGuide"></router-view>
          
            
        </div>
        <div class="colo-sm-12 col-md-4"> <router-view name="delivery"></router-view></div>
         <div class="colo-sm-12 col-md-4"> <router-view name="history"></router-view></div>
           <div class="colo-sm-12 col-md-4"> <router-view name="contact"></router-view></div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
// import Home from './components/Home'

export default {
  name: "App",
  components: {
    "app-header": Header
    // "app-home":Home
  }
};
</script>

<style>
</style>
