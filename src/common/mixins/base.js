export default {
  beforeRouteLeave(to, from, next) {
    // this.$emit('refresh')
    next(true)
  }
}
