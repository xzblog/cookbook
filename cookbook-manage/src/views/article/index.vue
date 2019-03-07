<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom: 20px">
      <el-input v-model="listQuery.title" placeholder="请输入文章标题" style="width: 260px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.author" placeholder="请选择作者" style="width: 180px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in authorOptions" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
      <el-select v-model="listQuery.type" placeholder="请选择类型" style="width: 180px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.label"/>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreateArticle">添加</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="#" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="封面图" width="140" align="center">
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
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="作者" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类" align="center">
        <template slot-scope="scope">
          {{ scope.row.type.join(',') }}
        </template>
      </el-table-column>
      <el-table-column label="是否热门" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.hot" type="success">是</el-tag>
          <el-tag v-else type="warning">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="浏览量" align="center">
        <template slot-scope="scope">
          {{ scope.row.lookNum }}
        </template>
      </el-table-column>
      <el-table-column label="收藏量" align="center">
        <template slot-scope="scope">
          {{ scope.row.likeNum }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | statusMeanFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="160">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="220" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdateArticle(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.status==='publish'" size="mini" type="danger" @click="handleDeleteArticle(scope.row)">删除</el-button>
          <el-button v-else size="mini" type="info" plain @click="handlePublish(scope.row)">发布</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination ::current-page="listQuery.page" :page-size="listQuery.size" :total="total" :page-sizes="[5, 10, 20, 30]" layout="total, sizes, prev, pager, next, jumper" background @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogArticle" width="60%">
      <el-form ref="articleForm" :model="formArticle">
        <div class="createPost-main-container">
          <el-row>
            <el-col :span="24">
              <el-form-item style="margin-bottom: 40px;" prop="title">
                <MDinput v-model="formArticle.title" :maxlength="100" name="name" required >
                  标题
                </MDinput>
              </el-form-item>

              <div class="postInfo-container">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label-width="90px" label="所用食材:" class="postInfo-container-item">
                      <el-select v-model="type.material" multiple placeholder="选择所用食材">
                        <el-option v-for="item in materialOptions" :key="item._id" :label="item.name" :value="item.name" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label-width="90px" label="所属菜系:" class="postInfo-container-item">
                      <el-select v-model="type.cuisine" multiple placeholder="选择所属菜系">
                        <el-option v-for="item in cuisineOptions" :key="item._id" :label="item.name" :value="item.name" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label-width="90px" label="烘焙类型:" class="postInfo-container-item">
                      <el-select v-model="type.bake" multiple placeholder="不是可不选">
                        <el-option v-for="item in bakeOptions" :key="item._id" :label="item.name" :value="item.name" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label-width="90px" label="选择场合:" class="postInfo-container-item">
                      <el-select v-model="type.occasion" multiple placeholder="选择适合场合">
                        <el-option v-for="item in occasionOptions" :key="item._id" :label="item.name" :value="item.name" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label-width="90px" label="选择节日:" class="postInfo-container-item">
                      <el-select v-model="type.festival" multiple placeholder="选择节日">
                        <el-option v-for="item in festivalOptions" :key="item._id" :label="item.name" :value="item.name" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label-width="90px" label="选择菜式:" class="postInfo-container-item">
                      <el-select v-model="type.style" multiple placeholder="选择菜式">
                        <el-option v-for="item in styleOptions" :key="item.value" :label="item.label" :value="item.label" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label-width="90px" label="是否推荐:" class="postInfo-container-item">
                      <el-select v-model="formArticle.hot" placeholder="是否推荐">
                        <el-option v-for="(item,index) in hotOptions" :key="index" :label="item.label" :value="item.name" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-form-item style="margin-bottom: 40px;" label-width="45px" label="摘要:">
            <el-input :rows="3" v-model="formArticle.describe" autosize type="textarea" placeholder="请输入内容" class="article-textarea" />
            <span v-show="describeLength" class="word-counter">{{ describeLength }}字</span>
          </el-form-item>
          <div style="margin-bottom: 20px;">
            <markdown-editor id="contentEditor" ref="contentEditor" v-model="formArticle.materials" :height="300" :z-index="20"/>
          </div>
          <div class="editor-container" >
            <Tinymce ref="editor" v-model="formArticle.content" :height="400" />
          </div>
          <div style="margin-bottom: 20px;">
            <Upload v-model="formArticle.cover" />
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogArticle = false">取 消</el-button>
        <el-button v-if="dialogStatus==='create'" type="primary" @click="sureCreateArticle">确定新增</el-button>
        <el-button v-else type="primary" @click="sureUpdateArticle">确定修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/singleImage3'
import MDinput from '@/components/MDinput'
import MarkdownEditor from '@/components/MarkdownEditor'
import { fetchArticleList, createArticle, updateArticle, deleteArticle } from '@/api/article'
import { fetchClassify } from '@/api/classify'
import { parseTime } from '@/utils'

export default {
  name: 'Article',
  components: { MDinput, Upload, Tinymce, MarkdownEditor },
  filters: {
    statusFilter(status) {
      const statusMap = {
        publish: 'success',
        draft: 'gray'
      }
      return statusMap[status]
    },
    statusMeanFilter(status) {
      const statusMap = {
        publish: '已发布',
        draft: '草稿'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      parseTime,
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 5,
        title: undefined,
        author: undefined,
        type: undefined
      },
      type: {
        material: undefined,
        cuisine: undefined,
        bake: undefined,
        occasion: undefined,
        festival: undefined,
        style: undefined
      },
      total: 0,
      authorOptions: [],
      hotOptions: [
        { label: '是', name: true },
        { label: '否', name: false }
      ],
      typeOptions: [],
      materialOptions: [], // 食材Options
      cuisineOptions: [], // 菜系Options
      bakeOptions: [], // 烘培Options
      occasionOptions: [], // 场合Options
      festivalOptions: [], // 节日Options
      styleOptions: [], // 菜式Options
      formArticle: {
        title: '',
        cover: '',
        status: '',
        type: [],
        hot: false,
        describe: '',
        materials: '',
        content: ''
      },
      titleMap: {
        update: '编辑文章',
        create: '添加文章'
      },
      dialogStatus: 'create',
      dialogArticle: false
    }
  },
  computed: {
    describeLength() {
      return this.formArticle.describe.length
    }
  },
  created() {
    this.getArticleList()
    this.getClassify()
  },
  methods: {
    // 获取分类
    getClassify() {
      fetchClassify().then(res => {
        const classifyList = res.data
        if (classifyList.length > 0) {
          this.typeOptions = classifyList.map(item => {
            const obj = {}
            obj.label = item.name
            obj.value = item._id
            return obj
          })
          this.materialOptions = classifyList.filter(item => {
            if (item.type === 'material') {
              return item
            }
          })
          this.cuisineOptions = classifyList.filter(item => {
            if (item.type === 'cuisine') {
              return item
            }
          })
          this.bakeOptions = classifyList.filter(item => {
            if (item.type === 'back') {
              return item
            }
          })
          this.occasionOptions = classifyList.filter(item => {
            if (item.type === 'occasion') {
              return item
            }
          })
          this.festivalOptions = classifyList.filter(item => {
            if (item.type === 'festival') {
              return item
            }
          })
          this.styleOptions = classifyList.filter(item => {
            if (item.type === 'style') {
              return item
            }
          })
        }
      })
    },
    // 获取文章列表
    getArticleList() {
      this.listLoading = true
      fetchArticleList(this.listQuery).then(res => {
        this.list = res.data.content
        this.total = res.data.total
        this.listLoading = false
      })
    },

    // 筛选
    handleFilter() {
      this.listQuery.page = 1
      this.getArticleList()
    },

    // 改变页数
    handleSizeChange(val) {
      this.listQuery.size = val
      this.getArticleList()
    },

    // 跳转至多少页
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getArticleList()
    },

    // 点击添加文章按钮
    handleCreateArticle() {
      this.formArticle = {
        title: '',
        cover: '',
        status: '',
        type: [],
        hot: false,
        describe: '',
        materials: '',
        content: ''
      }
      this.dialogArticle = true
      this.dialogStatus = 'create'
      this.$nextTick(() => {
        this.$refs['articleForm'].clearValidate()
      })
    },

    // 确定添加文章
    sureCreateArticle() {
      this.formArticle.type = [...this.type.material, ...this.type.festival, ...this.type.bake, ...this.type.cuisine, ...this.type.occasion, ...this.type.style]
      this.$refs['articleForm'].validate((valid) => {
        if (valid) {
          this.formArticle.status = 'publish'
          createArticle(this.formArticle).then((res) => {
            this.list.unshift(res.data)
            this.dialogArticle = false
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

    // 点击更新文章按钮
    handleUpdateArticle(row) {
      this.formArticle = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogArticle = true
      this.$nextTick(() => {
        this.$refs['articleForm'].clearValidate()
      })
    },

    // 确认更新文章
    sureUpdateArticle() {
      this.$refs['articleForm'].validate((valid) => {
        if (valid) {
          updateArticle(this.formArticle._id, this.formArticle).then((res) => {
            for (const v of this.list) {
              if (v._id === this.formArticle._id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, res.data)
                break
              }
            }
            this.dialogArticle = false
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
    handleDeleteArticle(row) {
      this.$confirm('将会彻底删除本条数据，无法恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(row._id).then(() => {
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

    // 发布文章
    handlePublish() {

    }
  }
}
</script>
<style scoped lang="scss">
  .el-pagination{
    margin-top: 20px;
  }
  .createPost-main-container {
    .postInfo-container {
      position: relative;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
    .editor-container {
      min-height: 500px;
      margin: 0 0 30px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
  }
  .word-counter {
    width: 40px;
    text-align: center;
    position: absolute;
    right: 0;
    top: -30px;
  }

</style>
