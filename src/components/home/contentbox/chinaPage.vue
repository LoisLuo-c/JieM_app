<template>
  <div class="chinap content_item" ref="channelview">
    <!-- {{message}} -->
    <div class="channelView">
      <div class="refresh">刷新中...</div>
      <csbox/>
      <channelnews v-bind:currentPage="currentPage" :list="list" />
      <div class="loadmore">加载中...</div>
      <div class="nomore">没有更多了</div>
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import config from "../../../base/config";
import sliderBox from "./channelPage/sliderBox";
import channelNews from "./channelPage/channelnews";
import BScroll from "better-scroll";
import { Indicator} from "mint-ui";
Vue.component("csbox", sliderBox);
Vue.component("channelnews", channelNews);
export default {
  name: "chinapage",
  data() {
    return {
      currentPage: 1,
      nomore: false,
      loadmore: false,
      refresh: false,
      list: [],
      loadfinsh:false
    };
  },
  methods: {
    getList() {
      let me = this;
      let channel = "中国";
      Indicator.open('加载中...');
      me.axios
        .get(config.server + config.port.content.channelList, {
          params: {
            num: 3,
            current_page: this.currentPage,
            channel: channel
          }
        })
        .then(response => {
          if (this.refresh == true) {
            this.list = [];
          }
          
          if (response.data.length > 0) {
            //threenews 指小图片的新闻
            //onenewss 指大图片新闻
            this.list.push({
              threeNews: [],
              oneNews: []
            });
            for (let i = 0; i < response.data.length - 1; i++) {
              this.list[this.currentPage - 1].threeNews.push(response.data[i]);
            }
            this.list[this.currentPage - 1].oneNews.push(
              response.data[response.data.length - 1]
            );
          }

          
          //加载完成之后就把加载中取消掉
          $(".loadmore").hide();
          this.loadfinsh=true;
          //没有更多了
          if (response.data.length < 3) {
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
    toSroll() {
      var me = this;
      this.slider = new BScroll(this.$refs.channelview, {
        scrollX: false,
        scrollY: true,
        click:true,
        pullDownRefresh: {
          threshold: 50, // 当下拉到超过顶部 30px 时，
          stop:20
        },
        pullUpLoad: {
          threshold: -50,
          stop:-50
        },
      });
      this.slider.on("pullingDown", () => {
         $(".refresh").show();
        me.currentPage = 1;
        me.nomore = false;
        $(".nomore").hide();
        me.refresh = true;
        me.getList();
        me.slider.finishPullDown();
      });
      this.slider.on("pullingUp", () => {
        if (me.nomore == false) {
           this.loadfinsh=false;
          $(".loadmore").show();
          me.refresh = false;
          me.currentPage += 1;
          me.getList();
        }
        this.slider.finishPullUp()
      });
      
    }
  },
  mounted() {
    this.toSroll();
    this.getList();
    // this.showrefresh();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chinap {
  float: left;
  width: 50%;
  height: 77%;
  background-color: white;
  overflow: hidden;
}
.loadmore {
  display: none;
  width: 100%;
  height: 1.5rem;
  text-align: center;
}
.channelView {
  width: 100%;
  height: auto;
  overflow: hidden;
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