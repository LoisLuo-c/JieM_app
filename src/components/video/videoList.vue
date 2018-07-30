<template>
  <div class="videoView" ref="videoView">
    <div class="videoVox">
      <div class="refresh">刷新中...</div>
      <video src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" class="testvideo" controls="controls"></video>
        <div class="videoItems" v-for="(news,index) in content" :key="index">
           <videoitem :news="news" />
        </div>
       
        <div class="loadmore">加载中...</div>
        <div class="nomore">没有更多了</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import BScroll from "better-scroll";
import config from "../../base/config";
import videoItem from './videoItem'
import { Indicator} from "mint-ui";
Vue.component("videoitem",videoItem)
export default {
  name: 'videoList',
  data () {
    return {
      currentPage:1,
      content:[],
      nomore: false,
      loadmore: false,
      refresh: false,
    }
  },
  methods:{
    getList(){
      let num=3;
      // if(this.currentPage==1){
      //   num=3;
      // }else{
      //   num=1;
      // }
      Indicator.open('加载中...');
      this.axios
        .get(config.server + config.port.video.getList, {
          params: {
           num:num,current_page:this.currentPage
          }
        })
        .then(response => {
          if (this.refresh == true) {
            this.content = [];
          }
          for(let i=0;i<response.data.length;i++){
            this.content.push(response.data[i])
          }
          Indicator.close();
          // this.content = response.data;
          //加载完成之后就把加载中取消掉
          $(".loadmore").hide();
          //没有更多了
          if (response.data.length < 2) {
            $(".nomore").show();
            this.nomore = true;
          }
          $(".refresh").hide();
        })
        .catch(error => {
          console.log(error);
        });
      },
      toSroll() {
        var me=this;
        this.slider = new BScroll(this.$refs.videoView, {
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
  },
  mounted(){
      this.toSroll();
      this.getList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.videoView{
    width: 100%;height: 90%;
}
.loadmore {
  display: none;
  width: 100%;
  height: 1.5rem;
  text-align: center;
}
.testvideo{
  width: 100%;
  height: 13rem;
  margin: 0;
}
.nomore {
  display: none;
  width: 100%;
  height: 1.5rem;
  text-align: center;
}
.refresh {
  display: none;
  width: 100%;
  height: 1.3rem;
  text-align: center;
}
</style>