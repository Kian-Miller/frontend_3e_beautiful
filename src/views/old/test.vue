<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide>
      <el-link href="https://element.eleme.io" target="_blank">
        测试内容
      </el-link>
      Slide 1
    </swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
    <swiper-slide>Slide 6</swiper-slide>
    <swiper-slide>Slide 7</swiper-slide>
    <swiper-slide>Slide 8</swiper-slide>
    <swiper-slide>Slide 9</swiper-slide>
    <swiper-slide>Slide 10</swiper-slide>
    <div slot="pagination" class="swiper-pagination" />
    <div slot="button-prev" class="swiper-button-prev" />
    <div slot="button-next" class="swiper-button-next" />
  </swiper>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  export default {
    name: 'SwiperExampleLoop',
    title: 'Loop mode / Infinite loop',
    components: {
      Swiper,
      SwiperSlide,
    },
    data() {
      return {
        swiperOption: {
          autoplay: true,
          slidesPerView: 3,
          spaceBetween: 30,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import './styles/init.scss';
  .swiper {
    height: 300px;
    width: 100%;

    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: bold;
      font-size: $font-size-huge * 2;
      background-color: $white;
    }
  }
</style>
