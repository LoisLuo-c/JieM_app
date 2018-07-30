<template>
  <div class="msgItem">
    <div class="space"></div>
    <div class="checkBox" :data-msgid="newsItem.msgId" :data-replyorpraise="replyOrpraise">
      <i class="iconfont icon-yuangongqudaoAPP-fuxuankuangweixuanzhong"></i>
    </div>
    <div class="content">
      <div class="title">{{newsItem.username}} {{message}}</div>
      <div class="resource">来自:{{newsItem.title}}</div>
      <div class="time">{{newsItem.time}}</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "msgitem",
  props: ["newsItem"],
  data() {
    return {
      message: "",
      //reply为1，praise为0
      replyOrpraise:1
    };
  },
  methods: {
    checkMsg() {
      if(this.newsItem.reply_text==0){
        this.message="赞了你"
        this.replyOrpraise=0
      }else{
        this.message="回复了你"
        this.replyOrpraise=1
      }
    }
  },
  mounted() {
    this.checkMsg();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.msgItem{
  width: 100%;
  height: 6rem;
  border-bottom: 1px dotted #a0a2a3;
  float: left;
}

.content{
  width: 80%;
float: left;
margin: 0 1rem 1rem;
}
.resource{
  font-size: 0.9rem;
  color: #7f7d7c;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.5rem;
}
.title{
  margin: 1rem 0 0.5rem;
}
.space{
  width: 0.7rem;
  height: 6rem;
  float: left;
}
.checkBox{
  display: none;
  width: 10%;
  float: left;
  height: 6rem;
  line-height: 6rem;
}

.checkBox i{
  font-size: 1.6rem;
  float: right;
}
.icon-yuangongqudaoAPP-fuxuankuangxuanzhong{
  color: #0b96b6;
}
.time{
  font-size: 0.8rem;
  color: #7f7d7c;
}
</style>