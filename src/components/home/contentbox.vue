<template>
  <div class="conbox" ref="conbox">
    <div class="wrapper_box" ref="wrapper_box">
      <HomePage/>
      <ChinaPage/>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import eve from "../../assets/sliderevent";
import BScroll from "better-scroll";
import homePage from "./contentbox/homePage";
import chinaPage from "./contentbox/chinaPage";
import { TabContainer, TabContainerItem } from "mint-ui";

Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component("HomePage", homePage);
Vue.component("ChinaPage", chinaPage);
export default {
  name: "contentbox",
  props: {
    sliderCurPage: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      message: "home",
      currentPage: 0,
      toChange: true,
      scrollx:true,
      contentId:""
    };
  },
  watch: {
    scrollx:function(){
      // this.toSroll();
    }
  },
  mounted() {
   this.toSroll();
    this.setwidth();
  },
  methods: {
    setwidth() {
      this.children = this.$refs.wrapper_box.children;
      let width = 0;
      let pageWidth = document.getElementById("homep").offsetWidth;
      let sliderWidth = this.$refs.conbox.clientWidth;
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        child.style.width = sliderWidth + "px";
        // 计算总宽度
        width += sliderWidth;
      }
      this.$refs.wrapper_box.style.width = width + "px";
    },
    toSroll() {
      let me=this;
      this.slider = new BScroll(this.$refs.conbox, {
        scrollX: this.scrollx,
        scrollY: false,
        bounce: false,
        snap: {
          threshold: 0.6
        },
        click: true,

      });
      this.$on('newsmove',function(){
        me.slider.enable();
      })
      eve.$on("navPage", function(data) {
          me.slider.goToPage(data);
           me.currentPage=data;
      });
      this.slider.on("scrollEnd", () => {
        var me = this;
        let pageIndex = this.slider.getCurrentPage().pageX;
        me.currentPage=pageIndex;
        eve.$emit("curPage", pageIndex);
        eve.$emit("sliderCurPage", pageIndex);
        if(me.currentPage==0){
           me.$router.push({ path: '/home/homepage'})
        }else{
           me.$router.push({ path: '/home/chinapage'})
        }
      });
  

     let homepageslider = document.getElementById("homepageslider");
      let startX=0,startY=0;
      let endX=1,endY=1;

      // 判断是点击还是滑动
      $(homepageslider).bind("touchstart", function(e) {
        me.slider.disable();
        startX=e.touches[0].clientX;
        
        startY=e.touches[0].clientY;
      });
      $(homepageslider).bind("touchend", function(e) {
         me.slider.enable();
        endX=e.changedTouches[0].clientX;
        endY=e.changedTouches[0].clientY;
        if(startX==endX&&startY==endY){
           let newsItem=document.getElementsByClassName("slidernewsItem")
           for(let i=0;i<newsItem.length;i++){
             if($(newsItem[i]).hasClass("is-active")){
               me.contentId=$(newsItem[i]).data().contentid
             }
           }
          me.show_content= true;
          me.$router.push({ name: 'pageview', params: { contentId: me.contentId}})
          localStorage.setItem("articleId",me.contentId)
        }else{
          console.log("ismove")
        }
        });
     

     let channelpageslider = document.getElementById("channelpageslider");

      // 判断是点击还是滑动
      $(channelpageslider).bind("touchstart", function(e) {
        me.slider.disable();
        startX=e.touches[0].clientX;
        
        startY=e.touches[0].clientY;
      });
      $(channelpageslider).bind("touchend", function(e) {
         me.slider.enable();
        endX=e.changedTouches[0].clientX;
        endY=e.changedTouches[0].clientY;
        if(startX==endX&&startY==endY){
           let newsItem=document.getElementsByClassName("channelslidernews")
           for(let i=0;i<newsItem.length;i++){
             if($(newsItem[i]).hasClass("is-active")){
               me.contentId=$(newsItem[i]).data().contentid
             }
           }
          me.show_content= true;
          me.$router.push({ name: 'pageview', params: { contentId: me.contentId}})
          localStorage.setItem("articleId",me.contentId)
        }else{
          console.log("ismove")
        }
        });


    },
    domove() {
      console.log(this.sliderCurPage[0]);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.conbox {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.wrapper_box {
  width: 300%;
  height: 100%;
}
</style>
