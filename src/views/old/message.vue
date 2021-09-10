<template>
  <div class="app-container">
    <div class="mytop">
      <el-carousel height="300px">
        <el-carousel-item v-for="(item, index) in pic_top" :key="index">
          <el-image
            style="width: 100%; height: 300px"
            :src="item.url"
            fit="fill"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div
      class="message"
      :style="{
        backgroundImage: `url(${pic_zxly})`,
        'background-repeat': 'no-repeat',
      }"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户:">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="电话:">
          <el-input v-model="form.tel" />
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="内容:">
          <el-input v-model="form.content" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        pic_top: [
          { url: require('@/assets/old_images/banner1.jpg') },
          { url: require('@/assets/old_images/banner2.jpg') },
          { url: require('@/assets/old_images/banner3.jpg') },
        ],
        pic_zxly: require('@/assets/old_images/bg4.jpg'),
        form: {
          name: '',
          tel: '',
          email: '',
          content: '',
        },
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .message {
    .el-form-item {
      width: 500px;
    }
  }
  .mytop {
    padding-bottom: 10px;
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
    .text {
      font-size: 14px;
    }

    .item {
      margin-bottom: 18px;
    }
  }
</style>
