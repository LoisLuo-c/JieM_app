<template>
  <div class="pageView" ref="pageView">

    <div class="ViewBox" ref="ViewBox">
      <div class="title">
        <p>{{content.title}}</p>
      </div>
      <div class="info">
        <span class="author">{{content.author}}</span>
        <span class="time">{{content.time}}</span>
      </div>
      <div class="subtitle">{{content.subTitle}}</div>
      <div class="titleImage">
        <img :src="content.titleImage" alt="">
      </div>
      <!-- 内容区 -->
      <div class="contentText" v-html="content.contentText">{{content.contentText}}</div>
      <!-- 评论区 -->
      <div class="commentBox">
        <div class="commentNum">
          一共有<span>{{content.comment}}</span>条评论
        </div>
        <div v-for="(commentItem,index) in comments" :key="index">
          <comment v-bind:commentItem="commentItem" />
        </div>
       
        <div class="loadmore" @click="clickloadmore()">点击加载更多</div>
        <div class="nomore">没有更多了</div>
      </div>
       <div class="noresource">暂无评论</div>
      <!-- <div class="nomore">
        没有更多了~
      </div> -->
      <!-- <div class="loadmore">点击加载更多</div> -->
      <div class="kong">
      </div>

    </div>
    <div class="pagefooter">
      <div class="back">
        <i class="iconfont icon-arrow-left"></i>
      </div>
      <div class="toComment" @click="toComment()">
        <i class="iconfont icon-weibiaoti-"></i>
        我要回复
      </div>
    </div>
  </div>

</template>

<script>
import Vue from "vue";
import config from "../../base/config";
import BScroll from "better-scroll";
import { Indicator} from "mint-ui";
import Comment from "./comment";

Vue.component("comment", Comment);
export default {
  name: "pageview",
  props:["closePageView"],
  data() {
    return {
      content: [],
      comments: [],
      currentPage:1,
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };
  },
  watch: {
    contentId: function() {}
  },
  methods: {
    getOne: function() {
       Indicator.open('加载中...');
      let contentId = localStorage.getItem("articleId");
      this.axios
        .get(config.server + config.port.content.getOne, {
          params: {
            id: contentId
          }
        })
        .then(response => {
          this.content = response.data[0];
          Indicator.close();
        })
        .catch(error => {
          console.log(error);
        });
    },
    toSroll() {
      this.slider = new BScroll(this.$refs.pageView, {
        scrollX: false,
        scrollY: true,
        bounce: false,
        click: true
      });
    },
    clickback() {
      var me = this;
      $(".back").on("click", function() {
        me.$router.go(-1);
        $(".pageView").animate({ left: 100 + "%" });
      });
    },
    getComment() {
      let contentId = localStorage.getItem("articleId");
      this.axios
        .get(config.server + config.port.comment.getCommentContent, {
          params: {
            id: contentId,
            current_page: this.currentPage,
            num: 4,
          }
        })
        .then(response => {
          $(".loadmore").show();
          for(let i=0;i<response.data.length;i++){
            this.comments.push(response.data[i])
          }

          if(response.data.length==0&&this.currentPage==1){
            $(".noresource").show();
             $(".nomore").hide();
             $(".loadmore").hide();
          }else{
             $(".noresource").hide();
          }
          //没有更多了
          if (response.data.length < 4&& this.currentPage!=1) {
            $(".nomore").show();
            $(".loadmore").hide();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    toComment() {
        let token=localStorage.token;
        if(token==undefined){
           this.$router.push({ name: "login" });
        }else{
          this.$router.push({ path: "/inputbox" });
        }
        
      
    },
    clickloadmore(){
      this.currentPage++;
      this.getComment();
      
    }
  },
  mounted() {
    $(".pageView").animate({ left: 0 });
    console.log("dadadda");
    // $(".pageView").width(this.width);
    // $(".pageView").height(this.height);
    this.getOne();
    this.toSroll();
    this.clickback();
    this.getComment();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pageView {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 3;
  top: 0;
  left: 100%;
  background-color: white;
}
.ViewBox {
  width: 100%;
  height: auto;
  overflow: hidden;
}
.pageView .title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1rem;
}
.pageView .info {
  font-size: 0.8rem;
  margin: 1rem;
  color: #6c6c6c;
}
.pageView .subtitle {
  font-size: 0.9rem;
  margin: 1rem;
  color: #434343;
}
img {
  width: 100px;
  height: auto;
}
.pageView .titleImage img {
  width: 100%;
  height: auto;
}
.pageView .contentText {
  font-size: 1.1rem;
  margin: 1rem;
}
.commentBox {
  overflow: hidden;
}
.pageView .back i {
  font-size: 1.5rem;
}
.commentNum{
 font-weight: 600;
 margin-left: 1rem;
}
.kong {
  width: 100%;
  height: 4.3rem;
  overflow: hidden;
}
.pagefooter {
  position: fixed;
  bottom: 0;
  border-top: 1px solid #a0a2a3;
  background-color: #e5eaec;
  width: 100%;
  height: 3.3rem;
  overflow: hidden;
}
.back {
  float: left;
  width: 49%;
  line-height: 3.3rem;
}
.back i::before {
  margin-left: 1rem;
  font-size: 2.5rem;
}
.toComment {
  text-align: center;
  float: left;
  width: 49%;
  color: #3c3d3e;
  line-height: 3.3rem;
  border-left: 1px solid #a0a2a3;
}
.toComment i {
  font-size: 1.2rem;
  margin-right: 0.3rem;
}
.nomore {
  display: none;
  text-align: center;
  font-size: 0.9rem;
  color: dimgrey;
  margin: 0.5rem 0 2rem;
}
.loadmore {
  display: none;
  text-align: center;
  font-size: 0.9rem;
  color: dimgrey;
  margin: 0.5rem 0 2rem;
}
.noresource{
  display: none;
  width: 100%;
  height: 5rem;
  margin: 2rem 0;
  text-align: center;
  color: #696a6b;
}
</style>