<template>
  <div class="nav_top" ref="wrapper">

     <ul class="nav_list" ref="sliderGroup">
       <!-- <router-link to="/user/foo">/user/foo</router-link> -->
       <!-- <li class="nav_item" v-for="(item,index) in items" :key="index">{{item.title}}
         <div class="bar"></div>
       </li> -->
          <!-- <div class="click" v-on:click="click">clickmetopnav
             <div>{{currpage}}</div>
          </div> -->
       
           <li v-bind:class="currpage=='0'?'top_nav_item active':'top_nav_item'" >
             <router-link to="/home/homepage">
             <span class="nav_title" data-navitem="0" v-on:click="clickItem($event)">首页
                <div class="bar" ></div>
                </span>
             </router-link>
          </li>
          <li v-bind:class="currpage=='1'?'top_nav_item active':'top_nav_item'"  >
             <router-link to="/home/chinapage">
             <span class="nav_title" data-navitem="1" v-on:click="clickItem($event)"> 中国
                <div class="bar" ></div>
                </span>
             </router-link>
          </li>
           <li v-bind:class="currpage=='2'?'top_nav_item active':'top_nav_item'" >
             <!-- <router-link to="/home/globe"> -->
         <span class="nav_title" data-navitem="1" v-on:click="clickItem($event)"> 天下
                <div class="bar" ></div>
                </span>
             <!-- </router-link> -->
          </li>
           <li v-bind:class="currpage=='3'?'top_nav_item active':'top_nav_item'"  >
             <!-- <router-link to="/home/hongguan"> -->
               <span class="nav_title" data-navitem="1" v-on:click="clickItem($event)"> 宏观
                <div class="bar"></div>
                </span>
             <!-- </router-link> -->
          </li>
          <li v-bind:class="currpage=='4'?'top_nav_item active':'top_nav_item'"  >
             <!-- <router-link to="/home/fashion"> -->
               <span class="nav_title"  data-navitem="1" v-on:click="clickItem($event)">时尚
                <div class="bar"></div>
                </span>
             <!-- </router-link> -->
          </li>
          <li v-bind:class="currpage=='5'?'top_nav_item active':'top_nav_item'">
             <!-- <router-link to="/home/game"> -->
              <span class="nav_title"  data-navitem="1" v-on:click="clickItem($event)">游戏
                <div class="bar"></div>
               
                </span>
             <!-- </router-link> -->
          </li>
          <li v-bind:class="currpage=='6'?'top_nav_item active':'top_nav_item'">
             <!-- <router-link to="/home/culture"> -->
               <span class="nav_title"  data-navitem="1" v-on:click="clickItem($event)">文化
                <div class="bar"></div>
                </span>
             <!-- </router-link> -->
          </li>
          <li v-bind:class="currpage=='7'?'top_nav_item active':'top_nav_item'">
             <!-- <router-link to="/home/travel"> -->
               <span class="nav_title" data-navitem="1" v-on:click="clickItem($event)">旅行
                <div class="bar"></div>
                </span>
             <!-- </router-link> -->
          </li>
     </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import eve from "../../assets/sliderevent";
export default {
  name: "navtop",
  props: {
    sliderCurPage: {
      type: Array,
      require: true
    },
    path:{
      type:String
    }
  },
  data() {
    return {
      items: [
        { title: "首页" },
        { title: "天下" },
        { title: "宏观" },
        { title: "财经" },
        { title: "科技" },
        { title: "时尚" },
        { title: "汽车" },
        { title: "时尚" },
        { title: "汽车" },
        { title: "时尚" },
        { title: "汽车" },
        { title: "时尚" },
        { title: "汽车" }
      ],
      currpage: 0,
      isActive:0

    };
  },
  watch: {
  },
  mounted() {
    this.toSroll();
    this.changeBar();
  },
  methods: {
    //改变导航标签颜色
    clickItem: function(e) {
      var index=e.target.getAttribute('data-navitem')
      this.currpage=index;
      eve.$emit("navPage",this.currpage);
      localStorage.setItem("navItem",this.currpage)
    },
    changeBar() {
      var me = this;
      eve.$on("sliderCurPage", function(data) {
        me.currpage = data;
        localStorage.setItem("navItem",me.currpage)
      });
    },
    toSroll() {
      this.slider = new BScroll(this.$refs.wrapper, {
        scrollX: true,
        scrollY: false,
        click: true
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav_top {
  width: 100%;
  overflow: hidden;
}
.nav_list {
  font-size: 0.85rem;
  width: 32rem;

  height: 6%;
}

.top_nav_item {
  margin-top: 0.5rem;
  margin-left: 1rem;
  float: left;
  width: 3rem;
}
.nav_title{
  padding: 0.5rem 0;
}
.active .bar{
  border-bottom: 0.1rem solid red;
}
.bar {
  height: 0.3rem;
  width: 41%;
  border-bottom: 0.1rem solid white;
  margin-bottom: 0.2rem;
  margin-left: 0.1rem;
}

</style>