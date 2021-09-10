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
    <div>
      <el-row :gutter="20">
        <el-col :span="14">
          <div class="">
            <el-image
              style="width: 100%; height: 400px"
              :src="pic_lxwm"
              fit="fill"
            />
          </div>
        </el-col>
        <el-col :span="10">
          <div class="">
            <el-descriptions title="联系信息" :column="1">
              <el-descriptions-item label="联系电话:">
                0532-12345678
              </el-descriptions-item>
              <el-descriptions-item label="传真">
                0532-12345678
              </el-descriptions-item>
              <el-descriptions-item label="邮箱">
                123456@126.com
              </el-descriptions-item>
              <el-descriptions-item label="联系地址">
                山东省青岛市松岭路66号。
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-col>
      </el-row>
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
        pic_lxwm: require('@/assets/old_images/lxwm.jpg'),
      }
    },
    computed: {},
    mounted() {},
  }
</script>

<style lang="scss" scoped>
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
