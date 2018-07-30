<template>
    <div class="register">
        <div class="registerView">
            <div class="header">
                <div class="headerBox">
                    <i class="iconfont icon-jiantouarrowhead7" @click="goback()"></i>
                    <span class="title">注 册</span>
                </div>
            </div>
            <div class="registerBox">
                <div class="username bor">
                    <mt-field label="用户名" placeholder="3-12个字符的组合" v-model="username" :state="usernamestate"></mt-field>
                </div>
                <div class="password bor">
                    <mt-field label="密码" placeholder="6-16个英文、数字、特殊字符组合" type="password" v-model="password" :state="passwordstate">

                    </mt-field>
                </div>
                <div class="password2 bor">
                    <mt-field label="确认密码" placeholder="请再次输入密码" type="password" v-model="password2" :state="password2state">

                    </mt-field>
                </div>

                <div class="register" @click="toregister()">
                    <span>注 册</span>
                </div>
                <div class="footer">
                    <span>已有帐号？</span>
                    <span class="tologin">现在登录</span>
                </div>
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
  name: "register",
  data() {
    return {
      message: "community",
      username: "",
      password: "",
      password2: "",
      usernamestate: "",
      passwordstate: "",
      password2state: ""
    };
  },
  watch: {
    username(val) {
      if (val.length > 2 && val.length < 12) {
        this.usernamestate = "success";
      } else {
        this.usernamestate = "";
      }
    },
    password(val) {
      let reg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,16}$/;
      if (!reg.test(val)) {
        this.passwordstate = "";
      } else {
        this.passwordstate = "success";
      }
    },
    password2(val) {
      if (val == this.password&&val!="") {
        this.password2state = "success";
      } else {
        this.password2state = "";
      }
    }
    
  },
  methods: {
    tologin() {
      var me = this;
      $(".tologin").on("click", function() {
        me.$router.push({ path: "login" });
      });
    },
    toregister() {
      if (
        this.usernamestate == "success" &&
        this.passwordstate == "success" &&
        this.password2state == "success"
      ) {
         this.axios
        .post(config.server + config.port.doregister, {
            username: this.username,
            password: this.password,
        })
        .then(response => {
              this.$router.go(-1);
        })
        .catch(error => {
          console.log(error);
        });
      }
    },
    goback() {
         this.$router.go(-1);
    }
  },

  mounted() {
    this.tologin();
    //   this.verfstate();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.registerView .header {
  height: 3.3rem;
  border-bottom: 1px solid #d5d2d1;
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 3.3rem;
}
.registerView .headerBox {
  width: 90%;
}
.registerView .header .title {
  line-height: 3.3rem;
}
.registerView .header i {
  font-size: 1.2rem;
  float: left;
  line-height: 3.3rem;
  margin-left: 1rem;
  color: #928f8f;
}
.registerBox {
  width: 84%;
  margin-left: 8%;
}
.registerBox .bor {
  border-bottom: 1px solid #d5d2d1;
}
.registerView .register {
  width: 84%;
  height: 3rem;
  background-color: #cecac9;
  border-radius: 1.3rem;
  text-align: center;
  margin: 3rem 8% 2rem;
}
.registerView .register span {
  font-size: 1.1rem;
  color: #414040;
  line-height: 3rem;
}
.registerView .footer {
  text-align: center;
}
.registerView .footer span {
  font-size: 0.8rem;
  color: #787675;
  margin: 0 0.3rem;
}
</style>