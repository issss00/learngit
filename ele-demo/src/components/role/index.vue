<template>
  <div>
    <h2>角色表格页</h2>
    <el-button @click="$router.push('/role/add')">添加</el-button>
    <el-table
      :data="arr"
      style="width: 100%"
    >
      <el-table-column prop="id" label="编号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" sortable width="180">
      </el-table-column>
      
      <el-table-column label="状态" width="180">
        <template slot-scope="item">
          <el-tag v-if="item.row.status==1">启用</el-tag>
          <el-tag v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="$router.push('/role/'+scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      arr:[],
      
    }
  },
  mounted() {
    this.axios.get("/api/rolelist").then((res) => {
      this.arr = res.data.list;
    });
  },
  methods:{
      
    del(obj) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        axios.post("/api/roledelete", { id: obj.row.id }).then((res) => {
          if (res.data.code == 200) {
            // this.arr = res.data.list;
            this.arr.splice(obj.$index,1)
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
      //   axios.post("/api/roledelete", { id: obj.row.id }).then((res) => {
      //     this.arr = res.data.list;
      //   });
    },
  }
};
</script>

<style>
</style>