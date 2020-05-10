<template>
  <div>
    <h1>新建分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategoryCreate",
  data() {
    return {
      model: {}
    };
  },

  methods: {
    async save() {
      
      const res = await this.$http.post("categories", this.model);
console.log(233)
      this.$router.push("/categories/list");
      this.$message({
        message: "保存成功",
        type: "success"
      });
    }
  }
};
</script>
<style lang='scss' scoped>
</style>