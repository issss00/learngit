<template>
  <div>
    <h1>菜单{{tip}}</h1>
    <el-form
      :model="info"
      :rules="rules"
      ref="form"
      style="width: 400px"
      label-width="80px"
    >
      <el-form-item label="一级菜单" prop="pid" @change="pidChange">
        <el-select v-model="info.pid">
          <el-option label="顶级菜单" :value="0"></el-option>
          <el-option v-for="menuitem in menuarr" :key="menuitem.id" :label="menuitem.title" :value="menuitem.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="info.title" placeholder="请输入菜单名称"></el-input>
      </el-form-item>

      <el-form-item label="菜单类型">
        <el-radio-group v-model="info.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单图标" v-show="info.type == 1">
        <el-input placeholder="请输入菜单图标" v-model="info.icon"></el-input>
      </el-form-item>
      <el-form-item label="菜单地址" v-show="info.type == 2">
        <el-input placeholder="请输入菜单地址" v-model="info.url"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="info.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      tip:'添加',
      info: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      rules: {
        pid: [
          { required: true, message: "请选择一级菜单" }
        ],
        title: [
          { required: true, message: "请输入菜单名称" },
          { min: 3, max: 15, message: "菜单名称为3-15个字符" },
        ],
      },
      menuarr:[]
    };
  },
  methods:{
    submit(){
      this.$refs['form'].validate((val)=>{
        if(val){
          var url = '/api/menuadd'
          if(this.$route.params.id){
            url='/api/menuedit'
            this.info.id = this.$route.params.id
          }
          axios.post(url,this.info).then(res=>{
            if(res.data.code ==200){
              this.$router.push('/menu')
            }
          })
        }
      })
    },
    pidChange(n){
      this.info.type = n==0 ? 1 : 2
    }
  },
  mounted(){
    if(this.$route.params.id){
      this.tip = '编辑'
      axios.get('/api/menuinfo',{params:{id:this.$route.params.id}}).then(res=>{
        this.info = res.data.list
      })
    }
      axios.get('/api/menulist?pid=0').then(res=>{
        this.menuarr = res.data.list
      })
    }
};
</script>

<style>
</style>