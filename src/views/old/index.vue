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
    <div class="mymid">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="">
            <el-card class="mycard">
              <div slot="header" class="clearfix">
                <span>新闻动态</span>
                <el-link
                  style="float: right; padding: 3px 0"
                  type="primary"
                  href="http://www.stats.gov.cn/"
                >
                  more
                </el-link>
              </div>
              <div v-for="o in 4" :key="o" class="text item">
                {{ '新闻列表内容 ' + o }}
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="">
            <el-card class="">
              <div slot="header" class="clearfix">
                <span>3E系统</span>
                <el-link
                  style="float: right; padding: 3px 0"
                  type="primary"
                  href="http://www.stats.gov.cn/"
                >
                  more
                </el-link>
              </div>
              <div>
                <el-image
                  style="height: 150px; float: left"
                  :src="require('@/assets/old_images/pic.jpg')"
                  fit="fill"
                />
                随着互联网的发展及《中国制造2025》、《新一代人工智能发展规划》等系列政策的指引，中国科技及制造业突飞猛进、新行企业不断涌现，智能互联所引发的消费升级和工业革命，正让中国从“制造大国”迈向“智造大国”。
                目前，中国消费电子、人工智能产业处在高速发展期，国内消费电子企业亟需走出国门，与世界接轨。另一方面，世界消费电子产业的发展、融合，也亟需中国市场。在国家政策推动与引领及产业需求推动下，3E北京国际消费电子博览会（3E展）
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="">
            <el-card class="">
              <div slot="header" class="clearfix">
                <span>联系我们</span>
                <el-link
                  style="float: right; padding: 3px 0"
                  type="primary"
                  href="http://www.stats.gov.cn/"
                >
                  more
                </el-link>
              </div>
              <div v-for="o in contact" :key="o.id" class="text item">
                {{ o.name + ' : ' + o.value }}
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="mybot">
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
              <img :src="item.url" alt="" />
            </swiper-slide>
            <!-- <div class="swiper-pagination" slot="pagination"></div> -->
            <div slot="button-prev" class="swiper-button-prev" />
            <div slot="button-next" class="swiper-button-next" />
          </swiper>
        </div>
      </el-card>
    </div>
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
          loop: true,
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
          { url: require('@/assets/old_images/cp1.jpg') },
          { url: require('@/assets/old_images/cp2.jpg') },
          { url: require('@/assets/old_images/cp3.jpg') },
          { url: require('@/assets/old_images/cp4.jpg') },
        ],
        contact: [
          { id: '1', name: '公司', value: '3E大数据处理系统' },
          { id: '2', name: '传真', value: '01111111111111' },
          { id: '3', name: '邮箱', value: '01111111111111' },
          { id: '4', name: '联系', value: '周经理' },
          { id: '5', name: '电话', value: '01234567891000' },
          { id: '6', name: '网址', value: '127.0.0.1' },
        ],
      }
    },
    computed: {},
    mounted() {},
  }
</script>

<style lang="scss" scoped>
  @import './styles/init.scss';
  @import './styles/base.scss';
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
  .el-card {
    height: 380px;
    ::v-deep .el-card__header {
      background: aliceblue;
    }
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 100%;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .swiper {
    margin-bottom: 10px;
  }
</style>
