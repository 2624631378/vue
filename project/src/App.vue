<template>
  <div>
    <h1>{{ title }}</h1>
    <heawerder></heawerder>
    <us123ers></us123ers>
  </div>
</template>

<script>
// Imports
import Users from "./components/Users";
import Header from "./components/Header";

export default {
  components: {
    us123ers: Users,
    heawerder: Header
  },
  data() {
    return {
      title: "Ninja App"
    };
  }
};
</script>

<style>
h1 {
  color: purple;
}
</style>
