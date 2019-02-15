<template>
  <div id="app">
    <wv-header class="header">webflow</wv-header>
    <router-view />
    <wv-footer class="footer">
      <div class="pull-right">
        <button v-once class="fbtn iconfont" v-html="$icons.Setting"></button>
      </div>
    </wv-footer>
  </div>
</template>

<script>
export default {
  name: 'Application',
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
@import './styles/index';

#app {
  box-sizing: border-box;
  min-height: 100vh;
  padding: 30px 10px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #142334;
}

.header,
.footer {
  position: fixed;
  left: 0;
  z-index: 9999999;
  width: 100%;
}

.header {
  -webkit-app-region: drag;
  top: 0;
}

.footer {
  box-sizing: border-box;
  padding: 0 6px;
  &:extend(.clearfix);
  bottom: 0;
}

.fbtn {
  padding: 6px;
  font-size: 18px;
  color: #2bae85;
  background: transparent;
  border: none;
  outline: none;

  &:hover {
    color: #248067;
  }

  & + & {
    margin-left: 10px;
  }
}
</style>
