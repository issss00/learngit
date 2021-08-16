<template>
  <div>
    <h2>菜单表格页</h2>
    <el-button @click="$router.push('/menu/add')">添加</el-button>
    <el-table
      :data="arr"
      style="width: 100%"
      row-key="id"
    >
      <el-table-column prop="id" label="编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable width="180">
      </el-table-column>
      <el-table-column label="菜单类型"> 
        <template slot-scope="item">
          <el-tag v-if="item.row.type==1">目录</el-tag>
          <el-tag v-else>菜单</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标" sortable width="180">
        <template slot-scope="item">
          <i :class="item.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址" sortable width="180">
      </el-table-column>
      <el-table-column label="状态" sortable width="180">
        <template slot-scope="item">
          <el-tag v-if="item.row.status==1">启用</el-tag>
          <el-tag v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="$router.push('/menu/'+scope.row.id)">编辑</el-button>
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
      arr:[]
    }
  },
  mounted(){
    axios.get('/api/menulist',{params:{istree:true}}).then(res=>{
      this.arr = res.data.list
    })
  },
  methods:{
    del(obj) {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        axios.post("/api/menudelete", { id: obj.row.id }).then((res) => {
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
      //   axios.post("/api/menudelete", { id: obj.row.id }).then((res) => {
      //     this.arr = res.data.list;
      //   });
    },
  }
};
</script>

<style>
</style>