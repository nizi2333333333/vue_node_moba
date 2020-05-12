<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="账号">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AdminUserCreate ",
  data() {
    return {
      model: {},
      parents:[]
    };
  },
  props: {
    id: String
  },
  methods: {
    // 如果有id，就是编辑；若无，就是新增
    async save() {
      let res
      if(this.id){
        res = await this.$http.put(`/rest/admin_users/${this.id}`, this.model);
      }else{
        res = await this.$http.post("/rest/admin_users", this.model);
      }
      this.$router.push("/admin_users/list");
      this.$message({
        message: "保存成功",
        type: "success"
      });
    },
    // 编辑——根据id获取信息，放入页面
    async fetch(){
      const res = await this.$http.get(`/rest/admin_users/${this.id}`, this.id);
      this.model = res.data
    },
    // 获取父级的分类选项
    async fetchParents(){
      const res = await this.$http.get(`/rest/admin_users`);
      this.parents = res.data
    }
  },
  created(){
    this.fetchParents()
    this.id && this.fetch() 
  },
  watch: {
    '$route.path'(val) {
      if(val === '/admin_users/create'){
        this.model = {}
      }
    }
  }
};
</script>
<style lang='scss' scoped>
</style>