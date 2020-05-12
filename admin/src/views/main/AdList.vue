<template>
  <div>
    <h1>物品列表</h1>
    <el-table :data="ads">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="items" label="图片">
        <template slot-scope="scope">
          <img :src = 'scope.row.items[0].image' style='height: 3rem'></img>
          <!-- {{scope.row}} -->
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/ads/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "AdList",
  data() {
    return {
      ads: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/rest/ads");
      this.ads = res.data;
    },
    remove(row) {
      console.log(row)
      this.$confirm(`是否确定删除分类${row.name}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`/rest/ads/${row._id}`);
          console.log(res);
          this.fetch();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })  
    }
  },
  created() {
    this.fetch();
  },
};
</script>
<style lang='scss' scoped>
</style>