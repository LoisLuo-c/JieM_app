<template>
  <div class="inputBox" :style="{width:width+'px',height:height+'px'}">
    <div class="header">
      <span class="back">
        <i class="iconfont icon-jiantou3"></i>
      </span>
    </div>
    <div class="textarea">
      <div class="title">

      </div>
      <div class="textareaBox">
        <textarea name="" id="" cols="40" rows="5" placeholder="请输入">

        </textarea>
      </div>
      <div class="limitNu">最少输入5个字</div>
      <div class="inputBtn">
        <div class="inputB">
          <span>提 交</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Vue from "vue";
import config from "../../base/config";
export default {
  name: "inputbox",
  data() {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      userId: this.$route.params.userId,
      username: this.$route.params.username,
      commentId: this.$route.params.commentId,
      isvideo:this.$route.params.isvideo
    };
  },
  methods: {
    clickback() {
      var me = this;
      $(".back").on("click", function() {
        me.$router.go(-1);
        $(".pageView").animate({ left: 100 + "%" });
      });
    },
    doReply() {
      var me = this;
      var userId = localStorage.userId;
      // updateReplyNum
      $(".inputBtn").on("click", function() {
        var text = $(".textareaBox textarea").val();
        me.axios
          .post(config.server + config.port.reply.doReply, {
            reply_text: text,
            userId: userId,
            commentId: me.commentId,
            commentUserId: me.userId
          })
          .then(function(response) {
            me.axios
              .post(config.server + config.port.comment.updateReplyNum, {
                id: me.commentId
              })
              .then(function(response) {
                me.$router.go(-1);
              })
              .catch(function(error) {
                console.log("数据添加失败");
                console.log(error);
              });
          })
          .catch(function(error) {
            console.log("数据添加失败");
            console.log(error);
          });
      });
    },
    doComment() {
      let me = this;
       let video_id = undefined;
      let contentId = localStorage.getItem("articleId");
      var userId = localStorage.userId;
      $(".inputBtn").on("click", function() {
        var comment_text = $(".textareaBox textarea").val();
        me.axios
          .post(config.server + config.port.comment.doComment, {
            userId: userId,
            comment_text: comment_text,
            content_id: contentId,
            video_id: video_id
          })
          .then(function(response) {
            //更新文章的评论数量
            let  conId = localStorage.getItem("articleId");
            
            me.axios
              .post(config.server + config.port.content.updateComment, {
                id: conId,
              })
              .then(function(response) {
                me.$router.go(-1);
              })
              .catch(function(error) {
                console.log(error);
              });
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    }
  },
  mounted() {
    this.clickback();
    if (this.username != undefined) {
      this.doReply();
    } else {
      this.doComment();
      console.log("comment");
    }
  },
  beforeCreate() {
    this.userId = this.$route.params.userId;
    this.username = this.$route.params.username;
    this.commentId = this.$route.params.commentId;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inputBox {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 3;
  top: 0;
  background-color: #f0edec;
}
.header {
  width: 100%;
  height: 6%;
  border-bottom: 1px solid #a0a2a3;
  background-color: #e5eaec;
  overflow: hidden;
}
.inputBox .back {
  float: left;
  margin-left: 0.5rem;
  width: 49%;
  height: 100%;
  line-height: 2.5rem;
}
.inputBox .back i::before {
  font-size: 1.2rem;
}
.textarea textarea {
  outline: none;
  border: 0px;
  resize: none;
  overflow-x: hidden;
  overflow-y: hidden;
  margin: 0.7rem 1.2rem;
}
.textareaBox {
  border-top: 1px solid #a0a2a3;
  border-bottom: 1px solid #a0a2a3;
  background-color: white;
}
.limitNu {
  font-size: 0.8rem;
  margin-left: 1.2rem;
}
.inputBtn {
  text-align: center;
  margin-top: 1rem;
}
.inputB {
  display: inline-block;
  width: 90%;
  background-color: #36ca2e;
  border-radius: 7px;
}
.inputB span {
  color: white;
  line-height: 2.5rem;
  font-size: 1.1rem;
}
</style>