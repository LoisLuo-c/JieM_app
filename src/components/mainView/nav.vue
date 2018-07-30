<template>
  <div class="nav_b">
    <ul id="bottom_bar">
        <li v-bind:class="path=='/home/homepage'?'nav_item active':'nav_item'">
            <router-link to="/home/homepage">
                <span class="icon">
                   <i class="iconfont icon-home3"></i>
                </span>
                <span class="title">新闻</span>
            </router-link>
        </li>
         <li v-bind:class="path=='/video'?'nav_item active':'nav_item'">
            <router-link to="/video">
                <span class="icon">
                   <i class="iconfont icon-ziyuan"></i>
                </span>
                 <span class="title">视听</span>
            </router-link>
        </li>
         <li v-bind:class="path=='/supermarket'?'nav_item active':'nav_item'">
            <router-link to="/supermarket">
                <span class="icon">
                   <i class="iconfont icon-shangcheng1"></i>
                </span>
                 <span class="title">购物</span>
            </router-link>
        </li>
         <li v-bind:class="path=='/community'?'nav_item active':'nav_item'">
            <router-link to="/community">
                 <span class="icon">
                   <i class="iconfont icon-luntan"></i>
                </span>
                 <span class="title">社区</span>
            </router-link>
        </li>
         <li v-bind:class="path=='/user'?'nav_item active':'nav_item'">
            <router-link to="/user">
                 <span class="icon">
                   <i class="iconfont icon-yonghu2"></i>
                </span>
                 <span class="title">我的</span>
            </router-link>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'nav_bar',
  props:["path"],
  data () {
    return {
      message: 'nav'
    }
  },
  beforeUpdate(){
  },
  mounted(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.nav_b ul{
    background-color: white;
   position: fixed;  
   z-index: 1;
   width: 100%;
   height: 7.5%;
   border-top: 1px solid #B0ADAD;
   bottom: 0px;
}
.nav_b li{
    margin-top: 0.3rem;
    display: inline-block;
    width: 19%;
    text-align: center;
    font-size: 0.75rem;
}
.nav_b .active{
    color: red;
}
.nav_b .icon{
    display: block;
}
.icon i{
    font-size: 1.55rem;
}
</style>