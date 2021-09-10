<template>
  <div class="my-upload-container">
    <el-upload
      ref="xlsupload"
      class="upload-demo"
      :action="uploadFileUrl"
      drag
      accept=".csv, .xls, .xlsx"
      :data="fileform"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <!-- <el-button slot="trigger" size="small" type="primary">选取文件</el-button> -->
      <div slot="tip" class="el-upload__tip">
        只能上传结构化文件，且不超过20MB. 点击文件设置文件类别.
      </div>
    </el-upload>
    <el-button
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="submitUpload"
    >
      上传到服务器
    </el-button>
    <el-dialog
      title="设置文件类别"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>{{ curFile.name }}的属性,多个属性以空格分隔</span>
      <el-input
        v-model="curFile.tag"
        placeholder="请输入文件属性，如属性1 属性2 属性3 ..."
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        fileList: [],
        curFile: '',
        dialogVisible: false,
        uploadFileUrl: process.env.VUE_APP_BASE_URL + '/file/structured/',
        fileform: {
          filename: '',
          uploader: 'admin',
          tag: '',
        },
      }
    },
    methods: {
      beforeUpload(file) {
        console.log(file)
        this.fileform.filename = file.name
        this.fileform.tag = file.tag || file.name
      },
      submitUpload() {
        this.$refs.xlsupload.submit()
      },
      handleRemove(file, fileList) {
        console.log(this.fileList)
        console.log(file, fileList)
      },
      handlePreview(file) {
        this.dialogVisible = true
        this.curFile = file
        this.$set(this.curFile, 'tag', '')
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then((_) => {
            done()
          })
          .catch((_) => {})
      },
    },
  }
</script>
<style>
  .my-upload-container {
    text-align: center; /*让div内部文字居中*/
  }
</style>
