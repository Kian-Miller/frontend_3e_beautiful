<template>
  <el-table :data="modelList.variable" stripe style="width: 100%">
    <el-table-column prop="key" align="center" label="变量" width="180" />
    <el-table-column label="字段" min-width="2">
      <template slot-scope="scope">
        <el-cascader
          v-model="scope.row.val"
          style="width: 80%"
          :options="dataList"
          filterable
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: {
      modelList: {
        type: Object,
        default: () => {
          return {
            variable: [],
          }
        },
      },
      dataList: {
        type: Array,
        default: () => {
          return []
        },
      },
    },
    data() {
      return {
        dataAndModel: {},
      }
    },
    methods: {
      fetchMapper() {
        this.dataAndModel = this.modelList
      },
    },
  }
</script>
