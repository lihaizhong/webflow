<template>
  <div class="home"></div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState(['projectList'])
  },
  methods: {
    ...mapActions(['deleteProjectAction']),
    onHandleDelete(_id) {
      this.deleteProjectAction(_id)
    },
    onHandleExecTask(command) {
      this.$bridge.exec(command)
    }
  }
}
</script>

<style lang="less" scoped></style>
