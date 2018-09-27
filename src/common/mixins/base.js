export default {
  data() {
    return {
      $currentRouter: null
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$emit('refresh')
    next(true)
  },
  created() {
    this.$currentRouter = (this.$route && this.$route.path)
  },
  methods: {
    $hideTab() {
      this.$emit('$hideTab')
    },
    $showTab() {
      this.$emit('$showTab')
    }
  }
}
