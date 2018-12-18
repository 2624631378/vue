
<template>
  <div class="uses">
     <h1>{{ title }}</h1>
    <ul>
      <li v-for="name in names">{{ name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Ninja App',
      names: ["lxj$LY", "jinsyang", "josh"]
    };
  }
};
</script>

<style scoped>

h1{
    color: red;
}
</style>






