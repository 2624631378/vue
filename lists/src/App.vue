<template>
  <div id="app">
    <input v-model="nameli">
    <button @click="add(nameli)">add</button>
    <span>共有{{lists.length}}</span>
    <table class="tftable" border="1">
      <tr>
        <th>清单名称</th>
        <th>状态</th>
        <th>删除</th>
      </tr>
      <tr v-for="(list,index) in lists" :key="index">
        <td>{{list.name}}</td>
        <td>{{list.status | statuswuliu}}</td>
        <td @click="del(list)">删除</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      nameli:'',
      lists: [
      
       
      ]
    };
  },
  methods: {
    add(v) {
      if (this.nameli == "") return;
      this.lists.unshift({ name: this.nameli, status: "1" });
      this.nameli = "";
    },
    del(list) {
      this.lists.splice(list, 1);
    }
  },
  filters:{

    statuswuliu(type){
      if(type =='1'){
        return '456'
      }


    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.tftable {
  font-size: 12px;
  color: #333333;
  width: 100%;
  border-width: 1px;
  border-color: #a9a9a9;
  border-collapse: collapse;
}

.tftable th {
  font-size: 12px;
  background-color: #b8b8b8;
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #a9a9a9;
  text-align: left;
}

.tftable tr {
  background-color: #ffffff;
}

.tftable td {
  font-size: 12px;
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #a9a9a9;
}

.tftable tr:hover {
  background-color: #ffff99;
}
</style>
