<template lang="html">
  <div id='singer'>

    <my-scroll :data='singers' :probeType='probeType' ref='scroll' :listenScroll='listenScroll'
    @scroll='scroll'>
      <div class="singer-list-box" ref='singerList'>
         <div v-for='(item,index) in singers' :key='index' ref='listGroup'>
           <h3>{{item.title}}</h3>
           <ul class="singer-list">
             <li v-for='val in item.item' :key='val.id' @click='selectItem(val.id)'>
               <a href="javascript:;">
                 <img v-lazy="val.avater" alt="" @load='loadImage'>
                 <span>{{val.name}}</span>
               </a>
             </li>
           </ul>
         </div>
      </div>
    </my-scroll>

     <ul class="singer-nav" @touchstart='tabShortCutStart' @touchmove.stop.prevent='tabShortCutMove'>
        <li v-for='(item,index) in shortCutList' :key='index' :data-index='index' :class="{active:currentIndex===index}">{{item}}</li>
     </ul>
     
     <!-- 歌手列表的title -->
     <div class="list-fixed" v-show='fixedTitle' ref='fixedList'>
       <h1 class="fixed-title" >{{fixedTitle}}</h1>
     </div>
     <div class="loading-box" v-show='!singers.length'>
       <my-loading></my-loading>
     </div>
     <router-view></router-view>
  </div>
</template>
<script>
import { getSingerList } from "@/api/singer";
import { ERR_OK } from "@/api/config";
import Scroll from "@/base/scroll/scroll";
import Loading from "@/base/loading/loading";
import { attr } from "@/common/js/dom";
const HOT_NAME = "热门";
const HOT_NUM = 10;
const ANCHOR_HEIGHT = 33;
const TITLE_HEIGHT = 60;
export default {
  name: "singer",
  data() {
    return {
      singers: [],
      currentIndex: 0,
      scrollY: -1,
      diff: 0
    };
  },
  created() {
    this.probeType = 3;
    this.listHeight = [];
    this.touch = {};
    this._checkLoad = false;
    this.listenScroll = true;
    this._getSingerList();
  },
  computed: {
    shortCutList() {
      return this.singers.map(val => {
        return val.title.substring(0, 1);
      });
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return "";
      }
      return this.singers[this.currentIndex]
        ? this.singers[this.currentIndex].title
        : "";
    }
  },
  watch: {
    singers() {
      setTimeout(() => {
        this._cHeight();
      }, 20);
    },
    diff(newVal) {
      let fixedTop =
        newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0;
      if (this.fixedTop === fixedTop) {
        return;
      }
      this.fixedTop = fixedTop;
      this.$refs.fixedList.style.transform = `translate3d(0,${fixedTop}px,0)`;
    },
    scrollY(newY) {
      //顶部
      if (newY > 0) {
        this.currentIndex = 0;
        return;
      }
      // 中间
      for (var i = 0, len = this.listHeight.length; i < len; i++) {
        let height_1 = this.listHeight[i];
        let height_2 = this.listHeight[i + 1];
        if (-newY >= height_1 && -newY < height_2) {
          this.currentIndex = i;
          this.diff = height_2 + newY;
          return;
        }
      }
      // 底部
      this.currentIndex = this.listHeight.length - 2;
    }
  },
  methods: {
    selectItem(id) {
      this.$router.push({
        path: `/singer/${id}`
      });
    },
    tabShortCutStart(e) {
      let index = attr(e.target, "index");
      this.touch.y1 = e.touches[0].pageY;
      this.index = index;
      this._scrollTo(index);
    },
    tabShortCutMove(e) {
      this.touch.y2 = e.touches[0].pageY;
      // |0 相当于Math.floor();
      let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0;
      let index = +this.index + delta;
      this._scrollTo(index);
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    loadImage() {
      if (!this._checkLoad) {
        this.$refs.scroll.refresh();
        this._checkLoad = true;
      }
    },
    _cHeight() {
      this.listHeight = [];
      let listGroup = this.$refs.listGroup;
      let height = 0;
      this.listHeight.push(height);
      for (var i = 0, len = listGroup.length; i < len; i++) {
        let item = listGroup[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    _scrollTo(index) {
      if (!index && index !== 0) {
        return;
      }
      if (index < 0) {
        index = 0;
      }
      if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2;
      }
      this.scrollY = -this.listHeight[index];
      this.$refs.scroll.scrollToEle(this.$refs.listGroup[index], 0);
    },

    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singers = this._dealSingerData(res.data.list);
        }
      });
    },
    _dealSingerData(data) {
      let map = {
        hot: {
          title: HOT_NAME,
          item: []
        }
      };
      data.forEach((item, index) => {
        let json = {
          id: item.Fsinger_id,
          name: item.Fsinger_name,
          avater: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${
            item.Fsinger_mid
          }.jpg?max_age=2592000`
        };
        if (index < HOT_NUM) {
          map.hot.item.push(json);
        }
        let key = item.Findex; //此处数据存在一个为9的数据
        if (/^[a-zA-Z]$/.test(key)) {
          if (map[key]) {
            map[key].item.push(json);
          } else {
            map[key] = {
              title: key,
              item: [json]
            };
          }
        }
      });
      // 获取到有序列表
      let hot = [];
      let ret = [];
      for (var key in map) {
        if (map.hasOwnProperty(key)) {
          let val = map[key];
          if (/^[a-zA-Z]$/.test(val.title)) {
            ret.push(val);
          } else {
            hot.push(val);
          }
        }
      }
      ret.sort((a, b) => {
        // 返回的是位于指定位置的字符的编码
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(ret);
    }
  },
  components: {
    "my-scroll": Scroll,
    "my-loading": Loading
  }
};
</script>

<style lang="less" scoped>
@import url("../../common/less/minxin.less");
#singer {
  position: relative;
  height: calc(100% - 13.33rem);
  overflow: hidden;
  .title {
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding-left: 0.53rem;
    background: #333;
    color: hsla(0, 0%, 100%, 0.5);
  }
  .singer-list-box {
    h3 {
      .title;
      .font-size(12px);
    }
    ul {
      padding-left: 0.53rem;
      padding-top: 0.27rem;
      li {
        padding-bottom: 0.27rem;
        a {
          display: flex;
          img {
            width: 1.33rem;
            height: 1.33rem;
            border-radius: 50%;
            margin-right: 0.53rem;
          }
          span {
            line-height: 1.33rem;
            .font-size(14px);
            color: hsla(0, 0%, 100%, 0.5);
          }
        }
      }
    }
  }
  .singer-nav {
    position: fixed;
    right: 0;
    top: 60%;
    transform: translateY(-50%);
    z-index: 30;
    width: 0.32rem;
    padding: 0.11rem;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
    li {
      color: hsla(0, 0%, 100%, 0.5);
      .font-size(12px);
      &.active {
        color: #ffcd32;
      }
    }
  }
  .list-fixed {
    position: absolute;
    left: 0;
    top: -2px;
    .title;
    z-index: 999;
  }
}
</style>
