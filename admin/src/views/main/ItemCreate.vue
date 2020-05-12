<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <!-- :action="$http.defaults.baseURL+'/upload'"
        :headers = "{Authorization: `Bearer ${localStorage.token}`}"-->
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="imageLoaded"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {uploadMixin} from "common/mixin"
export default {
  name: "ItemCreate",
  mixins: [uploadMixin],
  data() {
    return {
      model: {}
    };
  },
  props: {
    id: String
  },
  methods: {
    // 图片上传成功
    imageLoaded(file){
      this.$set(this.model,'icon',file.url)
    },
    // 如果有id，就是编辑；若无，就是新增
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/items/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/rest/items", this.model);
      }
      this.$router.push("/items/list");
      this.$message({
        message: "保存成功",
        type: "success"
      });
    },
    // 编辑——根据id获取信息，放入页面
    async fetch() {
      const res = await this.$http.get(`/rest/items/${this.id}`, this.id);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  },
  watch: {
    "$route.path"(val) {
      if (val === "/items/create") {
        this.model = {};
      }
    }
  }
};
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>