<template>
  <div id="single-blog">
    <h1>{{blogsinfo.title}}</h1>
    <article>{{blogsinfo.content}}</article>
    <p>作者:{{blogsinfo.author}}</p>
    <p>分类:</p>

    <ul>
      <li v-for="list in blogsinfo.categories" :key="list">{{ list}}</li>
    </ul>

    <button @click="delblog">删除</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "singleblog",
  data() {
    return {
      id: "",
      blogsinfo:{}
    };
  },
  created() {
    this.getblogsinfo();
    this.id = this.$route.query.id;
  },
  computed: {
    bloglists() {
      return this.$store.state.bloglists;
    }
  },
  methods: {
    getblogsinfo() {
      this.id = this.$route.query.id;
      axios.get("/posts/" + this.id + ".json").then(res => {
        // console.log(res);
        this.blogsinfo = res.data;
      });
    },
    delblog() {
      this.$store.dispatch("delblogaction", this.id);
    }
  },
  watch: {
    bloglists() {
      this.$router.go(-1);
    }
  }


  // watch: {
  //   bloglists: {
  //     handler() {
  //       this.$router.go(-1);
  //     },
  //     deep: true
  //   },
  // }


};
</script>
<style>
#single-blog {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  background: #eee;
  border: 1px dotted #aaa;
}
</style>