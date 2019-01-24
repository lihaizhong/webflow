<template>
  <div id="app">
    <wv-header class="header">webflow</wv-header>
    <router-view />
    <wv-footer class="footer"></wv-footer>
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
html,
body {
  min-height: 100vh;
  background: #f7f4ed;
}

#app {
  box-sizing: border-box;
  min-height: 100vh;
  padding: 30px 10px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
  bottom: 0;
}
</style>
