<template>
  <el-dialog
    :loading="loading"
    title="数据展示"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <el-table :data="tableData" border highlight-current-row max-height="450">
      <!-- style="width: 100%; margin-top: 20px"> -->
      <el-table-column
        v-for="(item, index) of tableHeader"
        :key="index"
        :prop="item"
        :label="item"
      />
    </el-table>
  </el-dialog>
</template>
<script>
  import XLSX from 'xlsx'
  import { downloadFile } from '@/api/datamanage'
  export default {
    //   name: "ShowExcel",
    props: {
      dialogVisible: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        loading: false,
        tableData: [],
        tableHeader: [],
      }
    },

    mounted() {
      // this.fetchData()
    },
    methods: {
      fetchData(query) {
        this.loading = true
        downloadFile(query).then((response) => {
          const blob = new Blob([response.data], {
            type: 'application/vnd.ms-excel',
          })
          this.readerData(blob)
          this.loading = false
        })
      },
      generateData({ header, results }) {
        this.tableHeader = header
        this.tableData = results
      },
      readerData(rawFile) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            const data = e.target.result
            const workbook = XLSX.read(data, { type: 'array' })
            // const workbook = XLSX.read(data, { type: 'binary' })
            const firstSheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[firstSheetName]
            const header = this.getHeaderRow(worksheet)
            const results = XLSX.utils.sheet_to_json(worksheet)
            this.generateData({ header, results })
            resolve()
          }
          reader.readAsArrayBuffer(rawFile)
          // reader.readAsText(rawFile)
        })
      },
      getHeaderRow(sheet) {
        const headers = []
        const range = XLSX.utils.decode_range(sheet['!ref'])
        let C
        const R = range.s.r
        /* start in the first row */
        for (C = range.s.c; C <= range.e.c; ++C) {
          /* walk every column in the range */
          const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
          /* find the cell in the first row */
          let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
          if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
          headers.push(hdr)
        }
        return headers
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then((_) => {
            this.$emit('closeDialog', false)
          })
          .catch((_) => {})
      },
    },
  }
</script>
