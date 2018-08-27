<template>
    <div>
        <h2 class='hot-title'>{{title}}</h2>
        <ul class="hot-list">
            <li class="hot-item" v-for='item in list' :key='item.id' @click='selectItem(item.id,item.name)'>
                <a href="javascript:;">
                    <div class="img-box">
                        <img v-lazy="item.picUrl" alt="">
                        <div class="img-info-box clearfix">
                            <span class="iconfont icon-song pull-left" v-if='item.accessnum'></span>
                            <span class="accessnum pull-left" v-if='item.accessnum'>{{_cAccessnum(item.accessnum)}}</span>
                            <span class="iconfont icon-play pull-right"></span>
                        </div>
                    </div>
                    <div class="info-box">
                        <h3>{{item.desc}}</h3>
                        <p v-if='item.author'>{{item.author}}</p>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  props: ["title", "list"],
  methods: {
    selectItem(disstid, name) {
      let json = {};
      if (name === "song") {
        json = {
          path: `/song/${disstid}`
        };
      } else {
        json = {
          path: `/radio/${disstid}`
        };
      }
      this.$router.push(json);
    },
    _cAccessnum(num) {
      if (num > 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
      return num;
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../../common/less/minxin.less");
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
          width: 100%;
          .iconfont {
            .font-size(14px);
            margin-right: 0.16rem;
            color: #fff;
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
</style>

