<template>
  <div class="channelslider">
    <div class="cnslider" v-for="(channelsort,index) in list" :key="index">
      <div class="cnItemBox" >
        <div class="cnItem newsItem" v-for="(cnItem,index) in channelsort.cnItem" :key="index" :data-contentid="cnItem.id">
          <div class="img">
            <img :src="cnItem.titleImage" alt="">
          </div>
          <div class="content">
            <div class="content_text">{{cnItem.title}}</div>
            <span class="author">{{cnItem.author}}</span>
            <span class="time">{{cnItem.time}}</span>
          </div>
        </div>
      </div>
      <div :id="channelsort.id" v-on:touchstart.stop="touchmove($event)">
        <div class="sliderHeader">
          <div class="bar"></div>
          <div class="headertitle" v-html="channelsort.channel"></div>
          <div class="icon">
            <i class="iconfont icon-jiantou"></i>
          </div>
        </div>
        <div class="cnSliderBox" ref="cnSliderBox">
          <div class="sliderList">
            <div class="sliderItem newsItem" v-for="(sItem,index) in channelsort.sliderItem" :key="index" :data-contentid="sItem.id">
              <div class="sImg">
                <img :src="sItem.titleImage" alt="">
              </div>
              <div class="sTitle">
                {{sItem.title}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import BScroll from "better-scroll";
import config from "../../../../base/config";
import { Indicator} from "mint-ui";
export default {
  name: "channelslider",
  data() {
    return {
      message: "supermarket",
      contentId:'',
      id:"channelSliderBox1",
      contentid:'',
      list: [
        {
          cnItem: [],
          sliderItem: [],
          channel: "",
          id:"channelSliderBox1"
        },
        {
          cnItem: [],
          sliderItem: [],
          channel: "",
          id:"channelSliderBox2"
        },
        {
          cnItem: [],
          sliderItem: [],
          channel: "",
          id:"channelSliderBox3"
        }
      ]
    };
  },
  methods: {
    touchmove(e){
      console.log("heheheh,haokeng")
    },
    getList() {
      Indicator.open('加载中...');
      this.axios
        .get(config.server + config.port.content.cnSlidernews)
        .then(response => {
          let j = 0;
          for (let i = 0; i < response.data.length; i += 6) {
            this.list[j].cnItem.push(
              response.data[i],
              response.data[i + 1],
              response.data[i + 2]
            );
            this.list[j].sliderItem.push(
              response.data[i + 3],
              response.data[i + 4],
              response.data[i + 5]
            );
            this.list[j].channel = response.data[i].channel;
            j++;
          }
           Indicator.close();
        })
        .catch(error => {
          console.log(error);
        });
    },
    toSroll(){
      this.slider1 = new BScroll(this.$refs.cnSliderBox[0], {
        scrollX: true,
        scrollY: false,
        bounce: false,
        snap: {
          threshold: 0.6
        },
        click: true
      });
       this.slider2 = new BScroll(this.$refs.cnSliderBox[1], {
        scrollX: true,
        scrollY: false,
        bounce: false,
        snap: {
          threshold: 0.6
        },
        click: true
      });
       this.slider3 = new BScroll(this.$refs.cnSliderBox[2], {
        scrollX: true,
        scrollY: false,
        bounce: false,
        snap: {
          threshold: 0.6
        },
        click: true
      });
    },
    clickItem(){
      let me = this;
       
      // let channelSliderBox = document.getElementById("homepageslider");
      // let startX=0,startY=0;
      // let endX=1,endY=1;

      // // let newsItem=document.getElementsByClassName("newsItem")
      // // $(document).on("click",".newsItem",function(e){
      // //    me.contentId=this.dataset.contentid;
      // //    me.$router.push({ name: 'pageview', params: { contentId:me.contentId}})
      // //    localStorage.setItem("articleId",me.contentId)
      // // })
      // // 判断是点击还是滑动
      // $(channelSliderBox).bind("touchstart", function(e) {
      //   startX=e.touches[0].clientX;
      //   startY=e.touches[0].clientY;
      // });
      // $(channelSliderBox).bind("touchend", function(e) {
      //   endX=e.changedTouches[0].clientX;
      //   endY=e.changedTouches[0].clientY;
      //   if(startX==endX&&startY==endY){
      //      for(let i=0;i<newsItem.length;i++){
      //        if($(newsItem[i]).hasClass("is-active")){
      //          me.contentId=$(newsItem[i]).data().contentid
      //        }
      //      }
      //     me.show_content= true;
      //     me.$router.push({ name: 'pageview', params: { contentId: me.contentId}})
      //     localStorage.setItem("articleId",me.contentId)
      //     console.log("isclick")
      //   }else{
      //     console.log("ismove")
      //   }
      //   });
    
    }
  },
  mounted() {
     this.getList();
    this.toSroll();
   
  },
  beforeUpdate(){
//  this.clickItem();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cnslider {
  width: 100%;
  margin-top: 0.5rem;
}
.cnItemBox {
  width: 100%;
  height: auto;
  overflow: hidden;
}
.cnItem {
  margin: 1rem;
  border-bottom: 1px solid #a0a2a3;
  width: 100%;
  height: 7.6rem;
  overflow: hidden;
}
.cnItem img {
  width: 35%;
  height: 6.5rem;
  float: left;
}
.cnItem .content {
  margin-left: 0.8rem;
  float: left;
  width: 55%;
}
.cnItem .content .content_text {
  font-size: 1rem;
  height: 5.3rem;
  overflow: hidden;
  margin-bottom: 0.2rem;
}
.cnItem .content .author {
  font-size: 0.8rem;
}
.cnItem .content .time {
  font-size: 0.7rem;
}
/*******slider*************/
.sliderHeader {
  width: 93%;
  height: 1.5rem;
  margin: 0.5rem;
}
.bar {
  width: 2px;
  height: 0.8rem;
  background-color: red;
  float: left;
}
.headertitle {
  float: left;
  width: 3rem;
  height: auto;
  margin-left: 0.8rem;
  font-size: 1.1rem;
  line-height: 1rem;
}
.sliderHeader .icon {
  float: right;
}
.sliderBox{
  width: 100%;
  height: 13rem;
}
.sliderList{
  width: 54rem;
  margin-left: 1rem;
  height: 13rem;
}
.sliderItem {
  float: left;
  margin-right: 0.7rem;
  width: 16rem;height: 12.8rem;
  overflow: hidden;
  border: 1px dotted #a0a2a3;
}
.sliderItem .sImg img {
  width: 16rem;
  height: 8rem;
}
.sTitle{
  margin: 0.5rem 0.7rem;
}
</style>