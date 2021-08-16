<template>
  <div>
    <el-button @click="$router.push('/cate/add')">添加</el-button>
    <el-table :data="arr" style="width: 100%" row-key="id">
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180">
      </el-table-column>
      <el-table-column label="图片">
          <template slot-scope="item">
            <img :src="item.row.img" alt="" class="imgbox" v-if="item.row.img">
          </template>
        </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="item">
          <el-tag v-if="item.row.status == 1">启用</el-tag>
          <el-tag v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="$router.push('/cate/' + scope.row.id)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="del(scope)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      arr: [],
    };
  },
  mounted() {
    axios.get("/api/catelist", { params: { istree: true } }).then((res) => {
      this.arr = res.data.list;
    });
  },
  methods: {
    del(obj) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        axios.post("/api/catedelete", { id: obj.row.id }).then((res) => {
          if (res.data.code == 200) {
            this.arr = res.data.list;
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          } else {
            this.$message({
              type: "info",
              message: res.data.msg,
            });
          }
        });
      });
      //   axios.post("/api/catedelete", { id: obj.row.id }).then((res) => {
      //     this.arr = res.data.list;
      //   });
    },
  },
};
</script>

<style scoped>
.imgbox{
  width: 100px;
}
</style>