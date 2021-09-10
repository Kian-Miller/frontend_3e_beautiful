<template>
  <div class="app-container">
    <div>
      <el-row>
        <!-- <el-col :span="12"><div class=""><UploadFile /></div></el-col> -->
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-button
              :loading="downloadLoading"
              style="margin: 0 0 20px 20px"
              type="primary"
              icon="el-icon-download"
              @click="handleDownload"
            >
              导出
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading..."
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-model="multipleSelection"
        type="selection"
        width="55"
      />
      <el-table-column align="center" label="序号" width="90">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="标题" min-width="2">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input
              v-model="scope.row.fields.filename"
              class="edit-input"
              size="small"
            />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(scope.row)"
            >
              cancel
            </el-button>
          </template>
          <span v-else>{{ scope.row.fields.filename }}</span>
        </template>
        <!-- <template slot-scope="scope">
          {{ scope.row.fields.filename }}
        </template> -->
      </el-table-column>
      <el-table-column label="上传者" min-width="1" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.fields.uploader }}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column label="查阅次数" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="上传时间" width="250">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <!-- <span>{{ scope.row.fields.upload_date | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
          <span>{{ scope.row.fields.upload_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <!-- <el-tag>{{ scope.row.author }}</el-tag> -->
          <el-button
            v-if="scope.row.edit"
            type="success"
            size="mini"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(scope.row)"
          >
            确认
          </el-button>
          <el-button
            v-else
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="scope.row.edit = !scope.row.edit"
          >
            编辑
          </el-button>
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" >编辑</el-button > -->
          <el-button size="mini" @click="handleReader(scope.row)">
            查看
          </el-button>
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
    <div>
      <!-- <ShowExcel :dialogVisible.sync="dialogVisible"></ShowExcel> -->
      <show-excel
        ref="showexcel"
        v-loading="loading"
        :dialog-visible="dialogVisible"
        @closeDialog="closeDialog"
      />
    </div>
  </div>
</template>

<script>
  import { parseTime } from '@/utils'
  import {
    fetchList,
    updateFile,
    deleteFile,
    downloadFile,
  } from '@/api/datamanage'
  // options components
  import ShowExcel from './components/show-excel'
  export default {
    name: 'ShowFile',
    components: { ShowExcel },
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
          this.list = items.map((v) => {
            this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
            v.fields.originalfilename = v.fields.filename //  will be used when user click the cancel botton
            return v
          })
          this.listLoading = false
        })
      },
      handleReader(row) {
        const query = { pk: row.pk }
        this.dialogVisible = true
        this.$refs.showexcel.fetchData(query)
      },
      handleDownload() {
        for (var i = 0; i < this.multipleSelection.length; i++) {
          const query = { pk: this.multipleSelection[i].pk }
          downloadFile(query).then((response) => {
            // 取 filename=后面所有字符串,并将urlencoder转码为中文
            const filetype = response.headers['content-type']
            const filename = decodeURI(
              response.headers['content-disposition'].match(
                //   /filename\*=utf-8\'\'(.*)/
                /filename(\*)?=(utf-8)?[\',\"]{0,2}(.*)/
              )[3]
            )
            const blob = new Blob([response.data], {
              type: 'application/vnd.ms-excel',
              //   type: filetype
            })
            if (window.navigator.msSaveBlob) {
              // window.navigator.msSaveBlob(blob, ‘’+ '.' + ‘文件下载的格式’);//处理IE下载的兼容性
              window.navigator.msSaveBlob(blob, filename) // 处理IE下载的兼容性
            } else {
              const downloadElement = document.createElement('a')
              const href = window.URL.createObjectURL(blob) // 创建下载的链接
              downloadElement.href = href
              //   downloadElement.download =  ‘文件的名称’+ '.' + ‘文件下载的格式’ ; //下载后文件名
              downloadElement.download = filename // 下载后文件名
              document.body.appendChild(downloadElement)
              downloadElement.click() // 点击下载
              document.body.removeChild(downloadElement) // 下载完成移除元素
              window.URL.revokeObjectURL(href) // 释放掉blob对象
            }
          })
        }
      },

      formatJson(filterVal, jsonData) {
        return jsonData.map((v) =>
          filterVal.map((j) => {
            if (j === 'timestamp') {
              return parseTime(v[j])
            } else {
              return v[j]
            }
          })
        )
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
        deleteFile(row).then((response) => {
          this.list.splice(index, 1)
          this.$message({
            message: '文件已经成功删除',
            type: 'success',
          })
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      closeDialog(visible) {
        this.dialogVisible = visible
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
