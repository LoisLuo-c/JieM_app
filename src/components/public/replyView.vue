<template>
  <div class="replyList" :style="{width:width+'px',height:height+'px'}">
    <div class="space">
      ---------
    </div>
    <div class="replyslider" ref="replyslider">
      <div class="replys" ref="replys">
        <div class="commentItem">
          <div class="userImg">
            <img class="userImage"  :src="commentItem.userImage==null?'static/user.jpg':commentItem.userImage" alt="">
          </div>
          <div class="commentBody">
            <div class="commentHeader">
              <div class="username">{{commentItem.username}}</div>
            </div>
            <div class="content">
              <div class="contentText">{{commentItem.comment_text}}</div>
            </div>
            <div class="footer">
              <div class="time">{{commentItem.time}}</div>
              <div class="praise">
                <i class="iconfont icon-dianzan"></i>
                <span class="praiseNum">{{commentItem.praise}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="replyBox">
          <div class="replyb" v-for="(replyItem,index) in reply" :key="index">
            <replyItem v-bind:replyitem="replyItem" />
          </div>
        </div>
      </div>
    </div>
     <div class="header">
          <span class="back">
            <i class="iconfont icon-arrow-left"></i>
          </span>
        </div>
  </div>
</template>

<script>
import Vue from "vue";
import BScroll from "better-scroll";
import reply from "./reply";
import config from "../../base/config";
Vue.component("replyItem", reply);

export default {
  name: "replyview",
  data() {
    return {
      message: "supermarket",
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      reply: [],
      commentItem: this.$route.params.commentItem
    };
  },
  methods: {
    getList() {
      let commentId = this.commentItem.id;
      this.axios
        .get(config.server + config.port.reply.getReply, {
          params: {
            id: commentId
          }
        })
        .then(response => {
          this.reply = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    clickback() {
      var me = this;
      $(".back").on("click", function() {
        me.$router.go(-1);
        // $(".pageView").animate({ left: 100 + "%" });
      });
    },
    toSroll() {
      this.slider = new BScroll(this.$refs.replyslider, {
        scrollX: false,
        scrollY: true,
        bounce: false,
        click: true
      });
    },
     
    
  },
  mounted() {
    this.getList();
    this.clickback();
    this.toSroll();
  },
  beforeCreate() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.space{
  width: 100%;
  height: 6%;
}
.replyList {
  position: relative;
  z-index: 4;
}
.replyslider {
  width: 100%;
  height: 100%;
}
.replys {
  width: 100%;
  height: auto;
  overflow: hidden;
}
.header {
  width: 100%;
  height: 6%;
  position: fixed;
  top: 0;
  border-bottom: 1px solid #a0a2a3;
  background-color: #e5eaec;
  overflow: hidden;
}
.back {
  float: left;
  margin-left: 0.5rem;
  width: 49%;
  height: 100%;
  line-height: 2.5rem;
}
.back i::before {
  font-size: 1.7rem;
}
.replyBox {
  background-color: #f0f0f0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  float: left;
  margin-top: 1rem;
}
/****评论设置******/
.commentItem {
  width: 100%;
  height: auto;
  padding: 1rem 0;
}

.commentBody {
  float: left;
  width: 75%;
  height: auto;
}
.userImg {
  width: 3rem;
  height: 3rem;
  background-color: yellow;
  float: left;
  margin: 0 1rem;
  border-radius: 5rem;
  overflow: hidden;
}
.userImg img{
  width: 3rem;
  height: 3rem;
}
.praise {
  float: right;
}
.commentHeader .username {
  color: #323131;
  font-size: 0.9rem;
}
.time {
  float: left;
  font-size: 0.8rem;
  color: #58595a;
}
.content .contentText {
  margin: 0.5rem 0 0.7rem;
}
</style>
