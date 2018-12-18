<template>
  <div class="add-blog">
    <h1>写博客</h1>
    <form action v-show="!showtop">
      <label for>博客标题</label>
      <input type="text" name id v-model="blog.title">
      
      <label for>博客内容</label>
      <textarea name id cols="30" rows="10" v-model="blog.content"></textarea>
      <div class="checkboxs">
        <label for>Vue.js</label>
        <input type="checkbox" value="Vue.js" v-model="blog.categories">
        <label for>Node.js</label>
        <input type="checkbox" value="Node.js" v-model="blog.categories">
        <label for>React.js</label>
        <input type="checkbox" value="React.js" v-model="blog.categories">
      </div>
      <label for>作者</label>
      <select name id v-model="blog.author">
        <option v-for="author in authors" :key="author">{{author}}</option>
      </select>
      <button @click.prevent="subinfo">提交文章</button>
    </form>

    <div class="successinfo" v-if="showtop">
        恭喜您，提交成功
    </div>

    <div id="preview">
      <h3>博客标题</h3>
      <p>博客标题：{{blog.title}}</p>
      <h3>博客内容</h3>
      <p>{{blog.content}}</p>
      <h3>博客分类</h3>
      <ul>
        <li v-for="category in blog.categories" :key="category">{{category}}</li>
      </ul>

      <h3>博客作者</h3>
      <p>{{blog.author}}</p>
    </div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  data() {
    return {
      blog: {
        title: "",
        content: "",
        categories: [],
        author: ""
      },
      authors: ["josh", "jinsyang", "jie"],
      showtop: false
    };
  },
  methods: {
    subinfo() {
      if (
        this.blog.title == '' ||
        this.blog.content == '' ||
        this.blog.categories == '' ||
        this.blog.author == ''
      ) {
          alert('请输入正确的内容')
      } else {
        axios
          .post("http://jsonplaceholder.typicode.com/posts", {
            userId: 1,
            title: this.blog.title,
            body: this.blog.content
          })
          .then(res => {
            console.log(res);
            this.showtop = true;
          });
      }
    }
  }
};
</script>

