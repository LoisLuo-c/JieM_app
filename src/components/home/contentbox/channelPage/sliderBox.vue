<template>
  <div id="channelpageslider">
    <div class="photoBox" ref="slider-photos">
      <mt-swipe :auto="2000">
          <mt-swipe-item class="channelslidernews"  v-for="item in content" :key="item.id" :data-contentid="item.id" >
             <a :href="item.href" >
              <img :src="item.titleImage" class="img"/>
            </a>
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

  data() {
    return {
      content: [],
      channel:[],
      path:''
    };
  },
  watch:{
    path:function(){
      console.log("wog")
    }
  },
  methods:{
    getList(){
      let channel='中国'
      this.axios.get(config.server + config.port.content.channelPh,
      { params: {
             channel:channel
          }
       })
      .then(response => {
        this.content=response.data;
      })
      .catch(error => {
        console.log(error);
      });
    }
  },
  mounted() {
    this.getList();
    
  },
  updated(){

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