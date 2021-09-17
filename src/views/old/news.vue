<template>
  <div class="app-container">
    <div class="mytop" :style="{background: 'url('+pic_background+') no-repeat center', 'background-size':'cover'}">
      <div class="cmg-banner-title">
        <h3>最新动态</h3>
        <p>我们为您展示对您最重要的内容，让您每次访问都能发现有意义的内容。</p>
      </div>
    </div>
    <div>
      <el-row>
        <el-col :span="4" class="">
          <div class="nav-tabs">
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
          </div>
        </el-col>
        <el-col :span="18">
          <div class="block">
            <el-timeline>
              <el-timeline-item v-for="(item, index) in select_data" :key="index" :timestamp="item.timestamp" placement="top">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      pic_background: require('@/assets/3e/news.jpg'),
      data: [
        {
          label: '科研技术',
          children: [],
        },
        {
          label: '政策法规',
          children: [],
        },
        {
          label: '能源企业',
          children: [],
        },
        {
          label: '投资环境',
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
  height: 220px;
  width: 100%;
  float: left;
  margin-bottom: 20px;
}
.cmg-banner-title {
  width: 100%;
  padding: 73px 50px 0;
}

.cmg-banner-title h3 {
  font-size: 22px;
  color: #fff;
  margin: 10px 0;
  padding: 0;
}

.cmg-banner-title p {
  font-size: 15px;
  color: #fff;
}
.nav-tabs {
  margin: 0;
  padding: 0px;
  color: #333;
  background: #f5f5f5;
  overflow: auto;
  height: 550px;
}
.nav-tabs ::v-deep .el-tree {
  color: #333;
  background: #f5f5f5;
}
.nav-tabs ::v-deep .el-tree-node__content {
  height: 50px;
}
.nav-tabs ::v-deep .el-tree-node.is-current > .el-tree-node__content {
  background: #f0f4ff;
  color: #3c4353;
  font-weight: bold;
}
</style>
