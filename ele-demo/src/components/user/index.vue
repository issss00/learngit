<template>
  <div>
    <h2>管理员表格页</h2>
    <el-button @click="$router.push('/user/add')">添加</el-button>
    <el-table
      :data="arr"
      style="width: 100%"
    >
      <el-table-column prop="id" label="编号" width="180">
      </el-table-column>
      <el-table-column label="所属角色" prop="rolename" width="180">
      </el-table-column>
      <el-table-column prop="username" label="管理员名称" width="180">
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="item">
          <el-tag v-if="item.row.status==1">启用</el-tag>
          <el-tag v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="$router.push('/user/'+scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="200"
      layout="prev,pager,next"
      :page-size="2"
      @current-change="pageChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      arr:[],
      page:1,
      total: 0
    }
  },
  mounted() {
    // 获取管理员总数  用于分页
    axios({
      url: "/api/usercount",
      // 设置请求头信息
    }).then((res) => {
      if(res.data.code === 200){
        this.total = res.data.list[0].total;
      }
    });
    this.getPageList();
    
  },
  methods:{
      // 获取分页数据
    getPageList() {
      axios
        .get('/api/userlist',{params:{size:2,page:this.page}})
        .then((res) => {
          this.arr = res.data.list;
        });
    },
    pageChange(n) {
      this.page = n
      this.getPageList();
    },
    del(obj) {
      this.$confirm("此操作将永久删除该管理员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        axios.post("/api/userdelete", { id: obj.row.id }).then((res) => {
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
      //   axios.post("/api/userdelete", { id: obj.row.id }).then((res) => {
      //     this.arr = res.data.list;
      //   });
    },
  }
};
</script>

<style>
</style>