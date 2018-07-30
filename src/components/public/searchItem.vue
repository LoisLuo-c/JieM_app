<template>
    <div class="searchItem newsItem" :data-contentid="newsItem.id">
        <div class="img">
            <img :src="newsItem.titleImage" alt="">
        </div>
        <div class="content">
            <div class="searchtitle">{{newsItem.title}}</div>
            <span class="author">{{newsItem.author}}</span>
            <span class="time">{{newsItem.time}}</span>
        </div>
    </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "searchitem",
  props: ["newsItem"],
  data() {
    return {
      message: "supermarket"
    };
  },
  methods:{
      
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchItem {
  padding: 1rem;
  border-bottom: 1px dotted #a0a2a3;
  width: 100%;
  height: 7.6rem;
  overflow: hidden;
}
.searchItem img {
  width: 35%;
  height: 6.5rem;
  float: left;
}
.searchItem .content {
  margin-left: 0.8rem;
  float: left;
  width: 55%;
}
.searchItem .content .searchtitle {
  font-size: 1rem;
  height: 5.3rem;
  overflow: hidden;
  margin-bottom: 0.2rem;
}
.searchItem .content .author {
  font-size: 0.8rem;
  color: #838180;
}
.searchItem .content .time {
  font-size: 0.7rem;
  color: #838180;
}
</style>