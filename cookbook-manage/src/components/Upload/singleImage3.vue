<template>
  <div class="upload-container">
    <el-upload
      :data="authInfo"
      :multiple="false"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :on-success="handleImageSuccess"
      class="image-uploader"
      drag
      action="//up.qiniup.com">
      <i class="el-icon-upload"/>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <div class="image-preview image-app-preview">
      <div v-show="imageUrl.length>1" class="image-preview-wrapper">
        <img :src="imageUrl">
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchQiNiuToken } from '@/api/common'

export default {
  name: 'SingleImageUpload3',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tempUrl: '',
      authInfo: { token: '', key: '' }
    }
  },
  computed: {
    imageUrl() {
      return this.value
    }
  },
  methods: {
    rmImage() {
      this.emitInput('')
    },
    emitInput(val) {
      this.$emit('input', val)
    },
    handleImageSuccess(res) {
      const qnUrl = 'http://p9sujruip.bkt.clouddn.com/' // 七牛储存空间域名
      this.emitInput(qnUrl + res.key)
    },
    beforeUpload(file) {
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.upload-container {
  width: 100%;
  position: relative;
  @include clearfix;
  .image-uploader {
    width: 35%;
    float: left;
  }
  .image-preview {
    width: 200px;
    height: 200px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 50px;
    .image-preview-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .image-preview-action {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, .5);
      transition: opacity .3s;
      cursor: pointer;
      line-height: 200px;
      .el-icon-delete {
        font-size: 36px;
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
  .image-app-preview {
    width: 320px;
    height: 180px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 50px;
    .app-fake-conver {
      height: 44px;
      position: absolute;
      width: 100%; // background: rgba(0, 0, 0, .1);
      text-align: center;
      line-height: 64px;
      color: #fff;
    }
  }
}
</style>
