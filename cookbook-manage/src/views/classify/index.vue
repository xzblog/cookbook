<template>
  <div class="app-container">
    <el-button type="primary" size="small" @click="handleCreateClassify">添加分类</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      class="typeTable">
      <el-table-column type="index" align="center" label="编号" width="60" />
      <el-table-column label="封面图" width="180" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="right-end"
            width="200"
            trigger="hover">
            <img :src="scope.row.cover" :alt="scope.row.title" style="width: 175px;">
            <span slot="reference"><img :src="scope.row.cover" :alt="scope.row.title" style="width: 60px;"></span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="name" align="center" label="分类名称" />
      <el-table-column align="center" label="是否推荐">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.recommend" type="success">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否热门">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.hot" type="success">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type | typeFilter(typeOptions) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleUpdateClassify(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDeleteClassify(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination ::current-page="listQuery.page" :page-size="listQuery.size" :total="total" :page-sizes="[5, 10, 20, 30]" layout="total, sizes, prev, pager, next, jumper" background class="app-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" />

    <!-- 添加分类 -->
    <el-dialog :visible.sync="dialogFormVisible" :title="dialogStatus==='create'?'添加分类': '修改分类'">
      <el-form ref="dataForm" :model="form" :inline="true" :rules="rules">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name" placeholder="请填写分类名称"/>
        </el-form-item>
        <el-form-item label="所属类型" prop="type">
          <el-select v-model="form.type" placeholder="选择类型">
            <el-option v-for="item of typeOptions" :key="item.value" :value="item.value" :label="item.label"/>
          </el-select>
        </el-form-item>
        <el-form-item label="是否热门" prop="hot">
          <el-select v-model="form.hot" placeholder="是否热门分类">
            <el-option :value="true" label="是"/>
            <el-option :value="false" label="否"/>
          </el-select>
        </el-form-item>
        <el-form-item label="是否推荐" prop="recommend">
          <el-select v-model="form.recommend" placeholder="是否推荐分类">
            <el-option :value="true" label="是"/>
            <el-option :value="false" label="否"/>
          </el-select>
        </el-form-item>
        <el-form-item label="封面图" prop="cover">
          <el-upload
            :data="authInfo"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            action="//up.qiniup.com"
            class="avatar-uploader">
            <img v-if="form.cover" :src="form.cover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus==='create'" type="primary" @click="sureCreateClassify">确 定</el-button>
        <el-button v-else type="primary" @click="sureUpdateClassify">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchClassify, createClassify, updateClassify, deleteClassify } from '@/api/classify'
import { fetchQiNiuToken } from '@/api/common'
export default {
  filters: {
    typeFilter(type, typeOptions) {
      let result = '未知'
      typeOptions.forEach(item => {
        if (item.value === type) {
          result = item.label
        }
      })
      return result
    }
  },
  data() {
    return {
      list: [],
      listLoading: false,
      listQuery: {
        page: 1,
        size: 5
      },
      total: 0,
      typeOptions: [
        { label: '食材', value: 'material' },
        { label: '菜系', value: 'cuisine' },
        { label: '烘培', value: 'bake' },
        { label: '场合', value: 'occasion' },
        { label: '节日', value: 'festival' },
        { label: '菜式', value: 'style' }
      ],
      authInfo: {},
      dialogFormVisible: false,
      dialogStatus: 'create',
      form: {
        name: '',
        cover: '',
        recommend: false,
        hot: false,
        type: '' // 类型， 1. material: 食材，2. cuisine: 菜系， 3. bake: 烘培， 4. occasion: 场合， 5. festival: 节日 6. style: 菜式
      },
      rules: {
        name: [{ required: true, message: '分类名称必填', trigger: 'blur' }],
        type: [{ required: true, message: '类型必选', trigger: 'blur' }],
        cover: [{ required: true, message: '封面图必选', trigger: 'blur' }],
        hot: [{ required: true, message: '是否热门必选', trigger: 'blur' }],
        recommend: [{ required: true, message: '是否推荐必选', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getClassify()
  },
  methods: {
    // 获取分类
    getClassify() {
      this.listLoading = true
      fetchClassify(this.listQuery).then(response => {
        this.list = response.data.content
        this.total = response.data.total
        this.listLoading = false
      })
    },

    // 点击添加分类按钮
    handleCreateClassify() {
      this.dialogFormVisible = true
      this.form = {
        name: '',
        cover: '',
        recommend: false,
        hot: false,
        type: ''
      }
      this.dialogStatus = 'create'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    // 确认新增
    sureCreateClassify() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createClassify(this.form).then((res) => {
            this.list.unshift(res.data)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },

    // 点击编辑
    handleUpdateClassify(row) {
      this.form = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    // 确认编辑
    sureUpdateClassify() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateClassify(this.form._id, this.form).then((res) => {
            for (const v of this.list) {
              if (v._id === res.data._id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, res.data)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },

    // 删除文章
    handleDeleteClassify(row) {
      this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteClassify(row._id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    handleAvatarSuccess(res, file) {
      // URL.createObjectURL(file.raw)
      const qnUrl = 'http://p9sujruip.bkt.clouddn.com/' // 七牛储存空间域名
      this.form.cover = qnUrl + res.key
    },

    beforeAvatarUpload(file) {
      const isImg = /^image\//.test(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isImg) {
        this.$message.error('上传头像图片必须是图片格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return false
      }
      const key = Math.random().toString(16).substr(2) + file.name // 生成一个唯一的名字，避免图片名字重复
      return new Promise((resolve, reject) => {
        fetchQiNiuToken().then(res => {
          this.authInfo = {
            token: res.data,
            key: key
          }
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },

    // 改变页数
    handleSizeChange(val) {
      this.listQuery.size = val
      this.getClassify()
    },

    // 跳转至多少页
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getClassify()
    }
  }
}
</script>

<style>
.app-pagination{
  margin-top:10px;
  text-align: center;
}
.typeTable{
  margin-top: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 160px;
  height: 160px;
  line-height: 160px;
  text-align: center;
}
.avatar {
  width: 160px;
  height: 160px;
  display: block;
}
</style>
