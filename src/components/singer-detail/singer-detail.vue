<template lang="html">
  <transition name='slide'>
   <div class="singer-detail">

   </div>
   </transition>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import url('../../common/less/minxin.less');
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
    transform: translate3d(100%,0,0);
}
.singer-detail {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
    overflow: hidden;
    background: rgb(34,34,34);
}
</style>
