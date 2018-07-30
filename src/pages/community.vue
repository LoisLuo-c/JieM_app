<template>
  <div class="community">
    <!-- <register/> -->
    <div class="noresource">
      暂无内容
    </div>
  </div>
</template>

<script>
import Vue from "vue";
// import Register from '../components/public/register'


// Vue.component("register", Register);
export default {
  name: 'community',
  data () {
    return {
      message: 'community'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.noresource{
  width: 100%;
  height: 5rem;
  margin: 3rem 0;
  text-align: center;
  color: #696a6b;
}
</style>