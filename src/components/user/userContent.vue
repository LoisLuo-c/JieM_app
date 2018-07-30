<template>
    <div class="userCon" ref="userCon">
        <div class="userCon_view">

            <div class="userInfo logined">
                <div class="userImg">
                    <img @click="clickImg()" class="userImage" src="../../assets/img/user.jpg">
                    <input @change="uploadImg($event)" type="file" multiple="multiple" name="file" id="img_upload" value="" />
                </div>
                <div class="username">
                    <span>{{username}}</span>
                </div>
            </div>
            <div class="userInfo noLogin">
                <div class="msg">
                    你还没有登录
                </div>
                <div class="toLogin">
                    <span>点击登录</span>
                    <i class="iconfont icon-jiantou"></i>
                </div>
            </div>
            <div class="cell message" @click="clickMsg">
                <span class="info ">
                    <i class="iconfont icon-xiaoxi"></i>
                    <span class="title">消息</span>
                </span>
                <span class="rightIcon">
                    <i class="iconfont icon-jiantou"></i>
                </span>
            </div>
            <div class="cell">
                <span class="info">
                    <i class="iconfont icon-gouwu"></i>
                    <span class="title">面点商城</span>
                </span>
                <span class="rightIcon">
                    <i class="iconfont icon-jiantou"></i>
                </span>
            </div>
            <div class="cell">
                <span class="info">
                    <i class="iconfont icon-shoucang"></i>
                    <span class="title">我的收藏</span>
                </span>
                <span class="rightIcon">
                    <i class="iconfont icon-jiantou"></i>
                </span>
            </div>
            <div class="cell">
                <span class="info">
                    <i class="iconfont icon-guanzhu"></i>
                    <span class="title">我关注的作者</span>
                </span>
                <span class="rightIcon">
                    <i class="iconfont icon-jiantou"></i>
                </span>
            </div>
            <div class="cell">
                <span class="info">
                    <i class="iconfont icon-zhuanjiguangpan"></i>
                    <span class="title">我收听的专辑</span>
                </span>
                <span class="rightIcon">
                    <i class="iconfont icon-jiantou"></i>
                </span>
            </div>
            <div class="cell">
                <span class="info">
                    <i class="iconfont icon-bianji"></i>
                    <span class="title">爆料</span>
                </span>
                <span class="rightIcon">
                    <i class="iconfont icon-jiantou"></i>
                </span>
            </div>
            <div class="cell">
                <span class="info">
                    <i class="iconfont icon-yijianfankui"></i>
                    <span class="title">意见反馈/举报</span>
                </span>
                <span class="rightIcon">
                    <i class="iconfont icon-jiantou"></i>
                </span>
            </div>
            <div class="cell exit_login" @click="exitLogin()">
                <span class="info ">
                    <span class="title">退出登录</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import BScroll from "better-scroll";
import config from "../../base/config";
import { MessageBox } from "mint-ui";
export default {
  name: "userContent",
  data() {
    return {
      username: "",
      file: "",
      UserImage: null,
      src1: require("../../assets/img/user.jpg")
    };
  },
  methods: {
    btnCss() {
      $(".cell").bind("touchstart", function(e) {
        $(this).css("background", "#e4e3e3");
      });
      $(".cell").bind("touchend", function(e) {
        $(this).css("background", "#ffffff");
      });
    },
    clickImg() {
      $("#img_upload").click();
    },
    uploadImg(e) {
      this.file = e.target.files[0];
      e.preventDefault();
      let formData = new FormData();
      formData.append("file", this.file);

      let configs = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      this.axios
        .post(config.server + config.port.user.uploadfile, formData, configs)
        .then(response => {
          if (response.request.status == 200) {
            $(".userImage").attr("src", response.data.fileName);
            //成功之后就更新用户头像
            let titleImage = response.data.fileName;
            let userId = localStorage.getItem("userId");
            this.axios
              .post(config.server + config.port.user.updateUserImg, {
                id: userId,
                titleImage: titleImage
              })
              .then(response => {
                console.log("tupianchengg");
                console.log(response);
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    toSroll() {
      this.slider = new BScroll(this.$refs.userCon, {
        scrollX: false,
        scrollY: true,
        bounce: false,
        click: true
      });
    },
    toLogin() {
      var me = this;
      $(".userCon .toLogin").on("click", function() {
        me.$router.push({ path: "login" });
      });
    },
    getUser() {
      var token = localStorage.getItem("token");
      if (token != null) {
        this.username = localStorage.getItem("username");
        let userId = localStorage.getItem("userId");
        $(".logined").show();
        $(".noLogin").hide();
        this.axios
          .get(config.server + config.port.user.getone, {
            params: { id: userId }
          })
          .then(response => {
            if (response.data[0].userImage != null) {
              $(".userImage").attr("src", response.data[0].userImage);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    clickMsg() {
      this.$router.push({ name: "usermsg" });
    },
    exitLogin() {
      MessageBox.confirm("确定退出登录?")
        .then(action => {
          localStorage.removeItem("userId");
          localStorage.removeItem("token");
          $(".logined").hide();
          $(".noLogin").show();
        })
        .catch(error => {});
    }
  },
  mounted() {
    this.getUser();
    this.btnCss();
    this.toSroll();
    this.toLogin();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.userCon {
  width: 100%;
  height: 93%;
}
.userCon_view {
  width: 100%;
  height: auto;
}
/*****User*****/
.userInfo {
  width: 100%;
  height: 13rem;
  border-bottom: 0.5rem solid #ecebea;
  text-align: center;
}
.msg {
  position: relative;
  top: 5rem;
}
.toLogin {
  position: relative;
  top: 5.5rem;
  display: inline;
  padding: 0.3rem;
  border: 0.1rem solid #d5d2d1;
  border-radius: 0.5rem;
}
.toLogin i {
  font-size: 0.8rem;
}
/*****Cell设置*****/
.userCon .cell {
  position: relative;
  height: 3.3rem;
  width: 100%;
  border-bottom: 1px solid #d5d2d1;
  border-top: 1px dotted #d5d2d1;
}
.userCon .cell .info {
  font-size: 1rem;
  line-height: 3.3rem;
  margin-left: 1rem;
}
.userCon .cell i {
  font-size: 1.2rem;
  margin-right: 0.5rem;
}
.userCon .cell .rightIcon {
  position: absolute;
  left: 93%;
  line-height: 3.1rem;
  /* top: 1rem; */
}
.userCon .cell .rightIcon i {
  font-size: 0.8rem;
}
.exit_login {
  text-align: center;
  color: red;
}
/***已登录设置****/
.logined .userImg {
  position: relative;
  top: 3.3rem;
  display: inline-block;
  width: 4.5rem;
  height: 4.5rem;
  border: 1px solid #d5d2d1;
  border-radius: 10rem;
  overflow: hidden;
}
.logined .username {
  font-size: 1.1rem;
  top: 3.6rem;
  position: relative;
  display: inline-block;
  width: 100%;
}
.logined .userImg img {
  width: 4.5rem;
  height: 4.5rem;
}
/****登录和未登录****/
.logined {
  display: none;
  text-align: center;
}
</style>