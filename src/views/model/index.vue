<template>
  <div class="app-container">
    <div class="build-container">
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1" description="选择模型">1</el-step>
        <el-step title="步骤 2" description="选择数据">2</el-step>
        <el-step title="步骤 3" description="字段映射">3</el-step>
        <el-step title="步骤 4" description="分析">4</el-step>
      </el-steps>

      <el-button
        :disabled="active === 1"
        style="margin-top: 12px"
        @click="last"
      >
        上一步
      </el-button>
      <el-button
        :disabled="active === 4"
        type="primary"
        style="margin-top: 12px; margin-bottom: 12px"
        @click="next"
      >
        下一步
      </el-button>
      <div ref="modelContainer" class="modelContainer">
        <div v-show="active === 1" class="step1">
          <Model3E ref="model" @change="handleModel" />
        </div>
        <div v-show="active === 2" class="step2">
          <Datafields ref="datafields" />
        </div>
        <div v-show="active === 3" class="step3">
          <Mapper
            ref="mapper"
            :model-list="selectedModel"
            :data-list="selectedData"
          />
        </div>
        <div v-show="active === 4" class="step4">
          <ShowResult ref="showresult" :height="height" :width="width" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import clip from '@/utils/clipboard'
  import Model3E from './components/model'
  import Datafields from './components/datafields'
  import Mapper from './components/mapper'
  import ShowResult from './components/showresult'

  export default {
    name: 'ModelAnalysis',
    components: { Model3E, Datafields, Mapper, ShowResult },
    data() {
      return {
        height: '400px',
        width: '800px',
        active: 1,
        list: null,
        currentRow: null,
        listLoading: true,
        total: 0,
        triggerNextTimes: '',
        selectedModel: {
          pk: '',
          variable: [],
        },
        selectedData: [],
        selectedDataAndModel: {},
      }
    },
    watch: {
      selectedDataAndModel(newVal, oldVal) {
        console.log(newVal, 'selectedDataAndModel Change!', oldVal)
      },
    },
    created() {},
    mounted() {
      this.width = Math.ceil(this.$refs.modelContainer.offsetWidth / 2) + 'px'
      console.log(this.width)
    },
    methods: {
      handleModel() {},
      next() {
        //   const fromColumnList = this.$refs.reader.getData().columns
        //   const toColumnsList = this.$refs.writer.getData().columns
        // const fromTableName = this.$refs.reader.getData().tableName
        if (this.active === 1) {
          const modeltmp = this.$refs.model.tmp
          if (modeltmp.pk === '') {
            this.$message({
              showClose: true,
              message: '请先选择模型',
              type: 'error',
            })
          } else {
            this.selectedModel = {
              pk: modeltmp.pk,
              coefficient: modeltmp.coefficient,
              variable: modeltmp.variable.map((v) => {
                var obj = {}
                obj['key'] = v
                obj['val'] = null
                return obj
              }),
            }
            this.active++
          }
        } else {
          if (this.active === 2) {
            this.$refs.datafields.fetchSeletion()
            const datatmp = this.$refs.datafields.selectedData
            this.selectedData = []
            Object.keys(datatmp).forEach((k) => {
              this.selectedData.push(datatmp[k])
            })
          }
          if (this.active === 4) {
          } else {
            if (this.selectedData.length === 0) {
              this.$message({
                showClose: true,
                message: '请先选择您需要使用的数据文件，勾选表示选中。',
                type: 'error',
              })
            } else {
              if (this.active === 3) {
                // 进行分析
                this.$refs.mapper.fetchMapper()
                this.selectedDataAndModel = this.$refs.mapper.dataAndModel
                this.$refs.showresult.run(this.selectedDataAndModel)
              }
              this.active++
            }
          }
        }
      },
      last() {
        if (this.active > 1) {
          this.active--
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .step4 {
    position: relative;
    width: 100%;
    /* height: calc(100vh - 84px); */
    height: 884px;
  }
</style>
