<template>
  <div id="homepageslider" >
    <div class="photoBox" ref="slider-photos">
      <mt-swipe :auto="2000" >
          <mt-swipe-item class="slidernewsItem"  v-for="item in content" :key="item.id" :data-contentid="item.id"  >
    
              <img  :src="item.titleImage" class="sliderimg"/>
         
          </mt-swipe-item>
        </mt-swipe>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem } from "mint-ui";
import config from "../../../../base/config";

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  name: "sliderbox",
  move:false,

  data() {
    return {
      contentId:"",
      // items:[
      //   {src:require("../../../../assets/img/dog.jpg")},
      //   {src:require("../../../../assets/img/sport1.jpg")},
      //   {src:require("../../../../assets/img/sport2.jpg")},
      //   {src:require("../../../../assets/img/tianxia4.jpg")}
      // ]
      items: [
        {
          title: "你的名字",
          href: "https://www.baidu.com/",
          url: require("../../../../assets/img/dog.jpg")
        },
        {
          title: "s的名字",
          href: "https://www.baidu.com/",
          url: require("../../../../assets/img/sport1.jpg")
        },
        {
          title: "z的名字",
          href: "https://www.baidu.com/",
          url: require("../../../../assets/img/sport2.jpg")
        },
        {
          title: "x的名字",
          href: "https://www.baidu.com/",
          url: require("../../../../assets/img/tianxia4.jpg")
        }
      ],
      content: [],
      ismove:true,
    };
  },
  methods:{
  },
  mounted() {
    // this.tonews();
    this.axios.get(config.server + config.port.content.homepageImg)
      .then(response => {
        this.content=response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#homepageslider {
  width: 100%;
  height: 13rem;
  margin: 1px;
}

.photoBox {
  width: 100%;
  height:13rem;
}
.mint-swipe {
  widows: 100%;
}
.photoBox img {
  width: 100%;
  height: 13rem;
}
/* .desc {
    font-weight: 600;
    opacity: .9;
    padding: 5px;
    height: 20px;
    line-height: 20px;
    width: 100%;
    color: #fff;
    background-color: gray;
    position: absolute;
    bottom: 0;
} */
</style>