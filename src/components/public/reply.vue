<template>
  <div class="replyItem">
    <div class="userImg">
      <img class="userImage"  :src="replyitem.userImage==null?'static/user.jpg':replyitem.userImage" alt="">
    </div>
    <div class="replyBody">
      <div class="replyHeader">
      <div class="username">{{replyitem.username}}</div>
      
    </div>
    <div class="content">
      <div class="contentText">{{replyitem.reply_text}}</div>
    </div>
    <div class="footer">
      <div class="time">{{replyitem.time}}</div>
       <!-- <div class="praise">
            <i class="iconfont icon-dianzan"></i>
            <span class="praiseNum"></span>
          </div> -->
    </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "reply",
  props: ["replyitem"],
  data() {
    return {
      message: "supermarket"
    };
  },
  methods: {
    getList() {}
  },
  mounted() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.replyItem{
  width: 100%;
height: auto;
overflow: hidden;
margin-top: 1rem;
}
.userImg{
  width: 2.5rem;
  height: 2.5rem;
  background-color: yellow;
  float: left;
  margin: 0 1.2rem;
  border-radius: 5rem;
  overflow: hidden;
}
.userImg img{
  width: 3rem;
  height: 3rem;
}
.replyBody{
  float: left;
  width: 75%;
  height: auto;

}
.praise{
  float: right;
}
.replyHeader .username{
   color: #323131;
  font-size: 0.9rem;
}
.time{
  float: left;
font-size: 0.8rem;
color: #58595a;
}
.content .contentText{
margin: 0.5rem 0 0.7rem;
}
</style>
