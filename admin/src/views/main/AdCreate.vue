<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-form-item>
          <el-button type="primary" size="small" @click="model.items.push({})">
            <i class="el-icon-plus"></i>新加广告
          </el-button>
        </el-form-item>
        <el-row>
          <el-col v-for="(item,i) in model.items" :key="i">
            <el-form-item label="URL">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top: 1rem">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="file => $set(item,'image',file.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="default" size="small" @click="model.items.splice(i,1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { uploadMixin } from "common/mixin"
export default {
  name: "AdCreate",
  mixins: [uploadMixin],
  data() {
    return {
      model: {
        name: "",
        items: []
      }
    };
  },
  props: {
    id: String
  },
  methods: {
    // 图片上传成功
    // imageLoaded(file) {
    //   this.$set(this.model.items, "image", file.url);
    // },
    // 如果有id，就是编辑；若无，就是新增
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/ads/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/rest/ads", this.model);
      }
      this.$router.push("/ads/list");
      this.$message({
        message: "保存成功",
        type: "success"
      });
    },
    // 编辑——根据id获取信息，放入页面
    async fetch() {
      const res = await this.$http.get(`/rest/ads/${this.id}`, this.id);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  },
  watch: {
    "$route.path"(val) {
      if (val === "/ads/create") {
        this.model = {
          name: "",
          items: []
        };
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
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  min-width: 5rem;
  height: 5rem;
  display: block;
}
</style>