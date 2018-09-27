export default {
  data() {
    return {
      transitionType: 'slide'
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$emit('refresh')
    next(true)
  },
  methods: {
  }
}
