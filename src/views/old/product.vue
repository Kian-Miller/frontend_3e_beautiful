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
    <el-card class="mycard">
      <div slot="header" class="clearfix">
        <span>案例分析</span>
        <el-link
          style="float: right; padding: 3px 0"
          type="primary"
          href="http://www.stats.gov.cn/"
        >
          more
        </el-link>
      </div>
      <div>
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="(item, index) in pic_bot" :key="index">
            <a href="https://element.eleme.io">
              <img :src="item.url" :style="{ height: '400px' }" alt="" />
              <span class="text">{{ item.content }}</span>
            </a>
            <!-- <img :src="item.url" alt=""> -->
            <!-- <el-link href="https://element.eleme.io" :style="{'text-align':'center'}">{{item.content}}</el-link> -->
          </swiper-slide>
          <!-- <div class="swiper-pagination" slot="pagination"></div> -->
          <div slot="button-prev" class="swiper-button-prev" />
          <div slot="button-next" class="swiper-button-next" />
        </swiper>
      </div>
    </el-card>
  </div>
</template>
<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    data() {
      return {
        swiperOption: {
          // 自动轮播
          autoplay: {
            delay: 2000,
            // 当用户滑动图片后继续自动轮播
            disableOnInteraction: false,
          },
          // 开启循环模式
          // loop: true,
          slidesPerView: 4,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
        pic_top: [
          { url: require('@/assets/old_images/banner1.jpg') },
          { url: require('@/assets/old_images/banner2.jpg') },
          { url: require('@/assets/old_images/banner3.jpg') },
        ],
        pic_bot: [
          {
            url: require('@/assets/old_images/cp1.jpg'),
            content: '3E决策系统模拟仿真研究',
          },
          {
            url: require('@/assets/old_images/cp2.jpg'),
            content: '区域碳市场模拟运行',
          },
          {
            url: require('@/assets/old_images/cp3.jpg'),
            content: '产业3E系统仿真与优化',
          },
          {
            url: require('@/assets/old_images/cp4.jpg'),
            content: '3E管理信息系统开发推广',
          },
        ],
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import './styles/init.scss';
  @import './styles/base.scss';
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
  .mycard {
    //   .el-card__body {
    //     height: 500px;
    //     color: #475669;
    //     font-size: 14px;
    //     opacity: 0.75;
    //     line-height: 150px;
    //     margin: 0;
    //   }
    .swiper {
      height: 450px;
    }
    .text {
      font-size: 14px;
    }
  }
</style>
