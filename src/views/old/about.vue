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
    <el-row>
      <el-col :span="4">
        <div class="">
          <el-tree
            :data="data"
            :props="defaultProps"
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="block">
          {{ select_data }}
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
        data: [
          {
            label: '3E介绍',
            id: 0,
            children: [],
          },
          {
            label: '"3E"系统描述',
            id: 1,
            children: [],
          },
          {
            label: '数据来源',
            id: 2,
            children: [],
          },
        ],
        defaultProps: {
          children: 'children',
          label: 'label',
        },
        content: [
          '3E介绍3E介绍3E介绍',
          '随着互联网的发展及《中国制造2025》、《新一代人工智能发展规划》等系列政策的指引，中国科技及制造业突飞猛进、新行企业不断涌现，智能互联所引发的消费升级和工业革命，正让中国从“制造大国”迈向“智造大国”。 目前，中国消费电子、人工智能产业处在高速发展期，国内消费电子企业亟需走出国门，与世界接轨。另一方面，世界消费电子产业的发展、融合，也亟需中国市场。在国家政策推动与引领及产业需求推动下，3E北京国际消费电子博览会（3E展）作为引领海内外产业发展与创新的“风向标”，短短两年间，吸引谷歌、亚马逊、华为、京东、诺基亚、苏宁、大疆、海康威视、爱国者、神目信息、科大讯飞、科沃斯、中信易家、喜马拉雅等众多世界500强企业及行业独角兽惊艳亮相，全面展示了全球消费电子产业最新产品和技术',
          '数据来源数据来源数据来源',
        ],
        select_data: '',
      }
    },
    methods: {
      handleNodeClick(data) {
        this.select_data = ''
        this.select_data = this.content[data.id]
      },
    },
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
