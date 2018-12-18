<template>
  <div class="header">
    <div class="wrap clearfix">
      <a href="https://www.9dcj.com/" class="header-logo fl">
        <img src="//cdn.9dcj.com/aliyun/2018-07-18/5b4ead96e8b22.png">
      </a>

      <ul class="header-nav fl">
        <li
          v-for="(nav,index) in navs12"
          :key="nav"
          :class="{on:oncurindex==index}"
          @mouseover="oncurstyleover(index)"
          @mouseout="oncurstyleout(index)"
        >
          <a :href="nav.link" target="_blank">{{nav.title}}</a>
        </li>
      </ul>

      <div class="nav-bar fr">
        <div class="header-search fl">
          <div class="citiao" v-show="citiaohide" @click="citiaohideon">
            <span>大家都在搜：</span>
            <div class="bd">
              <ul class="infoList">
                <template v-if="searchs.length<0">
                  <li v-for="searcher in searchs" :key="searcher">{{searcher}}</li>
                </template>
                <template v-else>
                  <li>房间/大咖/视频/观点</li>
                </template>
              </ul>
            </div>
          </div>
          <form
            method="get"
            id="searchForm_id"
            name="navSearchForm"
            action="//search.9dcj.com"
            target="_blank"
          >
            <input
              class="txt_searchs fl"
              type="text"
              placeholder
              v-focus="focusState"
              name="search"
              value
              autocomplete="off"
              maxlength="20"
            >
            <button type="submit" class="btn-searchs fl"></button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      title: "haha",
      oncurindex: 0,
      citiaohide: true,
      focusState: false,
      searchs: ["原油", "外汇", "黄金"]
    };
  },
  props: {
    navs12: Array,
    required: true
  },
  methods: {
    oncurstyleover(index) {
      this.oncurindex = index;
    },
    oncurstyleout(index) {
      this.oncurindex = 0;
    },
    citiaohideon() {
      this.citiaohide = !this.citiaohide;
      this.focusState = !this.focusState;
    }
  },
  directives: {
    focus: {
      //根据focusState的状态改变是否聚焦focus
      update: function(el, value) {
        //第二个参数传进来的是个json
        if (value) {
          el.focus();
        }
      }
    }
  }
};
</script>
<style scoped>
/* @import './9d_home.css'; */
.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  background: #fff;
}
.wrap {
  width: 1200px;
  margin: 0 auto;
}
.header-nav {
  margin: 15px 0 0 20px;
  position: relative;
  z-index: 1;
}
.header-nav li {
  float: left;
  display: inline;
  font-size: 16px;
  line-height: 30px;
  height: 30px;
  padding: 0 8px;
  text-align: center;
  position: relative;
}

.header-nav > li.on a {
  color: #e40f16;
}

.nav-bar {
  margin-top: 15px;
  position: relative;
}
.header-search {
  position: relative;
  width: 224px;
  height: 32px;
  background: #fafafa;
  border: solid 1px #ddd;
  border-radius: 100px;
}
.citiao {
  width: 180px;
  height: 30px;
  position: absolute;
  background: #fafafa;
  line-height: 30px;
  border-radius: 100px;
  left: 10px;
  font-size: 14px;
  color: #999;
  display: flex;
  align-items: center;
}
.citiao .bd,
.citiao span {
  display: inline-block;
  vertical-align: middle;
}
.citiao .infoList li {
  max-width: 90px;
  overflow: hidden;
  height: 30px;
}

.txt_searchs {
  width: 185px;
  height: 30px;
  padding: 3px 0 3px 6px;
  font-size: 14px;
  color: #999;
  text-indent: 5px;
  overflow: hidden;
  background-color: transparent;
}
.btn-searchs {
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  background: url(//cdn.9dcj.com/aliyun/2018-07-18/5b4ec2bdcf409.png) no-repeat
    9px 6px;
  width: 30px;
  height: 30px;
}
</style>

