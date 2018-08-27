<template lang="html">
  <div id='slider' ref='slider'>
    <div class="slider-group" ref='sliderContainer'>
    <!-- slider组件中的dom会插入到此处 -->
      <slot></slot>
    </div>
    <div class="dots">
      <span v-for='(item,index) in dots' class="dot" :class="{active:currentPageIndex===index}"></span>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { addClass, hasClass } from "@/common/js/dom";
export default {
  name: "slider",
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    // autoPlay 在传值时候应该转换成auto-play （html 不区分大小写）
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      children: null,
      slider: null,
      dots: [],
      currentPageIndex: 0
    };
  },
  watch: {
    $route(to, from) {
      this.autoPlay && this._autoplay();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._setSliderW();
      this._initDots();
      this._initSlider();
      this.autoPlay && this._autoplay();
      this._changeSize();
    });
  },
  destoryed() {
    clearTimeout(this.timer);
  },
  methods: {
    _changeSize() {
      // 横屏
      window.addEventListener("resize", () => {
        this._refresh();
      });
    },
    _setSliderW() {
      let width = 0;
      let sliderW = this.$refs.slider.clientWidth;
      let sliderContainer = this.$refs.sliderContainer;
      this.children = sliderContainer.children;
      for (let i = 0, len = this.children.length; i < len; i++) {
        let child = this.children[i];
        addClass(child, "slider-item");
        child.style.width = sliderW + "px";
        width += sliderW;
      }
      if (this.loop) {
        width += 2 * sliderW;
      }
      sliderContainer.style.width = width + "px";
    },
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false, //惯性
        snap: {
          loop: true, // 开启循环播放
          threshold: 0.3, // 滚动距离超过宽度/高度的 30% 时切换图片
          speed: 400 // 切换动画时长 400ms
        },
        click: true
      });
      this.slider.on("scrollEnd", () => {
        this.currentPageIndex = this.slider.getCurrentPage().pageX;
        this.autoPlay && this._autoplay();
      });
      this.slider.on("beforeScrollStart", () => {
        this.autoPlay && clearTimeout(this.timer);
      });
      this.slider.on("touchend", () => {
        this.autoPlay && this._play();
      });
    },
    _autoplay() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.slider.next();
      }, this.interval);
    },
    _refresh() {
      if (this.slider) {
        this._setSliderW();
        this.slider.refresh();
      }
    }
  }
};
</script>

<style lang="less" scoped>
#slider {
  position: relative;
  .slider-group {
    overflow: hidden;
    .slider-item {
      float: left;
      overflow: hidden;
      box-sizing: border-box;
      a {
        display: block;
        img {
          width: 100%;
        }
      }
    }
  }
  .dots {
    position: absolute;
    bottom: 0.27rem;
    text-align: center;
    width: 100%;
    .dot {
      display: inline-block;
      background: hsla(0, 0%, 100%, 0.8);
      width: 0.21rem;
      height: 0.21rem;
      border: 1px solid #fff;
      border-radius: 50%;
      & + .dot {
        margin-left: 0.27rem;
      }
      &.active {
        padding: 0 0.16rem;
        border-radius: 0.27rem;
      }
    }
  }
}
</style>
