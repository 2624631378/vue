<template>
  <div id="show-blogs">
    <h1>博客总览</h1>
    <input type="text" placeholder="搜索" v-model="search">
    <div class="single-blog" v-for="list in bloglists" :key="list.id">
      <router-link :to="{name:'singleblog',query:{id:list.id}}">
        <h2>{{list.title}}</h2>
      </router-link>

      <article>{{list.content}}</article>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      search: ""
    };
  },

  computed: {
    bloglists() {
      return this.$store.state.bloglists;
    },

    newbloglists() {
      return this.bloglists.filter(item => {
        return item.title.match(this.search);
      });
    }
  },
  created() {
    if (!this.bloglists) {
      return;
    } else {
      this.$store.dispatch("getbloglistsaction");
    }
  }
};
</script>
<style>
#show-blogs {
  max-width: 800px;
  margin: 0 auto;
}

.single-blog {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: #eee;
  border: 1px dotted #aaa;
}

#show-blogs a {
  color: #444;
  text-decoration: none;
}

input[type="text"] {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}
</style>

