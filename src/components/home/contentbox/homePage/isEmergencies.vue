<template>
  <div class="isemerg">
    <div class="lefttitle">
      <span>即时快讯</span>
    </div>
    <div class="emgBox" ref="emgBox">
      <div id="emgList">
        <div class="emgItem" v-for="(emgItem,index) in emergen" :key="index">
          <div class="">{{emgItem.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import BScroll from "better-scroll";
import config from "../../../../base/config";
export default {
  name: "isemergencise",
  data() {
    return {
      message: "supermarket",
      emergen: []
    };
  },
  methods: {
    getList() {
      this.axios
        .get(config.server + config.port.isEmergencies.homeList)
        .then(response => {
          this.emergen = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    swipe() {
      var me=this;
      let emgList = $("#emgList");
      let emgItem=document.getElementsByClassName("emgItem");
      let item=0;
      // $(emgItem).eq(0).appendTo($(emgList));
       $(emgItem[item]).show();
      var timesRun = 0;
      
      let interval = setInterval(function() {
        $(emgItem[item]).animate().show().siblings().hide();
       item++;
       var path=me.$route.fullPath;
       
        if (path != '/home') {
          clearInterval(interval);
          console.log("path")
        }
       if(item==3){
         item=0;
       }
      }, 2000);
    }
  },
  mounted() {
    this.getList();
    // this.swipe();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.isemerg {
  position: relative;
  top: 0rem;
  width: 100%;
  height: 5rem;
  background-color: aquamarine;
}
.lefttitle {
  float: left;
  margin: 1rem 1rem 0.6rem 1.3rem;
  width: 2.5rem;
  height: 4rem;
}
.lefttitle span {
  font-size: 1.1rem;
  color: red;
  font-weight: 600;
}
.emgBox {
  width: 75%;
  height: 2.8rem;
  float: left;
  /* overflow: hidden; */
  margin: 1.1rem 0;
}
#emgList {
  width: 100%;
  height: auto;
  position: relative;
  /* top: -5rem; */
}
.emgItem {
  height: 5rem;
  display: none;
  position: absolute;
}
</style>