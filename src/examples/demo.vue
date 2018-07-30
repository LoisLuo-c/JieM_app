<template>
 <div class="demos">
     <div>{{msg}}</div>
     <div class="box">

     <div class="wrapper" ref="wrapper">
     <ul class="list" ref="sliderGroup"> 
      <li class="item" v-for="(item,key,index) in sortMenu" :key="index" >
          {{item.sortname}}
      </li>
    </ul>
    </div>
    </div>
    <div class="box2">
         <ul class="list2" ref="box2_ul"> 
            <li class="item2" v-for="(item,key,index) in sortMenu" :key="index" >
                {{item.sortname}}
            </li>
    </ul>
    </div>
 </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "demo",
  data() {
    return {
      msg: "hello",
      sortMenu: [
        { sortname: "全部" },
        { sortname: "家用电器" },
        { sortname: "大家电" },
        { sortname: "生活用品" },
        { sortname: "食品" },
        { sortname: "美妆" },
        { sortname: "书籍" },
        { sortname: "洗护用品" },
        { sortname: "母婴用品" },
        { sortname: "家居" }
      ],
      width: 0
    };
  },
  created() {},
  mounted() {
    this.toscroll();
    this.toscroll2();
  },
  methods: {
    // 定义一个计算宽度的方法
    _setSliderWidth(isResize) {
      // 获取到多少子元素
      this.children = this.$refs.sliderGroup.children;
      let width = 0;
      // 计算一个的宽度
      let wrapperWidth = this.$refs.wrapper.clientWidth;
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        child.style.width = wrapperWidth + "px";
        width += wrapperWidth;
      }
      this.$refs.sliderGroup.style.width = width + "px";
    },
    toscroll() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollX: true,
        scrollY: false
      });
    },
    toscroll2(){
         this.scroll = new BScroll(this.$refs.box2_ul, {
            scrollX: true,
            scrollY: true,
            momentum: false,
            click: true
      });
    }
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
}
.box {
  width: 100%;
  overflow: hidden;
}
.list {
  width: 400%;
  margin: 0;
  padding: 0;
}
.item {
  list-style: none;
  width: 150px;
  height: 30px;
  background-color: red;
  float: left;
}

.list2{
    width: 100%;
    
}
.list2{
    width: 100%;
    height: 80px;
     background-color: gold;
}
</style>
