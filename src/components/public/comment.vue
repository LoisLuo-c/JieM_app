<template>
  <div class="commentItem">
    <div class="userImg">
      <img class="userImage"  :src="commentItem.userImage==null?'static/user.jpg':commentItem.userImage" alt="">
    </div>
    <div class="commentBody">
      <div class="commentHeader">
        <div class="username">
          {{commentItem.username}}
        </div>
      </div>
      <div class="commentText">
        {{commentItem.comment_text}}
      </div>
      <div v-bind:class="[replyA, 'totalreply'+classB]">
        共有条<span>{{commentItem.reply}}</span>回复
      </div>

      <div class="footer">
        <div class="time">{{commentItem.time}}</div>
        <div class="praise">
          <i class="iconfont icon-dianzan" @click="clickPraise($event)" :data-commentid="commentItem.id" :data-commentuserid="commentItem.userId"></i>

          <span class="praiseNum">{{commentItem.praise}}</span>
        </div>
        <div v-bind:class="[classA, 'content'+classB]" :data-userid="commentItem.userId">
          <i class="iconfont icon-weibiaoti-"></i>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Vue from "vue";
import config from "../../base/config";
// import func from './vue-temp/vue-editor-bridge';
export default {
  name: "comment",
  props: ["commentItem"],
  data() {
    return {
      userid: "",
      classA: "toReply",
      classB: this.commentItem.id,
      replyA: "totalReply"
    };
  },
  methods: {
    showreplydiv() {
      this.$nextTick(function() {
        if (this.commentItem.reply == 0) {
          let str = "totalreply" + this.commentItem.id;
          let el = document.getElementsByClassName(str);
          $(el).hide();
        }
      });
    },
    doReply() {
      let me = this;
      let str = "content" + this.commentItem.id;
      let el = document.getElementsByClassName(str);
      $(el).on("click", function() {
        let userId = this.dataset.userid;
        me.$router.push({
          name: "inputbox",
          params: {
            userId: userId,
            username: me.commentItem.username,
            commentId: me.commentItem.id
          }
        });
      });
    },
    showReply() {
      let me = this;
      let str = "totalreply" + this.commentItem.id;
      let el = document.getElementsByClassName(str);
      $(el).on("click", function() {
        me.$router.push({
          name: "replyview",
          params: { commentItem: me.commentItem }
        });
      });
    },
    clickPraise(e) {
      this.$nextTick(function() {
        if ($(e.target).hasClass("praised")) {
          console.log("已点赞");
        } else {
          let me = this;
          let userId = localStorage.userId;
          let commentId = e.target.dataset.commentid;
          let commentUserId = e.target.dataset.commentuserid;
          let data = {
            userId: userId,
            commentId: commentId,
            commentUserId: commentUserId
          };
          $(e.target).addClass("praised");
          let str = $(e.target)
            .siblings()
            .text();
          let num = parseInt(str) + 1;
          $(e.target)
            .siblings()
            .text(num);
          this.axios
            .post(config.server + config.port.praise.create, {
              userId: userId,
              commentId: commentId,
              commentUserId: commentUserId
            })
            .then(function(response) {
              //成功就更新点赞数
              me.axios
                .post(config.server + config.port.comment.updatePraiseNum, {
                  id: commentId
                })
                .then(function(response) {})
                .catch(function(error) {
                  console.log(error);
                });
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });
    },
    //检查已登录的用户点赞了哪条comment，并改变点赞颜色
    checkPraise() {
      let me = this;
      this.$nextTick(function() {
        let userId = localStorage.userId;
        me.axios
          .get(config.server + config.port.praise.getpraise)
          .then(function(response) {
            let r = response.data;
            //拿到praise的表单，如果登录的用户有点赞行为，在表单中找到点赞的用户进行匹配
            for (let i = 0; i < r.length; i++) {
              if (r[i].userId == userId) {
                let praiseItem = document.getElementsByClassName(
                  "icon-dianzan"
                );

                for (let j = 0; j < praiseItem.length; j++) {
                  if (praiseItem[j].dataset.commentid == r[i].commentId) {
                    $(praiseItem[j]).addClass("praised");
                  }
                }
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    }
  },
  mounted() {
    this.doReply();
    this.showReply();
    this.checkPraise();
    this.showreplydiv();
  },
  beforeCreate() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.commentItem {
  width: 100%;
  height: auto;
  overflow: hidden;
  margin-top: 1rem;
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
.userImg img {
  width: 3rem;
  height: 3rem;
}
.commentBody {
  float: left;
  width: 75%;
  height: auto;
}
.commentHeader .username {
  color: #323131;
  font-size: 0.9rem;
}
.commentText {
  margin: 0.5rem 0 0.7rem;
}
.totalReply {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  background-color: #e7e8e8;
  padding: 0.3rem;
  color: #057fb7;
}
.footer .time {
  float: left;
  font-size: 0.8rem;
  color: #58595a;
}
.footer i {
  font-size: 1.2rem;
}
.praise {
  float: right;
  color: #58595a;
}
.toReply {
  margin: 0 1rem 0 0;
  float: right;
  color: #58595a;
}
.praised {
  color: red;
}
</style>