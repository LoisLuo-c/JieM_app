<template>
  <div class="usermsg">
    <div class="header">
      <span class="back" @click="goback()">
        <i class="iconfont icon-jiantou3"></i>
      </span>
      <span class="headertitle">
        我的消息
      </span>
      <span class="editor" @click="showBottom">编辑</span>
      <span class="cannelEditor" @click="showEditor">取消</span>
    </div>
    <div class="newsView" ref="msgView">
      <div class="newsList">
        <div class="refresh">刷新中...</div>
        <div class="msgItem" v-for="(newsItem,index) in message" :key="index" :data-contentid="newsItem.content_id" @click="tonews(newsItem.content_id)">
          <msgitem :newsItem="newsItem" />
        </div>
        <div class="noresource">暂无数据</div>
        <div class="loadmore">加载中...</div>
        <div class="nomore">没有更多了</div>
        <div class="space"></div>
      </div>
    </div>

    <div class="bottomInfo">
      <div class="noselect" @click="noselect()">全不选</div>
      <div class="selectall" @click="selectAll">全选</div>
      <div class="delete">删除</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import config from "../../base/config";
import BScroll from "better-scroll";
import msgItem from "./userMsgItem";
import { Indicator} from "mint-ui";
Vue.component("msgitem", msgItem);
export default {
  name: "usermsg",
  data() {
    return {
      message: [],
      selReplyId: [],
      selPraiseId: [],
      showtonew:true,

      currentPage:1,
      nomore: false,
      loadmore: false,
      refresh: false,
    };
  },
  methods: {
    toSroll() {
      let me=this;
      this.slider = new BScroll(this.$refs.msgView, {
        scrollX: false,
        scrollY: true,
        click: true,
       pullDownRefresh: {
          threshold: 50, // 当下拉到超过顶部 30px 时，
          },
          pullUpLoad: {
            threshold: -20
          }
        });
        //下拉加载
        this.slider.on("pullingDown", () => {
         $(".refresh").show();
          me.currentPage = 1;
          me.nomore = false;
          $(".nomore").hide();
          me.refresh = true;
          me.getList();
          me.slider.finishPullDown();
      });
      //上啦刷新
      this.slider.on("pullingUp", () => {
        if (me.nomore == false) {
          $(".loadmore").show();
          me.refresh = false;
          me.currentPage += 1;
          me.getList();
        }
         me.slider.finishPullUp();
      });
    },
    getList() {
      let me = this;
      let num=7;
      let userId=localStorage.userId;
      Indicator.open();
      // let userId = 4;
      this.axios
        .get(config.server + config.port.user.userMsg, {
          params: {
            userId: userId,
            num:num,current_page:this.currentPage
          }
        })
        .then(response => {

          if (this.refresh == true) {
            this.message = [];
          }
          for(let i=0;i<response.data.length;i++){
            this.message.push(response.data[i])
          }

          if(response.data.length==0&&this.currentPage==1){
            $(".noresource").show();
          }else{
             $(".noresource").hide();
          }

          //加载完成之后就把加载中取消掉
          $(".loadmore").hide();
          //没有更多了
          if (response.data.length < 7) {
            $(".nomore").show();
            this.nomore = true;
          }
          $(".refresh").hide();

          Indicator.close();
        })
        .catch(error => {
          console.log(error);
        });
    },
    //显示编辑两个字
    showEditor() {
      let me = this;
      this.showtonew=true;
      this.selReplyId = [];
      this.selPraiseId = [];
      me.$nextTick(function() {
        let checkBox = document.getElementsByClassName("checkBox");
        $(checkBox).each(function(index, el) {
          $(checkBox)
            .children()
            .eq(index)
            .removeClass("icon-yuangongqudaoAPP-fuxuankuangxuanzhong")
            .addClass("icon-yuangongqudaoAPP-fuxuankuangweixuanzhong");
        });
        $(checkBox).hide();
      });
      $(".cannelEditor").hide();
      $(".bottomInfo").hide();
      $(".noselect").hide();
      $(".selectall").show();
      $(".editor").show();
      //底部撑开的空间
      $(".space").show();
    },
    //出现底部按钮
    showBottom() {
      let me = this;
      this.showtonew=false;
      this.selReplyId = [];
      this.selPraiseId = [];
      me.$nextTick(function() {
        let checkBox = document.getElementsByClassName("checkBox");
        $(checkBox).show();
      });
      $(".editor").hide();
      $(".bottomInfo").show();
      $(".cannelEditor").show();
      $(".space").hide();
    },

    //全不选
    noselect() {
      let me = this;
      // .icon-yuangongqudaoAPP-
      this.selReplyId = [];
      this.selPraiseId = [];
      me.$nextTick(function() {
        let checkBox = document.getElementsByClassName("checkBox");
        $(checkBox).each(function(index, el) {
          $(checkBox)
            .children()
            .eq(index)
            .removeClass("icon-yuangongqudaoAPP-fuxuankuangxuanzhong")
            .addClass("icon-yuangongqudaoAPP-fuxuankuangweixuanzhong");
        });
      });
      $(".noselect").hide();
      $(".selectall").show();
      $(".delete").removeClass("deletebtn");
    },
    selectAll() {
      let me = this;
      // .icon-yuangongqudaoAPP-fuxuankuangxuanzhong
      me.$nextTick(function() {
        let checkBox = document.getElementsByClassName("checkBox");
        $(checkBox).each(function(index, el) {
          $(checkBox)
            .children()
            .eq(index)
            .removeClass("icon-yuangongqudaoAPP-fuxuankuangweixuanzhong")
            .addClass("icon-yuangongqudaoAPP-fuxuankuangxuanzhong");
          if (
            $(checkBox)
              .eq(index)
              .data().replyorpraise == 1
          ) {
            me.selReplyId.push(
              $(checkBox)
                .eq(index)
                .data().msgid
            );
          } else {
            me.selPraiseId.push(
              $(checkBox)
                .eq(index)
                .data().msgid
            );
          }
        });
      });
      $(".selectall").hide();
      $(".noselect").show();
      $(".delete").addClass("deletebtn");
    },
    //单个选和删除
    selectItem() {
      let me = this;
      me.$nextTick(function() {
        //一个一个选择
        $(document).on("click", ".checkBox", function() {
          if (
            $(this)
              .children()
              .hasClass("icon-yuangongqudaoAPP-fuxuankuangweixuanzhong")
          ) {
            $(this)
              .children()
              .removeClass("icon-yuangongqudaoAPP-fuxuankuangweixuanzhong")
              .addClass("icon-yuangongqudaoAPP-fuxuankuangxuanzhong");
            me.selReplyId.push(1);
          } else {
            $(this)
              .children()
              .removeClass("icon-yuangongqudaoAPP-fuxuankuangxuanzhong")
              .addClass("icon-yuangongqudaoAPP-fuxuankuangweixuanzhong");
            me.selReplyId.pop();
          }
          //判断显不显示删除
          if (me.selReplyId.length > 0||me.selPraiseId.length > 0) {
            $(".delete").addClass("deletebtn");
          } else {
            $(".noselect").hide();
            $(".selectall").show();
            $(".delete").removeClass("deletebtn");
          }
        });
        //点击删除按钮
        $(".delete").on("click", function() {
          if ($(".delete").hasClass("deletebtn")) {
            let checkBox = document.getElementsByClassName("checkBox");
            //先把置空
            me.selReplyId = [];
            me.selPraiseId = [];
            //把选择的标签的子集放在一个数组里，以便each
            let arr = [];
            $(checkBox).each(function(index, el) {
              arr.push(
                $(checkBox)
                  .children()
                  .eq(index)
              );
            });
            $(arr).each(function(index) {
              //把已选择的标签的browse_id存起来
              if (
                $(arr)
                  .eq(index)[0]
                  .hasClass("icon-yuangongqudaoAPP-fuxuankuangxuanzhong")
              ) {
                if (
                  $(checkBox)
                    .eq(index)
                    .data().replyorpraise == 1
                ) {

                  me.selReplyId.push(
                    $(checkBox)
                      .eq(index)
                      .data().msgid
                  );
                } else {
                  me.selPraiseId.push(
                    $(checkBox)
                      .eq(index)
                      .data().msgid
                  );
                }
              }
            });
            me.doremove();
          }
        });
      });
    },
    doremove() {
      var me=this;
      if(this.selReplyId.length>0){
        this.axios
        .post(config.server + config.port.reply.remove, {
            ids:this.selReplyId 
        })
        .then(response => {
         
        })
        .catch(error => {
          console.log(error);
        });
      }
      if(this.selPraiseId.length>0){
        this.axios
        .post(config.server + config.port.praise.remove, {
            ids:this.selPraiseId 
        })
        .then(response => {
        })
        .catch(error => {
          console.log(error);
        });
      }
      location.reload()
    },
    goback(){
      this.$router.go(-1);
    },
    //点击显示新闻
    tonews(contentId){
      if(this.showtonew==true){
        localStorage.setItem("articleId",contentId);
      this.$router.push({name:'pageview'});
      }
      
    }
    
  },
  mounted() {
    this.getList();
    this.toSroll();
    this.selectItem();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.usermsg {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: white;
  z-index: 3;
}
.header {
  width: 100%;
  height: 6%;
  border-bottom: 1px solid #a0a2a3;
  background-color: #e5eaec;
  overflow: hidden;
  /* text-align: center; */
  line-height: 2.5rem;
}
.header .back {
  float: left;
  margin-left: 1rem;
  width: 37%;
  height: 100%;
  line-height: 2.5rem;
}
.header .back i::before {
  font-size: 1.2rem;
}
.newsView {
  width: 100%;
  height: 94%;
  position: absolute;
  overflow: hidden;
}
.newsList {
  width: 100%;
  height: auto;
}
.msgItem {
  width: 100%;
  height: auto;
  overflow: hidden;
}

.editor {
  float: right;
  color: #0b96b6;
  margin-right: 1rem;
}
.cannelEditor {
  display: none;
  float: right;
  color: #0b96b6;
  margin-right: 1rem;
}
.bottomInfo {
  display: none;
  position: fixed;
  bottom: 0;
  background-color: #e5eaec;
  width: 100%;
  height: 7%;
}
.selectall {
  float: left;
  margin: 0.8rem 1rem;
  color: #0b96b6;
}
.noselect {
  display: none;
  float: left;
  margin: 0.8rem 1rem;
  color: #0b96b6;
}
.delete {
  float: right;
  color: #bbbebf;
  margin: 0.8rem 1rem;
}
.deletebtn {
  color: #0b96b6;
}
.noresource{
  display: none;
  width: 100%;
  height: 5rem;
  margin-top: 3rem;
  text-align: center;
  color: #696a6b;
}
.space {
  display: none;
  width: 100%;
  height: 3rem;
}
.loadmore {
  display: none;
  width: 100%;
  height: 1.5rem;
  text-align: center;
}
.nomore {
  display: none;
  width: 100%;
  height: 3rem;
  margin: 1rem;
  text-align: center;
}
.refresh {
  display: none;
  width: 100%;
  height: 1.3rem;
  text-align: center;
}
</style>