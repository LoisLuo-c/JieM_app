<template>
  <div class="supermarket">
    <div class="noresource">
      暂无内容
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Indicator} from "mint-ui";
export default {
  name: 'supermarket',
  data () {
    return {
      message: 'supermarket'
    }
  },
  methods:{
    showind(){
      Indicator.open();
      Indicator.close();
    }
  },
  mounted(){
    // this.showind();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.noresource{
  width: 100%;
  height: 5rem;
  margin: 3rem 0;
  text-align: center;
  color: #696a6b;
}
</style>