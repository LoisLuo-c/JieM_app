<template>
  <div class="videopageView" ref="videopageView">

    <div class="ViewBox" ref="ViewBox">
      <div class="videoel">
          
          <video  @click="topaly($event)" :src="content.video" type="video/mp4">
          </video>
           <!-- <video-player  class="video-player vjs-custom-skin"
                      ref="videoPlayer"
                      :playsinline="true"
                      :options="playerOptions"
                      @play="onPlayerPlay($event)"
                      @pause="onPlayerPause($event)"
        > -->
      <!-- </video-player> -->
      </div>
      <div class="title">
        <p>{{content.title}}</p>
      </div>
      <div class="info">
        <span class="author">{{content.author}}</span>
        <span class="time">{{content.time}}</span>
      </div>
      <!-- 内容区 -->
      <div class="contentText">这里是内容，暂时还没有写</div>
      <!-- 评论区 -->
      <div class="commentBox">
        <div class="commentNum">
          一共有<span>{{content.comment}}</span>条评论
        </div>
        <div v-for="(commentItem,index) in comments" :key="index">
          <videocomment v-bind:commentItem="commentItem" />
        </div>
        <div class="loadmore" @click="clickloadmore()">点击加载更多</div>
        <div class="nomore">没有更多了</div>
      </div>
      <div class="noresource">暂无评论</div>
      <div class="kong">
      </div>

    </div>
    <div class="pagefooter">
      <div class="back">
        <i class="iconfont icon-arrow-left"></i>
      </div>
      <div class="toComment">
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
import { Header, Indicator,Loadmore } from "mint-ui";
import Comment from "../public/comment";
import { videoPlayer } from 'vue-video-player';

Vue.component(Loadmore.name, Loadmore);
Vue.component(Header.name, Header);
Vue.component("videocomment", Comment);
export default {
  name: "pageview",
  props:["closePageView"],
  data() {
    return {
      showpaly:false,
      content: "",
      comments: [],
      currentPage:1,
      videoid:this.$route.params.videoid,
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
       playerOptions: {
//        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4",
          src: ""//你的视频地址（必填）
        }],
        // poster: "poster.jpg", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
       controlBar: {
         timeDivider: true,
         durationDisplay: true,
         remainingTimeDisplay: false,
         fullscreenToggle: true  //全屏按钮
       }
      }
    };
  },
  beforeCreate(){
    
  },
  methods: {
    topaly(e){
            let at=$(e.target).attr("controls");
            if(at==undefined){
               e.target.setAttribute("controls", "controls");
            }else{
              $(e.target).removeAttr("controls");
            }
      },
    getOne: function() {
      Indicator.open('加载中...');
       let videoid=localStorage.getItem("videoid")
      this.axios
        .get(config.server + config.port.video.getOne, {
          params: {
            id: videoid
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
      this.slider = new BScroll(this.$refs.videopageView, {
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
        $(".videopageView").animate({ left: 100 + "%" });
      });
    },
    getComment() {
      let videoid=localStorage.getItem("videoid")
      this.axios
        .get(config.server + config.port.comment.getCommentVideo, {
          params: {
            id: videoid,
            current_page: this.currentPage,
            num: 4,
          }
        })
        .then(response => {
          $(".loadmore").show();
          console.log(response.data)
          for(let i=0;i<response.data.length;i++){
            this.comments.push(response.data[i])
          }
          if(response.data.length==0 && this.currentPage==1){
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
      var me = this;
      $(".toComment").on("click", function() {
        me.$router.push({ path: "/videoinputbox"});
      });
    },
    clickloadmore(){
      this.currentPage++;
      this.getComment();
      
    }
  },
  mounted() {
    $(".videopageView").animate({ left: 0 });
    this.getOne();
    this.toSroll();
    this.clickback();
    this.getComment();
    this.toComment();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.videopageView {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 5;
  top: 0;
  left: 100%;
  background-color: white;
}
.ViewBox {
  width: 100%;
  height: auto;
  overflow: hidden;
}
.videoel{
    width: 100%;height: auto;
}
.videoel video{
    width: 100%;height: 13.5rem;
}
.videopageView .title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0.6rem 1rem 1rem;
}

.videopageView .info {
  font-size: 0.8rem;
  margin: 1rem;
  color: #6c6c6c;
}
.videopageView .subtitle {
  font-size: 0.9rem;
  margin: 1rem;
  color: #434343;
}
img {
  width: 100px;
  height: auto;
}
.videopageView .titleImage img {
  width: 100%;
  height: auto;
}
.videopageView .contentText {
  font-size: 1.1rem;
  margin: 1rem;
}
.commentBox {
  overflow: hidden;
}
.videopageView .back i {
  font-size: 1.5rem;
 margin: 0.5rem 0;
}
.kong {
  width: 100%;
  height: 3.3rem;
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
.commentNum{
 font-weight: 600;
 margin-left: 1rem;
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
  width: 100%;
  height: 5rem;
  margin: 2rem 0;
  text-align: center;
  color: #696a6b;
}
</style>