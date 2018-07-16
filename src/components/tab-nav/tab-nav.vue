<template lang="html">
  <div id='tabNav'>
    <router-link tag='div' class="tab-item" to='/recommend'>
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag='div' class="tab-item" to='/singer'>
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag='div' class="tab-item" to='/rank'>
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag='div' class="tab-item" to='/search'>
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'tabNav'

}
</script>

<style lang="less" scoped>
@import url('../../common/less/minxin.less');
#tabNav {
    display: flex;
    height: 1.17rem;
    line-height: 1.17rem;
    div {
        flex: 1 1 auto;
        text-align: center;
        .tab-link {
            color: hsla(0,0%,100%,.5);
            padding-bottom: 0.16rem;
            border-bottom: .05rem solid transparent;
            .font-size(14px);
        }
        &.router-link-active {
            .tab-link {
                color: rgb(255, 205, 50);
                border-color: rgb(255, 205, 50);
            }
        }
    }
}
</style>
