<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="">公式名:</div>
      </el-col>
      <el-col :span="20">
        <div class="">
          <el-input
            v-model="nameFormula"
            type="textarea"
            :autosize="{ minRows: 1, maxRows: 2 }"
            placeholder="请输入公式名称"
          />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="">公式:</div>
      </el-col>
      <el-col :span="20">
        <div class="">
          <el-input
            v-model="formula"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入公式内容，支持Latex语法。以$$开始，以$$结束。如：$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$"
          />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="">格式化公式:</div>
      </el-col>
      <el-col :span="20">
        <div class="">
          <vue-mathjax :formula="formula" />
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
            v-model="desc"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入公式描述"
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
            v-model="remake"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入公式备注，以空格作为分隔符，分隔类别。如：类别1 类别2 类别3 ..."
          />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div>系数区</div>
        <div>
          <el-table :data="coefficientData" style="width: 100%">
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
            v-for="tag in dynamicTags"
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
        <div
          style="position: absolute; top: 30%; left: 50%; margin: 5% 0 0 35%"
        >
          <el-button type="success" @click="create">创建</el-button>
          <el-button type="danger" @click="clean">清除</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- <el-row>
                <el-button
          type="primary"
          style="position: absolute; top: 20%; left: 50%; margin: 3% 0 0 -35%"
          @click="dialogVisible = true" >新增</el-button >
    </el-row> -->
    <el-row>
      <el-col :span="6" :offset="20" />
    </el-row>
    <div>
      <el-dialog
        title="新增系数"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="diaHandleClose"
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
  import { VueMathjax } from 'vue-mathjax'
  import { createModel } from '@/api/modelmanage'
  export default {
    name: 'HelloWorld',
    components: {
      'vue-mathjax': VueMathjax,
    },
    data() {
      return {
        nameFormula: '',
        formula: '',
        desc: '',
        remake: '',
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        coefficientData: [],
        dialogVisible: false,
        coefficient: {
          originKey: '',
          originValue: '',
          key: '',
          value: '',
          edit: false,
        },
      }
    },
    methods: {
      handleNewCoe() {
        this.dialogVisible = false
        this.coefficient.originKey = this.coefficient.key
        this.coefficient.originValue = this.coefficient.value
        const tmp = JSON.parse(JSON.stringify(this.coefficient))
        this.coefficientData.push(tmp)
        this.coefficient = {
          originKey: '',
          originValue: '',
          key: '',
          value: '',
          edit: false,
        }
      },
      diaHandleClose(done) {
        this.$confirm('确认关闭？,内容将不会被保存!')
          .then((_) => {
            //   const tmp = this.coefficient
            //   this.coefficientData.push(tmp)
          })
          .catch((_) => {})
      },

      create() {
        const tmp = {
          name: this.nameFormula,
          expression: this.formula,
          desc: this.desc,
          remake: this.remake,
          coefficient: JSON.stringify(this.coefficientData),
          variable: this.dynamicTags.toString() || '[]',
        }
        //   console.log(tmp)
        createModel(tmp).then((response) => {
          // console.log(response)
          this.$message({
            message: '数学模型创建成功',
            type: 'success',
          })
        })
      },
      clean() {
        this.nameFormula = ''
        this.formula = ''
        this.desc = ''
        this.remark = ''
        this.coefficientData = []
        this.dynamicTags = []
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
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
          this.dynamicTags.push(inputValue)
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
      confirmEdit(row, origin, name) {
        row.edit = false
        row.originValue = row.value
        this.$message({
          message: 'The value has been edited',
          type: 'success',
        })
      },
      handleDelete(index) {
        this.coefficientData.splice(index, 1)
        this.$message({
          message: '系数已经成功删除',
          type: 'success',
        })
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
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
