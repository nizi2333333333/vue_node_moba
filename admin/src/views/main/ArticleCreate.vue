<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <vue-editor
          id="editor"
          useCustomImageHandler
          @image-added="handleImageAdded"
          v-model="model.body"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  name: "ArticleCreate",
  data() {
    return {
      model: { categories: [], title: "", body: "" },
      categories: []
    };
  },
  components: {
    VueEditor
  },
  props: {
    id: String
  },
  methods: {
    // 富文本编辑器图片上传
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post('upload',formData)
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    // 如果有id，就是编辑；若无，就是新增
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/articles/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/rest/articles", this.model);
      }
      this.$router.push("/articles/list");
      this.$message({
        message: "保存成功",
        type: "success"
      });
    },
    // 编辑——根据id获取信息，放入页面
    async fetch() {
      const res = await this.$http.get(`/rest/articles/${this.id}`, this.id);
      this.model = res.data;
    },
    // 获取文章的分类选项
    async fetchCategories() {
      const res = await this.$http.get(`/rest/categories`);
      console.log(res);
      this.categories = res.data;
    }
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  },
  watch: {
    "$route.path"(val) {
      if (val === "/articles/create") {
        this.model = { categories: [], title: "", body: "" };
      }
    }
  }
};
</script>
<style lang='scss' scoped>
</style>