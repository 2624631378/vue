<template>
  <div id="app">
    <select v-model="provalue" @change="cityvaluelist(),dictvaluelist()">
      <!-- 此处只能用change事件，不能直接在option上面加点击事件 -->
      <option v-for="v in  addressdata.list" :key="v.value">{{v.label}}</option>
    </select>
    
    <select v-model="cityvalue" @change="dictvaluelist()">
      <option v-for="v in  citylist" :key="v.value">{{v.label}}</option>
    </select>
    
    <select v-show="dictlist" v-model="dictvalue">
      <option v-for="v in  dictlist" :key="v.value">{{v.label}}</option>
    </select>
    <br>
    <!-- {{provalue}}{{cityvalue}}{{dictvalue}} -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      addressdata: require("./address"),
      provalue: "",
      citylist: [],
      cityvalue: "",
      dictlist: [],
      dictvalue: ""
    };
  },
  mounted() {
    this.init();
    this.cityvaluelist();
    this.dictvaluelist();
  },
  methods: {
    init() {
      this.provalue = this.addressdata.list[0].label; //初始化第一个值，
    },
    cityvaluelist() {
      this.addressdata.list.forEach(item => {
        if (this.provalue == item.label) {
          this.citylist = item.children;
          this.cityvalue = this.citylist[0].label; // 默认显示第一个城市值
        }
      });
      //
    },
    dictvaluelist() {
      this.citylist.forEach(item => {
        if (this.cityvalue == item.label) {
          this.dictlist = item.children;

          // if (this.dictlist && this.dictlist.length > 0) {
          //   this.dictvalue = this.dictlist[0].label;
          // } else {
          //     this.dictvalue = ""
          // }

          //三目运算写法

          this.dictlist && this.dictlist.length > 0
            ? (this.dictvalue = this.dictlist[0].label)
            : (this.dictvalue = "");
        }
      });
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
</style>
