
<template lang="html">
  <div id='recommend' :data='songList'>
    <my-scroll ref='scroll'>
      <div>
        <!-- slider -->
        <div class="slider-box" v-if='slider.length' >
          <my-slider>
            <div v-for='item in slider' :key='item.id' >
              <a :href='item.linkUrl' >
                <img :src="item.picUrl" alt="" @load='loadImage' class="needsclick">
              </a>
            </div>
          </my-slider>
        </div>
        <!-- 电台 -->
       <div class='hot-radio'>
           <my-list :title='radioTitle' :list='radioList'></my-list>
       </div>
        <!-- 热门歌曲推荐 -->
        <div class="hot-song">
           <my-list :title='songTitle' :list='songList'></my-list>
        </div>
        
        <!-- loading -->
        <div class="loading-box" v-show='!songList.length'>
          <my-loading></my-loading>
        </div>
        
      </div>
    </my-scroll>

  </div>
</template>

<script>
import { getRecommend } from "@/api/recommend";
import { ERR_OK } from "@/api/config";
import Slider from "@/base/slider/slider";
import Scroll from "@/base/scroll/scroll";
import Loading from "@/base/loading/loading";
import List from "./components/list";
// import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "recommend",
  data() {
    return {
      slider: [],
      songList: [],
      songTitle: "热门歌单",
      radioList: [],
      radioTitle: "电台",
      _checkLoad: false
    };
  },
  created() {
    this._getRecommend();
  },
  components: {
    "my-slider": Slider,
    "my-scroll": Scroll,
    "my-loading": Loading,
    "my-list": List
  },
  computed: {
    // ...mapGetters({
    //   count: "getCount"
    // })
  },
  methods: {
    // ...mapMutations({
    //   add: "isAdd"
    // }),
    // ...mapActions({
    //   adds: "add"
    // }),
    // showname() {
    //   this.adds("22222");
    // },

    loadImage() {
      if (!this._checkLoad) {
        this.$refs.scroll.refresh();
        this._checkLoad = true;
      }
    },

    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.slider = res.data.slider;
          this.songList = this._dealListData(res.data.songList, "song");
          this.radioList = this._dealListData(res.data.radioList, "radio");
        }
      });
    },
    _dealListData(data, type) {
      return data.map(val => {
        let json = {
          name: type,
          picUrl: val.picUrl
        };
        if (type === "song") {
          json.id = val.id;
          json.desc = val.songListDesc;
          json.author = val.songListAuthor;
          json.accessnum = val.accessnum;
        } else {
          json.id = val.radioid;
          json.desc = val.Ftitle;
        }
        return json;
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../common/less/minxin.less");
#recommend {
  height: calc(100% - 10.67rem);
  .loading-box {
    position: relative;
    width: 100%;
    height: 6.67rem;
  }
  .hot-song,
  .hot-radio {
    padding: 0.27rem;
  }
}
</style>
