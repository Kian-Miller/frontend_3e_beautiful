<template>
  <div class="demo-image app-container">
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
    <el-row>
      <el-col v-for="(item, index) in pic_yw" :key="index" :span="6">
        <div class="block">
          <el-image
            style="width: 100px; height: 100px"
            :src="item.url"
            fit="cover"
          />
          <span class="demonstration">{{ item.content }}</span>
        </div>
      </el-col>
    </el-row>
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
        pic_yw: [
          {
            url: require('@/assets/old_images/yw1.jpg'),
            content:
              '数据采集与统计分析：宏观经济分析、能源产销变化趋势分析、各地区经济发展趋势分析、能源消费结构分析、环境污染情况及变化趋势分析、经济水平评价分析、环境水平评价分析。',
          },
          {
            url: require('@/assets/old_images/yw2.jpg'),
            content:
              '数据挖掘与决策支撑：能源经济环境关系分析、传统能源替代分析、能源需求预测、节能减排效果评测、能源效率分析、环境治理能力评测、产业结构调整分析、环境效率分析、新能源市场潜力分析等。',
          },
          {
            url: require('@/assets/old_images/yw3.jpg'),
            content:
              '数据检测和预警分析：利用“3E”大数据系统的实时搜集数据、快速整理存储数据的功能，以及“3E”大数据系统拥有的全面的各地区数据的优势，结合GIS地理信息系统，“3E”大数据系统可以实现对各重点城市地区的环境污染情况和能源消耗情况的实施检测和预警。',
          },
          {
            url: require('@/assets/old_images/yw4.jpg'),
            content:
              '信息共享与实时发布：信息共享与实时发布主要针对的是高校、科研机构、研究学者及个人、社会组织等所有需要原始数据、相关资讯的用户',
          },
        ],
      }
    },
  }
</script>
<style lang="scss" scoped>
  .demo-image {
    .block {
      padding: 30px 0;
      text-align: center;
      border-right: solid 1px #eff2f6;
      display: inline-block;
      box-sizing: border-box;
      vertical-align: top;
      &:last-child {
        border-right: none;
      }
    }

    .demonstration {
      display: block;
      color: black;
      font-size: 16px;
      margin-bottom: 20px;
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
