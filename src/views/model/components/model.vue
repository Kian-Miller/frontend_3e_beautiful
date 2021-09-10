<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class>
          模型名:
          <el-select
            v-model="selectModelIndex"
            clearable
            filterable
            placeholder="请选择"
            @clear="cleartmp"
            @change="changeIndex"
          >
            <el-option
              v-for="(item, index) in list"
              :key="item.pk"
              :label="item.fields.name"
              :value="index"
            />
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="">公式:</div>
      </el-col>
      <el-col :span="20">
        <div class="">
          <vue-mathjax :formula="tmp.fields.expression" />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="">公式描述:</div>
      </el-col>
      <el-col :span="20">
        <div class="">
          <el-input
            v-model="tmp.fields.desc"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
          />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="">公式备注:</div>
      </el-col>
      <el-col :span="20">
        <div class="">
          <el-input
            v-model="tmp.fields.remake"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
          />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div>系数区</div>
        <div>
          <el-table :data="tmp.coefficient" style="width: 100%">
            <el-table-column prop="key" label="名称" width="180" />
            <el-table-column prop="value" label="预定义值">
              <template slot-scope="scope">
                <template v-if="scope.row.edit">
                  <el-input
                    v-model="scope.row.value"
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
                <span v-else>{{ scope.row.value }}</span>
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
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <p class="newline" @click="dialogVisible = true">增加一行</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="margin-bottom: 20px">变量区</div>
        <div>
          <el-tag
            v-for="tag in tmp.variable"
            :key="tag"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            v-if="inputVisible"
            ref="saveTagInput"
            v-model="inputValue"
            class="input-new-tag"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
          >
            + 新变量
          </el-button>
        </div>
      </el-col>
    </el-row>
    <div>
      <el-dialog
        title="新增系数"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="diahandleClose"
      >
        <div>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="">参数名称：</div>
            </el-col>
            <el-col :span="18">
              <div class="">
                <el-input
                  v-model="coefficient.key"
                  placeholder="请输入参数名称"
                />
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="">预定义系数值：</div>
            </el-col>
            <el-col :span="18">
              <div class="">
                <el-input
                  v-model="coefficient.value"
                  placeholder="请输入参数预定义值"
                />
              </div>
            </el-col>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleNewCoe">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { fetchList } from '@/api/modelmanage'
  import { VueMathjax } from 'vue-mathjax'
  export default {
    name: 'ModelSelect',
    components: {
      'vue-mathjax': VueMathjax,
    },
    data() {
      return {
        list: [],
        inputVisible: false,
        inputValue: '',
        dialogVisible: false,
        coefficient: {
          originKey: '',
          originValue: '',
          key: '',
          value: '',
          edit: false,
        },
        selectModelIndex: '',
        tmp: {
          pk: '',
          model: '',
          variable: [],
          coefficient: [],
          fields: {
            coefficient: '',
            desc: '',
            examples: '',
            name: '',
            remake: '',
            variable: '',
          },
        },
      }
    },
    mounted() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        fetchList().then((response) => {
          const items = response.list
          this.list = items
          console.log(this.list)
        })
      },
      cleartmp() {
        Object.keys(this.tmp).forEach((key) => {
          if (this.tmp.hasOwnProperty(key)) {
            this.tmp[key] = null
          }
        })
      },
      changeIndex(index) {
        this.cleartmp()
        this.tmp = JSON.parse(JSON.stringify(this.list[index]))
        this.tmp.coefficient = JSON.parse(this.tmp.fields.coefficient)
        this.tmp.variable = this.tmp.fields.variable.split(',')
      },
      handleNewCoe() {
        this.dialogVisible = false
        this.coefficient.originKey = this.coefficient.key
        this.coefficient.originValue = this.coefficient.value
        const tmp = JSON.parse(JSON.stringify(this.coefficient))
        this.tmp.coefficient.push(tmp)
        this.coefficient = {
          originKey: '',
          originValue: '',
          key: '',
          value: '',
          edit: false,
        }
        console.log(this.tmp)
      },
      diahandleClose(done) {
        this.$confirm('确认关闭？,数据将不会被保存！')
          .then((_) => {
            //   const tmp = this.coefficient
            //   this.coefficientData.push(tmp)
          })
          .catch((_) => {})
      },
      handleClose(tag) {
        this.tmp.variable.splice(this.tmp.variable.indexOf(tag), 1)
      },
      showInput() {
        this.inputVisible = true
        this.$nextTick((_) => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      handleInputConfirm() {
        const inputValue = this.inputValue
        if (inputValue) {
          this.tmp.variable.push(inputValue)
        }
        this.inputVisible = false
        this.inputValue = ''
      },
      cancelEdit(row) {
        row.value = row.originValue
        row.edit = false
        this.$message({
          message: 'The coefficient has been restored to the original value',
          type: 'warning',
        })
      },
      confirmEdit(row) {
        row.edit = false
        row.originValue = row.value
        this.$message({
          message: 'The value has been edited',
          type: 'success',
        })
      },
      handleDelete(index) {
        this.tmp.coefficient.splice(index, 1)
        this.$message({
          message: '系数已经成功删除',
          type: 'success',
        })
      },
      getSelection() {
        console.log(this.tmp)
        console.log(this.tmp)
        console.log(this.tmp)
      },
    },
  }
</script>
<style scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .newline {
    font-size: 14px;
    margin-top: 8px;
    text-align: center;
    border: 1px dashed #e8eaec;
    cursor: pointer;
    line-height: 32px;
    color: #2d8cf0;
    transition: border-color 1s;
    &:hover {
      border-color: #2d8cf0;
    }
  }
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
