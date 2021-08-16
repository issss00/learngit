<template>
  <div>
    <h1>角色{{ tip }}</h1>
    <el-form
      :model="info"
      :rules="rules"
      ref="form"
      style="width: 400px"
      label-width="80px"
    >
      <el-form-item label="角色名称" prop="title">
        <el-input v-model="info.rolename" placeholder="请输入角色名称"></el-input>
      </el-form-item>

      <el-form-item label="角色权限">
        <el-tree
          :data="menusarr"
          show-checkbox
          :default-checked-keys="checkedKeys"
          node-key="id"
          ref="mytree"
          :props="defaultProps"
        >
        </el-tree>
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
          rolename:'',
          menus:'',
          status:1
      },
      rules: {
        rolename: [{ required: true, message: "请填写角色名称" }],
      },
      menusarr: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
      checkedKeys:[]
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate((val) => {
        if (val) {
          var url = "/api/roleadd";
          if (this.$route.params.id) {
            url = "/api/roleedit";
            this.info.id = this.$route.params.id;
          }
          // 把选中的节点数组转换成字符串 并赋值给对象
          // getCheckedKeys  获取选中节点的id属性
          this.info.menus = this.$refs.mytree.getCheckedKeys().join(",");
          console.log(this.info)
          axios.post(url, this.info).then((res) => {
            if (res.data.code == 200) {
              this.$router.push("/role");
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
        .get("/api/roleinfo", { params: { id: this.$route.params.id } })
        .then((res) => {
          this.info = res.data.list;
          this.checkedKeys = this.info.menus.split("，").map((d) => parseInt(d));
          
          // setCheckedKeys  设置选中的节点
          this.$refs.mytree.setCheckedKeys(this.checkedKeys);
        });
    }
    axios.get("/api/menulist?istree=true").then((res) => {
      this.menusarr = res.data.list;
    });
  },
};
</script>

<style>
</style>