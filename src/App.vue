<template>
  <div id='app'>
    <my-header></my-header>
    <my-tab-nav></my-tab-nav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MyHeader from "@/components/my-header/my-header";
import MyTabNav from "@/components/tab-nav/tab-nav";
export default {
  name: "app",
  components: {
    "my-header": MyHeader,
    "my-tab-nav": MyTabNav
  }
};
</script>

<style lang='less' >
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgb(34, 34, 34);
}
</style>
