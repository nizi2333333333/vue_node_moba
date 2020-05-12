
// 图片上传
export const uploadMixin = {
  computed: {
    uploadUrl(){
      return this.$http.defaults.baseURL + "/upload"
    }
  },
  methods: {
    getAuthHeaders(){
      return {
        Authorization: `Bearer ${localStorage.token}`
      }
    }
  }
}