<template>
  <div id="app">
    <router-view/>
    <!-- register -->
        <!-- loginBox -->
    <NavBar v-bind:path="router_path"/> 
  </div>
</template>

<script>
import Vue from 'vue';

import nav from './components/mainView/nav'


Vue.component("NavBar",nav)

export default {
  name: 'App',
  data(){
    return {
      router_path:this.$route.fullPath
    }
  },
  beforeUpdate(){
    this.router_path=this.$route.fullPath
  },
  mounted(){
   
  }

}
</script>

<style>
html,
body{
  font-size: 100%;
  width: 100%;
  height: 100%;
  overflow:scroll;overflow-x:hidden;
  overflow-y:hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 height: 100%;
  
}
</style>
