<template>
  <div>
    <h1>英雄列表</h1>
    <el-table :data="heroes">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template slot-scope="scope">
          <img :src = 'scope.row.avatar' style='height: 3rem'></img>
          <!-- {{scope}} -->
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/heroes/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "HeroList",
  data() {
    return {
      heroes: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/rest/heroes");
      this.heroes = res.data;
    },
    remove(row) {
      console.log(row)
      this.$confirm(`是否确定删除分类${row.name}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`/rest/heroes/${row._id}`);
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
  components: {},

  computed: {}
};
</script>
<style lang='scss' scoped>
</style>