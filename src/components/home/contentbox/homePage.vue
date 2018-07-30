<template>
  <div class="content_item homep" id="homep" ref="homep" >
    <div class="homePage">
      <sliderbox/>
      <emerg/>
      <channelslider />
      <div class="nomore">没有更多了</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

import sliderBox from "./homePage/sliderBox";
import Emerg from "./homePage/isEmergencies";
import BScroll from "better-scroll";
import channelSlider from "./homePage/channelSlider";
Vue.component("sliderbox", sliderBox);
Vue.component("emerg", Emerg);
Vue.component("channelslider", channelSlider);
export default {
  name: "homepage",
  data() {
    return {
      message: "homep"
    };
  },
  methods: {
    changeColor() {
      this.$refs.asd.style.width = 200 + "px";
    },
    toSroll() {
      this.slider = new BScroll(this.$refs.homep, {
        scrollX: false,
        scrollY: true,
        bounce: false,
        click: true
      });
    }
  },
  mounted() {
    this.toSroll();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.homep {
  float: left;
  width: 100%;
  height: 90%;
}
.homePage{
  width: 100%;
  height: auto;
  overflow: hidden;
}
.nomore{
  width: 100%;
  margin-top: 1rem;
  height: 7rem;
  text-align: center;
}
</style>