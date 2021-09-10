<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading..."
      border
      fit
      highlight-current-row
    >
      <!-- <el-table-column v-model="multipleSelection" type="selection" width="55" /> -->
      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="公式名称" min-width="2">
        <template slot-scope="scope">
          {{ scope.row.fields.name }}
        </template>
      </el-table-column>
      <el-table-column label="公式" min-width="3" align="center">
        <template slot-scope="scope">
          <vue-mathjax :formula="scope.row.fields.expression" />
          <!-- <el-tag>{{ scope.row.fields.expression}}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column align="center" label="描述" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.fields.desc }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.fields.remake }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row, scope.$index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { fetchList, deleteModel } from '@/api/modelmanage'
  import { VueMathjax } from 'vue-mathjax'
  // options components
  export default {
    name: 'ListModel',
    components: {
      'vue-mathjax': VueMathjax,
    },
    data() {
      return {
        list: null,
        listLoading: true,
        downloadLoading: false,
        filename: '',
        autoWidth: true,
        bookType: 'xlsx',
        multipleSelection: [],
        dialogVisible: false,
        loading: true,
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        fetchList().then((response) => {
          const items = response.list
          this.list = items
          // this.list = items.map((v) => {
          //   this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          //   v.fields.originalfilename = v.fields.filename //  will be used when user click the cancel botton
          //   return v
          // })
          this.listLoading = false
        })
      },

      cancelEdit(row) {
        row.fields.filename = row.fields.originalfilename
        row.edit = false
        this.$message({
          message: 'The title has been restored to the original value',
          type: 'warning',
        })
      },
      confirmEdit(row) {
        row.edit = false
        row.fields.originalfilename = row.fields.filename
        const tmp = {
          pk: row.pk,
          filename: row.fields.filename,
        }
        updateFile(tmp).then((response) => {
          this.$message({
            message: 'The title has been edited',
            type: 'success',
          })
        })
      },
      handleDelete(row, index) {
        deleteModel(row).then((response) => {
          this.list.splice(index, 1)
          this.$message({
            message: '模型已经成功删除',
            type: 'success',
          })
        })
      },
    },
  }
</script>

<style>
  .radio-label {
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 30px;
  }
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
