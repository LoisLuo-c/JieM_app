<template>
  <div class="home">
      <HomeHeader/>
      <TopNav  v-bind:path="routerPath"/>
      <ContentBox/>
      <PageView v-if="showpageview" v-bind:closePageView="closePageView"/>
  </div>
</template>

<script>
import Vue from "vue";
import home_header from "../components/home/home_header";
import topNav from "../components/home/news_top_nav";
import contentBox from "../components/home/contentbox";
import pageview from "../components/public/pageView";
import { TabContainer, TabContainerItem, Popup } from "mint-ui";

Vue.component(Popup.name, Popup);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);

Vue.component("HomeHeader", home_header);
Vue.component("TopNav", topNav);
Vue.component("ContentBox", contentBox);
Vue.component("PageView", pageview);
export default {
  name: "home",
  data() {
    return {
      message: "home",
      routerPath: this.$route.fullPath,
      contentId: "",
      showpageview: false,
      ismove: false
    };
  },
  mounted() {
    this.clickItem();
  },
  methods: {
    clickItem: function(params) {
      let me = this;
      $(document).on("click",".newsItem",function(e){
         me.contentId=this.dataset.contentid;
        //  me.showpageview=true
         console.log(me.contentId)
         me.$router.push({ name: 'pageview', params: { contentId:me.contentId}})
         localStorage.setItem("articleId",me.contentId)
      })
      


      // let homepageslider = document.getElementById("homepageslider");
      // let startX=0,startY=0;
      // let endX=1,endY=1;

      // // 判断是点击还是滑动
      // $(homepageslider).bind("touchstart", function(e) {
      //   startX=e.touches[0].clientX;
      //   startY=e.touches[0].clientY;
      // });
      // $(homepageslider).bind("touchend", function(e) {
      //   endX=e.changedTouches[0].clientX;
      //   endY=e.changedTouches[0].clientY;
      //   if(startX==endX&&startY==endY){
      //      let newsItem=document.getElementsByClassName("slidernewsItem")
      //      for(let i=0;i<newsItem.length;i++){
      //        if($(newsItem[i]).hasClass("is-active")){
      //          me.contentId=$(newsItem[i]).data().contentid
      //        }
      //      }
      //     me.show_content= true;
      //     me.$router.push({ name: 'pageview', params: { contentId: me.contentId}})
      //     localStorage.setItem("articleId",me.contentId)
      //   }else{
      //     console.log("ismove")
      //   }
      //   });
    },
    closePageView(){
      this.showpageview=false;
    }
  },
  beforeUpdate() {
    this.routerPath = this.$route.fullPath;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
