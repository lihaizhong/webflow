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
import { mapActions } from 'vuex'

export default {
  name: 'Application',
  created() {
    this.getProjectListAction()
  },
  methods: {
    ...mapActions(['getProjectListAction'])
  }
}
</script>

<style lang="less">
@font-face {
  .mixin(@env) when (@env = 'development') {
    font-family: 'iconfont'; /* project id 1043725 */
    src: url('//at.alicdn.com/t/font_1043725_jb1pf7tf44.eot');
    src: url('//at.alicdn.com/t/font_1043725_jb1pf7tf44.eot?#iefix')
        format('embedded-opentype'),
      url('//at.alicdn.com/t/font_1043725_jb1pf7tf44.woff2') format('woff2'),
      url('//at.alicdn.com/t/font_1043725_jb1pf7tf44.woff') format('woff'),
      url('//at.alicdn.com/t/font_1043725_jb1pf7tf44.ttf') format('truetype'),
      url('//at.alicdn.com/t/font_1043725_jb1pf7tf44.svg#iconfont')
        format('svg');
  }

  .mixin(@env) when (@env = 'production') {
    font-family: 'iconfont';
    src: url('../font/font_1043725_jb1pf7tf44.eot');
    src: url('../font/font_1043725_jb1pf7tf44.eot?#iefix')
        format('embedded-opentype'),
      url('../font/font_1043725_jb1pf7tf44.woff2') format('woff2'),
      url('../font/font_1043725_jb1pf7tf44.woff') format('woff'),
      url('../font/font_1043725_jb1pf7tf44.ttf') format('truetype'),
      url('../font/font_1043725_jb1pf7tf44.svg#iconfont') format('svg');
  }
}

html,
body {
  min-height: 100vh;
  background: #e2e1e4;
}

.iconfont {
  font-family: 'iconfont' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

.clearfix {
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}

.pull-left {
  float: left;
}

.pull-right {
  float: right;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.text-center {
  text-align: center;
}

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
