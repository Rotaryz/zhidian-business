export default {
  data() {
    return {
      transitionType: 'slide'
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$emit('refresh')
    // this.transitionType = 'out'
    next(true)
  },
  methods: {
  }
}
