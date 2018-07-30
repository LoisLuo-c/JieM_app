<template>
  <div class="loginView">
     <div class="header">
        <div class="headerInfo">
          <span class="back"><i class="iconfont icon-jiantouarrowhead7"></i></span>
            
            <span class="title">登 录</span>
        </div>
     </div>
     <div class="loginBox">
         <form action="">
         <div class="username">
             <mt-field label="帐号" placeholder="请输入用户名" v-model="username"></mt-field>
         </div>
        <div class="password">
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        </div>
        <div class="error">帐号或密码错误</div>
        <div class="loginBtn" @click="doLogin()">
            <span>登录</span>
        </div>
        </form>
        <div class="footer">
            <span class="toregister">现在注册</span>
            <span class="bar">|</span>
            <span class="forgetpw">忘记密码</span>
        </div>
     </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Field } from "mint-ui";
import config from "../../base/config";

Vue.component(Field.name, Field);

export default {
  name: "login",
  data() {
    return {
      message: "user",
      username: "",
      password: ""
    };
  },
  methods: {
    doLogin() {
      let me=this;
        $(".error").hide();
       this.axios.post(config.server + config.port.login.dologin,
       {
        username:me.username,password:me.password
       })
       .then(function (response) {
           console.log('aaaaaaa')
            localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId[0].id);
          localStorage.setItem("username",me.username);
          //登陸成功了就返回
           me.$router.go(-1);
         
        })
        .catch(function (error) {
          console.log("登录失败");
          console.log(error);
            $(".error").show();
        });
      
    },
    closeLogin(){
      var me=this;
      $(".back").on("click",function(){
        me.$router.go(-1)
      })
    },
    doRegister(){
      var me=this;
      $(".toregister").on("click",function(){
        me.$router.push({path:'register'})
      })
    }
  },
  mounted() {
      this.doLogin();
      this.closeLogin();
      this.doRegister();
      if(this.$route.fullPath=='/login'){
        $(".loginView").animate({"left":0})
      }
  },
  beforeCreate(){
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loginView{
position: relative;
z-index: 10;
 left: 100%;
}
.user {
  width: 100%;
  height: 100%;
}

.loginView .header {
  height: 3.3rem;
  border-bottom: 1px solid #d5d2d1;
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 3.3rem;
}
.loginView .headerInfo{
    width: 90%;
}
.loginView .header .title {
  line-height: 3.3rem;
}
.loginView .header i {
  font-size: 1.2rem;
  float: left;
  line-height: 3.3rem;
  margin-left: 1rem;
  color: #928f8f;
}
.username {
  width: 84%;
  margin-left: 8%;
  height: auto;
  border-bottom: 1px solid #d5d2d1;
}
.password {
  width: 84%;
  margin-left: 8%;
  height: auto;
  border-bottom: 1px solid #d5d2d1;
}
.error{
  display: none;
  margin-left: 2rem;
  margin-top: 0.5rem;
  color: red;
  font-size: 0.9rem;
}
.loginView .loginBtn {
  width: 84%;
  height: 3rem;
  background-color: #cecac9;
  border-radius: 1.3rem;
  text-align: center;
  margin: 3rem 8% 2rem;
}
.loginView .loginBtn span {
  font-size: 1.1rem;
  color: #414040;
  line-height: 3rem;
}
.loginView .footer {
  text-align: center;
}
.loginView .footer span {
  font-size: 0.8rem;
  color: #787675;
  margin: 0 0.3rem;
}
</style>