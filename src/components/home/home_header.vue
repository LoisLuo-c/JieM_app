<template>
  <div class="home_header">
    <div class="nav_icon">
        <i class="iconfont icon-daohang1"></i>
    </div>
    <div class="search_bar" @click="clickSearch">
       <div class="icon">
            <i class="iconfont icon-sousuo"></i>
       </div>
       <div class="title">
           搜索
       </div>
    </div>
    
  </div>
</template>

<script>
import Vue from "vue";
import { Search } from "mint-ui";

Vue.component(Search.name, Search);

export default {
  name: "Home_header",
  data() {
    return {
      router_path: this.$route.fullPath
    };
  },
  methods:{
    clickSearch(){
      this.$router.push({name:'search'})
    }
  },
  beforeUpdate() {
    this.router_path = this.$route.fullPath;
  }
};
</script>

<style scoped>
.home_header {
  width: 100%;
  height: 7%;
  overflow: hidden;
  background-color: #f12b35ed;
}
.nav_icon {
  float: left;
  width: 15%;
  margin-top: 0.6rem;
  margin-left: 0.8rem;
  background-color: #f12b35ed;
}
.nav_icon .icon-daohang1 {
  font-size: 1.5rem;
  color: white;
}
.search_bar {
  float: right;
  margin-top: 0.6rem;
  margin-right: 1rem;
  width: 50%;
  height: 55%;
  background-color: #f5f0ef;
  border-radius: 0.2rem;
  font-size: 0.78rem;
  color: #a8a4a4;
}
.search_bar .icon{
    display: inline-block;
    margin: 0.1rem 0.3rem;
}
.search_bar .title{
 display: inline-block;
}
</style>
