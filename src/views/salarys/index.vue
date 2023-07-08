<template>
  <div>
    <el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeAvatarUpload" 
    :http-request="upload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5' // 引入腾讯云的包
// 需要实例化
const cos = new COS({
  SecretId: 'AKIDkLqDWhITiyldMwOh4UnfTNLn8GOQJ4qW',
  SecretKey: 'c6Tn3AA8yUwxsaFqLqALOGySmGgCezHL'
}) // 实例化的包 已经具有了上传的能力 可以上传到该账号里面的存储桶了
export default {
  data() {
    return {
      imageUrl: ''
    };
  },
  mounted(){
    this.imageUrl = this.$store.state.user.avater
  },
  methods: {
    // 上传之前的处理
    beforeAvatarUpload(file) {
      this.imageUrl = URL.createObjectURL(file);
    },
        // 自定义上传动作 有个参数 有个file对象，是我们需要上传到腾讯云服务器的内容
    upload(obj) {

      console.log(obj);
        //  上传文件到腾讯云
        cos.putObject({
          // 配置
          Bucket: 'yhc-1253511478', // 存储桶名称
          Region: 'ap-nanjing', // 存储桶地域
          Key: obj.file.name, // 文件名作为key
          StorageClass: 'STANDARD', // 此类写死
          Body: obj.file, // 将本地的文件赋值给腾讯云配置
          // 进度条
          onProgress: (obj) => {
            this.percent = obj.percent * 100
          }
        }, (err, data) => {
          console.log(err || data);
          if (data) {
             this.imageUrl = `https://${data.Location}`
            //  保存到 vuex
             this.$store.commit('user/UPLOAD_AVATAR',this.imageUrl )
          }
        })
      }
  }
}



</script>
<style>
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>