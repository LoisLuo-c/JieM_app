<template>
  <div class="videoitem">
    <!-- <div class="videonews" v-for="(news,index) in content" :key="index"> -->
    <div class="videoel">
      <!-- <video :src="news.video" id="videoPlay" v-show="false"  @click="topaly($event)"></video> -->
   <!-- <div v-on:click="topaly($event)" class="vp"> -->
      <!-- <video class="videoPlay"  ></video> -->
      <video-player  class="video-player vjs-custom-skin"
                      ref="videoPlayer"
                      :playsinline="true"
                      :options="playerOptions"
                      @play="onPlayerPlay($event)"
                      @pause="onPlayerPause($event)"
        >
      </video-player>
      <div class="title" :data-videoid="news.id" @click="clickVideoItem($event)">{{news.title}}</div>
      <div class="time">{{news.time}}</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import config from "../../base/config";
import { videoPlayer } from 'vue-video-player';
export default {
  name: "videoitem",
  props: ["news"],
  data() {
    return {
      showpaly: false,
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
          src: this.news.video //你的视频地址（必填）
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
  methods: {
    // topaly(e) {
    //   let at = $(e.target).children(0).attr("controls");
    //   if (at == undefined) {
    //     e.target.setAttribute("controls", "controls");
    //   } else {
    //     $(e.target).removeAttr("controls");
    //   }
    // },
    clickVideoItem(e) {
      let videoid = e.target.dataset.videoid;
      localStorage.setItem("isvideo", true);
      localStorage.setItem("videoid", videoid);
      console.log(videoid)
      this.$router.push({
        name: "videopageview",
        params: { videoid: videoid }
      });
    },
    onPlayerPlay(e) {
      console.log(e)
      console.log(this)
    },
    onPlayerPause(player) {
      console.log('pause')
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.videoitem {
  position: relative;
  width: 100%;
  height: auto;
}
.videoitem .videoel .vp{
  width: 100%;
  height: 13rem;
  margin: 0;
}
.videoitem .videoel video {
  width: 100%;
  height: 13rem;
  margin: 0;
}
.videoitem .title {
  margin: 0.3rem 1rem 0.5rem;
}
.videoitem .time {
  font-size: 0.8rem;
  margin: 0 0 0.7rem 1rem;
}
</style>