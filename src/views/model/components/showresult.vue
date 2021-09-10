<template>
  <div class="chart-container">
    <el-row :gutter="20">
      <el-col :span="16">
        <div id="line-chart-container" class="">
          <chart :height="height" :width="width" :line-data="lineData" />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="">
          <el-table :data="lineData" style="width: 100%" height="550">
            <el-table-column label="序号" type="index" width="50" />
            <el-table-column label="结果" width="180">
              <template slot-scope="scope">
                <span>{{ scope.row }}</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- <chart id="chart1" height="300px" width="400px" /> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Chart from './LineMarker'
  import { analysis } from '@/api/modelmanage'
  export default {
    name: 'ShowResult',
    components: { Chart },
    props: {
      className: {
        type: String,
        default: 'chart',
      },
      id: {
        type: String,
        default: 'chart',
      },
      width: {
        type: String,
        default: '200px',
      },
      height: {
        type: String,
        default: '200px',
      },
      modelAndData: {
        type: Object,
        default: () => {
          return {
            variable: [],
          }
        },
      },
    },
    data() {
      return {
        lineData: [],
      }
    },

    watch: {
      modelAndData: {
        handler() {},
      },
    },
    mounted() {},
    methods: {
      run(md) {
        //   const tmp = JSON.stringify(this.modelAndData);
        const tmp = JSON.stringify(md)
        analysis(tmp).then((response) => {
          const datatmp = response.result.split('_|_')
          this.lineData = datatmp
          console.log(datatmp)
        })
      },
    },
  }
</script>

<style scoped>
  .chart-container {
    position: relative;
    width: 100%;
    /* height: calc(100vh - 84px); */
    height: 884px;
  }
</style>
