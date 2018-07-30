<template>
    <div class="channelnews">
        <div class="channelnewsBox" v-for="(newsList,index) in list" :key="index">
            <div class="newList">
                <div class="channelnewsItem newsItem" v-for="(newsItem,index) in newsList.threeNews" :key="index" :data-contentid="newsItem.id">
                    <div class="img">
                        <img :src="newsItem.titleImage" alt="">
                    </div>
                    <div class="content">
                        <div class="content_text">{{newsItem.title}}</div>
                        <span class="author">{{newsItem.author}}</span>
                        <span class="time">{{newsItem.time}}</span>
                    </div>
                </div>
            </div>
            <div class="bigNews newsItem" :data-contentid="newsList.oneNews[0].id">
                <div class="img">
                    <img :src="newsList.oneNews[0].titleImage" alt="">
                </div>
                <div class="title">{{newsList.oneNews[0].title}}</div>
                <div class="footer">
                    <span class="author">{{newsList.oneNews[0].author}}</span>
                    <span class="time">{{newsList.oneNews[0].time}}</span>
                    <span class="icon">{{newsList.oneNews[0].click}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import { Loadmore } from "mint-ui";
import BScroll from "better-scroll";
import config from "../../../../base/config";
Vue.component(Loadmore.name, Loadmore);
export default {
  name: "channelnews",
  props:["list"],
  data() {
    return {
    };
  },
  methods: {
    
    
  },
  // mounted() {
  //   this.getList();
  // },
  // watch:{
  //     currentPage:function(){
  //         this.getList();
  //     }
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.channelnews {
  width: 100%;
  height: auto;
  overflow: hidden;
}
.channelnewsItem {
  margin: 1rem;
  border-bottom: 1px dotted #a0a2a3;
  width: 100%;
  height: 7.6rem;
  overflow: hidden;
}
.channelnewsItem img {
  width: 35%;
  height: 6.5rem;
  float: left;
}
.channelnewsItem .content {
  margin-left: 0.8rem;
  float: left;
  width: 55%;
}
.channelnewsItem .content .content_text {
  font-size: 1rem;
  height: 5.3rem;
  overflow: hidden;
  margin-bottom: 0.2rem;
}
.channelnewsItem .content .author {
  font-size: 0.8rem;
}
.channelnewsItem .content .time {
  font-size: 0.7rem;
}
.bigNews{
    border-bottom: 1px dotted #a0a2a3;
}
.bigNews .img {
  width: 100%;
  height: 12rem;
}
.bigNews .img img {
  width: 100%;
  height: 12rem;
}
.bigNews .title {
  margin: 1rem;
}
.bigNews .footer {
  font-size: 0.8rem;
  margin-bottom: 0.8rem;
}
.bigNews .author{
    margin: 0 0.3rem 0 1rem;
}
.bigNews .icon{
    float:right;
}
</style>