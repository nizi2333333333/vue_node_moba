<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">请先登录</div>
      <el-form >
        <el-form-item label="用户名">
          <el-input type="text" v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click.native.prevent="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      model:{
        username:"",
        password:""
      }
    };
  },

  components: {},

  computed: {},

  methods: {
    async login(){
      const res = await this.$http.post('login',this.model)
      // console.log(res.data.token)
      // sessionStorage.token = res.data.token // 浏览器关闭后，没有了
      localStorage.token = res.data.token // 浏览器关闭后，还有
      this.$router.push('/')
      this.$message({
        type: "success",
        message: "登录成功"
      })
    }
  }
};
</script>
<style scoped>
.box-card {
  width: 25rem;
  margin: 10rem auto;
}
</style>