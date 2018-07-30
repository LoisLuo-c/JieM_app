<template>
  <div class="videos">
    <videolist/>
  </div>
</template>

<script>
import Vue from "vue";
import videoList from '../components/video/videoList'
Vue.component("videolist",videoList)
export default {
  name: 'videos',
  data () {
    return {
      message: 'video'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.videos{
  position: relative;
  width: 100%;
  height: 100%;
}
</style>