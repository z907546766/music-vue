<template lang="html">
  <div id='recommend' :data='songList'>
    <my-scroll ref='scroll'>
      <div>
        <!-- slider -->
        <div class="slider-box" v-if='recommends.length' >
          <my-slider>
            <div v-for='item in recommends' :key='item.id' >
              <a :href='item.linkUrl' >
                <img :src="item.picUrl" alt="" @load='loadImage' class="needsclick">
              </a>
            </div>
          </my-slider>
        </div>

        <!-- 热门歌曲推荐 -->
        <div class="hot-box">
          <h2>热门歌曲推荐</h2>
          <ul class="hot-song-list">
            <li class="hot-item" v-for='item in songList' :key='item.id'>
              <a href="javascript:;">
                <div class="img-box">
                  <img v-lazy="item.picUrl" alt="">
                  <div class="img-info-box">
                    <span class="iconfont icon-song"></span>
                    <span class="accessnum">{{_cAccessnum(item.accessnum)}}</span>
                    <span class="iconfont icon-play"></span>
                  </div>
                </div>
                <div class="info-box">
                  <h3>{{item.songListDesc}}</h3>
                  <p>{{item.songListAuthor}}</p>
                </div>
              </a>
            </li>
          </ul>
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
import { getSongDetail } from "@/api/songDetail";
import { ERR_OK } from "@/api/config";
import Slider from "@/base/slider/slider";
import Scroll from "@/base/scroll/scroll";
import Loading from "@/base/loading/loading";
export default {
  name: "recommend",
  data() {
    return {
      recommends: [],
      songList: [],
      _checkLoad: false
    };
  },
  created() {
    this._getRecommend();
    // this._getSongDetail();
  },
  components: {
    "my-slider": Slider,
    "my-scroll": Scroll,
    "my-loading": Loading
  },
  methods: {
    loadImage() {
      if (!this._checkLoad) {
        this.$refs.scroll.refresh();
        this._checkLoad = true;
      }
    },
    _cAccessnum(num) {
      if (num > 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
      return num;
    },
    // _getSongDetail(){
    //   getSongDetail().then((res) => {
    //     console.log(res);
    //     // console.log(JSON.parse(res));
    //   })
    // },
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider;
          this.songList = res.data.songList;
        }
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
  .hot-box {
    padding: 0.27rem;
    h2 {
      height: 0.87rem;
      text-align: center;
      line-height: 0.87rem;
      color: rgb(255, 205, 50);
    }
    ul {
      overflow: hidden;
      margin-top: 0.27rem;
      .hot-item {
        width: 50%;
        height: 5.92rem;
        box-sizing: border-box;
        margin-bottom: 0.27rem;
        float: left;
        &:nth-of-type(2n-1) {
          padding-right: 0.13rem;
        }
        &:nth-of-type(2n-2) {
          padding-left: 0.13rem;
        }
        a {
          display: block;
          height: 100%;
          .img-box {
            position: relative;
            height: 4.61rem;
            img {
              width: 100%;
              height: 100%;
            }
            .img-info-box {
              position: absolute;
              bottom: 0.27rem;
              color: #fff;
              display: flex;
              align-items: center;
              width: 100%;
              .iconfont {
                .font-size(14px);
                margin-right: 0.16rem;
                color: #fff;
              }
              .accessnum {
                flex: 1 1 auto;
              }
              .icon-play {
                .font-size(24px);
              }
            }
          }
          .info-box {
            padding: 0 0.27rem;
            line-height: 0.67rem;
            h3 {
              color: #fff;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            p {
              color: hsla(0, 0%, 100%, 0.3);
            }
          }
        }
      }
    }
  }
}
</style>
