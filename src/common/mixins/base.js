export default {
  method: {
    $showLoading() {
      this.$refs.loading && this.$refs.loading.show()
    },
    $hideLoading() {
      this.$refs.loading && this.$refs.loading.hide()
    },
    $showToast(content, time) {
      if (!content) return
      this.$refs.toast && this.$refs.toast.show(content, time)
    }
  }
}
