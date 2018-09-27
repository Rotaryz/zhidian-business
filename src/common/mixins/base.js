export default {
  data() {
    return {
      transitionType: 'slide'
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$emit('refresh')
    console.log(from)
    next(true)
  },
  methods: {
  }
}
