<template>
  <div class="user">
     <usercontent/>
  </div>
</template>

<script>
import Vue from 'vue';
import userContent from '../components/user/userContent'

Vue.component("usercontent", userContent);
export default {
  name: 'user',
  data () {
    return {
      message: 'user'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user{
  width: 100%;
  height: 100%;
}
</style>