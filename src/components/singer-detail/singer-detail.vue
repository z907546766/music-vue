<template lang="html">
  <transition name='slide'>
    <div class="singer-detail">

    </div>
  </transition>
</template>

<script>
import { getSongDetail } from "@/api/songDetail";
const NUM = 15;
export default {
  data() {
    return {
      json: {}
    };
  },
  created() {
    this._nowId = this.$route.params.id;
    this._getSongDetail();
  },
  methods: {
    _getSongDetail(index = 0) {
      let data = {};
      let begin = index * NUM;
      if (/\d/g.test(+this._nowId)) {
        data = {
          disstid: +this._nowId,
          song_begin: begin,
          song_num: NUM
        };
      } else {
        data = {
          num: NUM,
          begin,
          singermid: this._nowId
        };
      }
      getSongDetail(data)
        .then(result => {
          console.log(result);
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../common/less/minxin.less");
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

.singer-detail {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  overflow: hidden;
  background: rgb(34, 34, 34);
}
</style>
