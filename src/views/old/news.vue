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
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in select_data"
              :key="index"
              :timestamp="item.timestamp"
              placement="top"
            >
              <el-card>
                <h4>{{ select_label }}</h4>
                <p>{{ item.title }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
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
            label: '新闻资讯',
            children: [],
          },
          {
            label: '政策法规',
            children: [],
          },
          {
            label: '最新科研动态',
            children: [],
          },
          {
            label: '行业动态',
            children: [],
          },
        ],
        defaultProps: {
          children: 'children',
          label: 'label',
        },
        news_data: {
          新闻资讯: [
            {
              timestamp: '2018/12/11',
              title: 'IBM：新一代信息技术正在重塑社会--从数字化到智能化',
            },
            {
              timestamp: '2019/12/11',
              title: '金风科技：大数据助力绿色能源装备制造',
            },
            {
              timestamp: '2020/12/11',
              title: 'IBM：新一代信息技术正在重塑社会--从数字化到智能化',
            },
          ],
          政策法规: [
            {
              timestamp: '2018/12/11',
              title: 'IBM：新一代信息技术正在重塑社会--从数字化到智能化',
            },
            {
              timestamp: '2019/12/11',
              title: '金风科技：大数据助力绿色能源装备制造',
            },
            {
              timestamp: '2020/12/11',
              title: 'IBM：新一代信息技术正在重塑社会--从数字化到智能化',
            },
          ],
          最新科研动态: [
            {
              timestamp: '2018/12/11',
              title: 'IBM：新一代信息技术正在重塑社会--从数字化到智能化',
            },
            {
              timestamp: '2019/12/11',
              title: '金风科技：大数据助力绿色能源装备制造',
            },
            {
              timestamp: '2020/12/11',
              title: 'IBM：新一代信息技术正在重塑社会--从数字化到智能化',
            },
          ],
          行业动态: [
            {
              timestamp: '2018/12/11',
              title: 'IBM：新一代信息技术正在重塑社会--从数字化到智能化',
            },
            {
              timestamp: '2019/12/11',
              title: '金风科技：大数据助力绿色能源装备制造',
            },
            {
              timestamp: '2020/12/11',
              title: 'IBM：新一代信息技术正在重塑社会--从数字化到智能化',
            },
          ],
        },
        select_data: [],
        select_label: '',
      }
    },
    methods: {
      handleNodeClick(data) {
        this.select_data = []
        this.select_label = data.label
        this.select_data = this.news_data[data.label]
        console.log(this.select_data)
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
