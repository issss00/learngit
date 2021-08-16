<template>
  <div>
    <h1>商品{{ tip }}页</h1>
    <el-form :model="info" :rules="rules" ref="form">
      <el-form-item label="一级分类" prop="first_cateid">
        <el-select v-model="info.first_cateid" @change="cateChange">
          <el-option
            v-for="item in cate1"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" prop="second_cateid">
        <el-select v-model="info.second_cateid">
          <el-option
            v-for="item in cate2"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品规格">
        <el-select v-model="info.specsid" @change="specsChange">
          <el-option
            v-for="specsitem in specsarr"
            :key="specsitem.id"
            :label="item.specsname"
            :value="specsitem.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格属性">
        <el-select v-model="info.specsattr" multiple="">
          <el-option
            v-for="(attritem, index) in attrarr"
            :key="index"
            :label="attritem"
            :value="attritem"
          ></el-option>
        </el-select>
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
      <el-form-item>
        <el-button type="primary" @click="submit()">提交</el-button>
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
        id: "",
        img:'',
        first_cateid: "",
        second_cateid: "",
        specsid: "",
        specsattr: "",
      },
      cate1: [],
      cate2: [],
      specsarr: [],
      attrarr: [],
      rules: {
        first_cateid: [{ required: true, message: "请选择一级分类" }],
        second_cateid: [{ required: true, message: "请选择二级分类" }],
      },
    };
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
      axios.get("/api/catelist?pid=" + n).then((res) => {
        this.cate2 = res.data.list;
      });
    },
    specsChange(n) {
      axios.get("/api/specsinfo?id=" + n).then((res) => {
        this.attrarr = res.data.list[0].attrs;
      });
    },
    submit() {
      var url = "/api/goodsadd";
      if (this.$route.params.id) {
        url = "/api/goodsedit";
        this.info.id = this.$route.params.id;
      }
      var data = new FormData();
      for (let i in this.info) {
        data.append(i, this.info[i]);
      }
      this.$refs["form"].validate((val) => {
        if (val) {
          axios.post(url,data).then((res) => {
              if (res.data.code == 200) {
                this.$router.push("/goods");
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
        .get("/api/goodsinfo", { params: { id: this.$route.params.id } })
        .then((res) => {
          this.info = res.data.list;
          this.fileList = [{url:this.info.img}]
        });
    }
    axios.get("/api/catelist?pid=0").then((res) => {
      this.cate1 = res.data.list;
    });
    axios.get("/api/specslist").then((res) => {
      this.specsarr = res.data.list;
    });
  },
};
</script>

<style>
</style>