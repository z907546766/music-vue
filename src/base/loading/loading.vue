<template lang="html">
   <div class="loading">
     <img src="../../common/image/loading.gif" alt="">
     <p>{{str}}</p>
   </div>
</template>

<script>
export default {
  props:{
    str:{
      type:String,
      default:"加载中"
    }
  }
}
</script>

<style lang="less">
.loading{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  p{
    color: #fff;
  }
}
</style>
