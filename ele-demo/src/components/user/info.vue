<template>
  <div>
    <h1>管理员{{ tip }}</h1>
    <el-form
      :model="info"
      :rules="rules"
      ref="form"
      style="width: 400px"
      label-width="80px"
    >
      <el-form-item label="所属角色" prop="roleid">
        <el-select v-model="info.roleid">
            <el-option 
            v-for="roleitem in rolearr"
            :key="roleitem.id"
            :label="roleitem.rolename"
            :value="roleitem.id">
            </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户名" prop="username">
          <el-input v-model="info.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
          <el-input v-model="info.password" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch
          v-model="info.status"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tip: "添加",
      info: {
          roleid:'',
          username:'',
          password:'',
          status:1
      },
      rules: {
        roleid: [{ required: true, message: "请选择所属角色" }],
        username:[{required:true,message:'请输入用户名'},{min:3,max:20,message:'用户名应该在3-20个字符之间'}]
      },
      rolearr:[]
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate((val) => {
        if (val) {
          var url = "/api/useradd";
          if (this.$route.params.id) {
            url = "/api/useredit";
            this.info.id = this.$route.params.id;
          }
          axios.post(url, this.info).then((res) => {
            if (res.data.code == 200) {
              this.$router.push("/user");
            }else{
                this.$message(res.data.msg)
            }
          });
        }
      });
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.tip = "编辑";
      axios
        .get("/api/userinfo", { params: { id: this.$route.params.id } })
        .then((res) => {
          this.info = res.data.list;
          this.info.password = ''
        });
    }
    axios.get("/api/rolelist").then((res) => {
      this.rolearr = res.data.list;
    });
  },
};
</script>

<style>
</style>