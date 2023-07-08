<template>
  <div>
    <!-- 添加子部门的 弹出框 -->
    <el-dialog title="添加子部门" :visible="DialogVisible" @update:visible="val => $emit('update:DialogVisible',false)" width="30%" center>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="部门名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="form.introduce"></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-select v-model="form.manager" placeholder="请选择活动区域">
            <el-option v-for="item in optionsData" :key="item.id" :value="item.username"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门编码">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    DialogVisible: {
      type: Boolean
    },
    itemData: {
      type: Object,
      default : ()=> {}
    },
    optionsData : {
      type : Array,
      default : ()=> {[]}
    }
  },
  data() {
    return {
      // form 表单的信息
      form: {
        code: '',
        introduce: '',
        manager: '',
        name: '',
        pid: ''
      },

    }
  },
mounted (){
  console.log(this.optionsData);
},
  methods: {
    // 确定按钮
    confirm() {
      // 关闭弹窗
      this.$emit('update:DialogVisible', false)
      console.log(this.itemData.id);
      this.form.pid = this.itemData.id
      console.log('aaaaaaa');
      // 调用增加的方法
      this.$emit('addDepartmentEV', this.form)
    },
    // 取消按钮
    cancel() {
      console.log(this.form);
      // 清除form 表单的数据
      this.form = {
        code: '',
        introduce: '',
        manager: '',
        name: '',
        pid: ''
      },
      console.log(this.form);
      this.$emit('update:DialogVisible', false)
    },
  }
}
</script>

<style>

</style>