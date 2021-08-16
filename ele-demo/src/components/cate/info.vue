<template>
  <div>
    <h1>商品分类添加</h1>
    <el-form :model="info" :rules="rules" ref="form">
      <el-form-item label="上级分类" prop="pid">
        <el-select v-model="info.pid">
          <el-option label="顶级分类" :value="0"></el-option>
          <el-option
            v-for="item in catearr"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="catename">
        <el-input
          placeholder="请输入分类名称"
          v-model="info.catename"
        ></el-input>
      </el-form-item>
      <!-- 图片上传 -->
      <el-form-item label="图片" v-show="info.pid != 0">
        <el-upload action="#" 
        list-type="picture-card" 
        :auto-upload="false"
        :on-change="fileChange"
        :file-list="fileList"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                class="el-upload-list__item-delete"
                @click="handPictureDel"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
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
      dialogVisible:false,
      dialogImageUrl:'',
      fileList:[],
      info: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
      catearr: [],
      rules: {
        pid: [{ required: true, message: "请选择上级分类" }],
        catename: [{ required: true, message: "请输入分类名称" }],
      },
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.tip = "编辑";
      axios
        .get("/api/cateinfo", { params: { id: this.$route.params.id } })
        .then((res) => {
          this.info = res.data.list;
          this.fileList = [{url:this.info.img}]
        });
    }
    axios.get("api/catelist").then((res) => {
      this.catearr = res.data.list;
    });
  },
  methods: {
    handlePictureCardPreview(file){
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    fileChange(file){
      this.info.img = file.raw
    },
    handPictureDel(){
      this.fileList = []
    },
    cateChange(n) {
      this.info.type = n == 0 ? 1 : 2;
    },
    submit() {
      this.$refs["form"].validate((val) => {
        if (val) {
          var url = "/api/cateadd";
          if (this.$route.params.id) {
            url = "/api/cateedit";
            this.info.id = this.$route.params.id;
          }
          var data = new FormData();
          for (let i in this.info) {
            data.append(i, this.info[i]);
          }
          axios.post(url, data).then((res) => {
            if (res.data.code == 200) {
              this.$router.push("/cate");
            }
          });
        }
      });
    },
  },
};
</script>

<style>
</style>