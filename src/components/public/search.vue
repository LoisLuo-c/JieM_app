<template>

    <div class="search">
        <div class="searchBox">

            <div class="searchInput">
                <div class="searchIcon">
                    <i class="iconfont icon-sousuo1"></i>
                </div>
                <div class="input">
                    <input type="text" placeholder="请输入搜索内容" @keyup.enter="clickEnter($event)">
                </div>
            </div>
            <div class="cannel" @click="back()">取消</div>

        </div>
            <div class="searchResult" ref="searchResult">
                <div class="searchList">
                  <div class="refresh">刷新中...</div>
                    <div class="searchItems" v-for="(newsItem,index) in content" :key="index">
                        <searchitem :newsItem="newsItem" :keyword="keyw"/>
                    </div>
                    <div class="noresource">暂无数据</div>
        <div class="loadmore">加载中...</div>
        <div class="nomore">没有更多了</div>
                </div>
            </div>
       
    </div>

</template>

<script>
import Vue from "vue";
import config from "../../base/config";
import BScroll from "better-scroll";
import searchItem from "./searchItem";
import { Indicator, Loadmore } from "mint-ui";
Vue.component("searchitem", searchItem);
export default {
  name: "search",
  data() {
    return {
      content: [],
      currentPage: 1,
      getScoreLog: [],
      allLoaded: false,
      bottomText: "上拉加载更多...",
      totalCount: "",
      keyw:"",
      nomore: false,
      loadmore: false,
      refresh: false,
    };
  },
  methods: {
    clickEnter(e){
        let me=this;
         let keyword = e.target.value;
        this.keyw=keyword;
        me.getList();
    },
    getList() {
        let me=this;
        Indicator.open();
      this.axios
        .get(config.server + config.port.content.search, {
          params: {
            keyword: this.keyw,
            current_page: this.currentPage,
            num: 5,
          }
        })
        .then(response => {
          if (this.refresh == true) {
            this.content = [];
          }
          for(let i=0;i<response.data.length;i++){
            this.content.push(response.data[i])
          }

          if(response.data.length==0 && this.currentPage==1){
            $(".noresource").show();
          }else{
             $(".noresource").hide();
          }
          me.trunRed();

          //加载完成之后就把加载中取消掉
          $(".loadmore").hide();
          this.loadfinsh=true;
          //没有更多了
          if (response.data.length < 5&&response.data.length>0) {
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
      let me=this;
      this.slider = new BScroll(this.$refs.searchResult, {
        scrollX: false,
        scrollY: true,
        click: true,
        pullDownRefresh: {
          threshold: 50, // 当下拉到超过顶部 30px 时，
          stop:20
        },
        pullUpLoad: {
          threshold: -50,
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
          $(".loadmore").show();
          me.refresh = false;
          me.currentPage += 1;
          me.getList();
        }
        this.slider.finishPullUp()
      });
      
    },
    trunRed(){
        var me=this;
        var keyword = this.keyw;
		var reg = new RegExp("" + keyword + "", "g");
		//查找文章题目中是否含有关键字
       
        me.$nextTick(function () {
         var con_title = document.getElementsByClassName("searchtitle");
         for(var i = 0; i < con_title.length; i++) {
			var str = $(con_title[i]).text();
            var result = str.replace(reg, "<font style='color:#F00;font-weight:700;'>" + keyword + "</font>");
            
			$(con_title[i]).html(result)
		}
      })
		
    },
    back(){
      this.$router.go(-1);
    }
  },
  mounted() {

    this.toSroll();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
  top: 0;
  /* left: 100%; */
  background-color: #f2f0f0;
}
.searchBox {
  background-color: white;
}
.searchInput {
  display: inline-block;
  width: 80%;
  background-color: #f2f0f0;
  height: 1.7rem;
  margin: 1rem 0.5rem 1rem 1rem;
  border-radius: 5px;
}
.searchIcon {
  display: inline-block;
  width: 2rem;
  height: 1.7rem;
  line-height: 1.7rem;
  text-align: center;
  color: #a5a3a2;
}
.input {
  display: inline-block;
  width: 80%;
}
.input input {
  outline: none;
  border: 0;
  font-size: 0.9rem;
  background-color: #f2f0f0;
}
.cannel {
  display: inline-block;
  font-size: 0.8rem;
}
.searchResult {
  width: 100%;
  height: 90%;

  overflow: hidden;
}
.searchList {
  background-color: white;
  margin-top: 0.8rem;
  width: 100%;
  height: auto;
}
.loadmore {
  background-color: #f2f0f0;
  display: none;
  width: 100%;
  height: 1.5rem;
  text-align: center;
}
.nomore {
  background-color: #f2f0f0;
  display: none;
  width: 100%;
  height: 3rem;
  margin: 1rem;
  text-align: center;
}
.refresh {
  background-color: #f2f0f0;
  display: none;
  width: 100%;
  height: 1.3rem;
  text-align: center;
}
.noresource{
  background-color: #f2f0f0;
  display: none;
  width: 100%;
  height: 5rem;
  margin-top: 3rem;
  text-align: center;
  color: #696a6b;
}
</style>