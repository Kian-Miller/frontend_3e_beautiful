<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="listData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="fields.filename" label="表名" width="220" />
      <el-table-column prop="fields.sheetname" label="SHEET" width="120" />
      <el-table-column label="字段" show-overflow-tooltip>
        <template slot-scope="scope">
          <!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
          <el-tag
            v-for="tag in scope.row.fields.headers"
            :key="tag"
            type="success"
            :disable-transitions="false"
          >
            {{ tag }}
          </el-tag>
          <div />
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button> -->
      <!-- <el-button @click="toggleSelection()">取消选择</el-button> -->
    </div>
  </div>
</template>

<script>
  import { fetchHeader } from '@/api/datamanage'
  export default {
    data() {
      return {
        listData: [],
        multipleSelection: [],
        selectedData: {},
      }
    },
    mounted() {
      this.fetchHeaderData()
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      fetchHeaderData() {
        fetchHeader().then((response) => {
          const tmp = response.list
          this.listData = tmp.map((obj) => {
            obj.fields.headers = obj.fields.header.split('_|_')
            return obj
          })
          // console.log(this.listData)
        })
      },
      fetchSeletion() {
        this.selectedData = {}
        for (let i = 0; i < this.multipleSelection.length; i++) {
          const d = this.multipleSelection[i]
          const pk = d.fields.filefrom
          const sheetname = d.fields.sheetname || '_csv_'
          const columns = d.fields.headers
          if (this.selectedData[pk] === undefined) {
            this.selectedData[pk] = {}
            //   字段对应的表的pk, filefrom
            this.selectedData[pk]['value'] = d.fields.filepath
            this.selectedData[pk]['label'] = d.fields.filename
            this.selectedData[pk]['children'] = []
          }
          if (this.selectedData[pk]) {
            var obj = {}
          }
          //   字段所在的表的pk
          //   obj['value'] = d.pk
          obj['value'] = sheetname
          obj['label'] = sheetname
          obj['children'] = columns.map((v) => {
            var c = {}
            c['value'] = v
            c['label'] = v
            return c
          })
          this.selectedData[pk]['children'].push(obj)
        }
      },
    },
  }
</script>
<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
</style>
