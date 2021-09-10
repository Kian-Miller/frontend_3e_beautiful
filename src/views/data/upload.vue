<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="结构化数据" name="first">
      <!-- <upload-excel /> -->
    </el-tab-pane>
    <el-tab-pane label="结构化数据" name="second">
      <myindex />
    </el-tab-pane>
    <!-- <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane> -->
    <!-- <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
  </el-tabs>
</template>
<script>
  import Myindex from './components/myindex.vue'
  // import uploadExcel from './components/upload-excel.vue'
  export default {
    components: { Myindex },
    data() {
      return {
        activeName: 'second',
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      },
    },
  }
</script>
