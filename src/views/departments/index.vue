<template>
  <el-card class="tree-card">
    <el-tabs v-model="organization">
      <el-tab-pane label="组织架构" name="organization"></el-tab-pane>
    </el-tabs>
    <div class="text item">
      <!-- 头部 -->
      <el-row>
        <el-col :span="20">
          <div class="grid-content">
            <h3> <i class="el-icon-setting"></i> 人资管理系统</h3>
          </div>
        </el-col>
        <el-col :span="4" style="line-height: 50px;">
          <div class="grid-content">
            <el-row>
              <el-col :span="12">
                <div class="grid-content">
                  负责人
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content">
                  <!-- 下拉菜单 element -->
                  <el-dropdown>
                    <span>
                      操作<i class="el-icon-arrow-down" />
                    </span>
                    <!-- 下拉菜单 -->
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="add()">添加子部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>

                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <!-- 头部与下面的分割线 -->
      <hr>
      <!-- 列表， 下面为树形控件， 注意：只要有嵌套，基本都是递归 -->
      <el-tree style="margin :12px 0;" :data="treedata" :default-expand-all="true">
        <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
        <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
        <template #default="{ data }">
          <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%">
            <el-col>
              <!-- 左侧内容 -->
              <span>{{ data.name }}</span>
            </el-col>
            <!-- 右侧 -->
            <el-col :span="4">
              <el-row type="flex" justify="end">
                <el-col>{{ data.manager }}</el-col>
                <el-col>
                  <!-- 放置下拉菜单 -->
                  <el-dropdown>
                    <!-- 内容 -->
                    <span>操作
                      <i class="el-icon-arrow-down" />
                    </span>
                    <!-- 具名插槽 -->
                    <el-dropdown-menu slot="dropdown">
                      <!-- 下拉选项 -->
                      <el-dropdown-item @click.native="add(data)">添加子部门</el-dropdown-item>
                      <el-dropdown-item @click.native="edit(data)">编辑部门</el-dropdown-item>
                      <el-dropdown-item v-if="!data.children" @click.native="del(data)">删除部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
              <!-- 右侧内容 -->
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <Dialog ref="Dialog" :DialogVisible.sync="DialogVisible" :itemData="itemData" :optionsData="option" @addDepartmentEV="addDepartmentFun"></Dialog>
  </el-card>
  </div>
</template>

<script>
import {
  getDepartmentsList, getEmployeeSimple, addDepartmentItem,
  getDepartdetails, updateDepardetails, deleteDepardetails
} from '@/api/departments'
// 导入处理扁平化数组为树形结构的方法
import { tranListToTreeData } from '@/utils'
import Dialog from './components/Dialog.vue'
import { Message } from 'element-ui';
export default {
  components: { Dialog },
  data() {
    return {
      // 子弹出框的状态
      DialogVisible: false,
      organization: 'organization',
      // 架构数据
      treedata: [],
      itemData: {
        pid :''
      },
      // 部门的数据
      option: [],
      // 判断是否为 编辑状态
      /**
       * @param {*} isEdit  true为编辑状态, false 为添加状态 
       */
      isEdit: false
    };
  },

  mounted() {
    // 调用数据列表的数据
    this.DepartmentsList()
    // 调用获取负责人的接口
    this.getiblePerson()
  },
  methods: {
    // 请求列表数据的方法
    async DepartmentsList() {
      const { data: res } = await getDepartmentsList()
      // 转换数据形状
      this.treedata = tranListToTreeData(res.data.depts, '')
    },
    // 添加子部门的方法
    add(value) {
      this.isEdit = false
      // 改变 否 编辑状态
      if (value == undefined) {
        console.log('111');
        this.itemData.pid = " "
        console.log(this.itemData.pid);

        this.DialogVisible = true
      } else {
        this.itemData = value
        this.DialogVisible = true
      }
    },
    // 新编按钮的 事件函数
    async edit(value) {
      // 改变 为 编辑状态
      this.isEdit = true

      const { data: res } = await getDepartdetails(value.id)

      // TODO: 通过 ref 拿到 子组件身上的 this 也就是所有的 值
      this.$refs.Dialog.form = res.data
      // 改变 警告框的 状态
      this.itemData = value
      this.DialogVisible = true
    },
    // 获取负责人数据的方法
    async getiblePerson() {
      const { data: res } = await getEmployeeSimple()
      // 数组对象去重的方法  
      let newArrData = Array.from(
        new Map(res.data.map(obj => [obj.username, obj])).values()
      );
      // 去重之后的数据，然后赋值
      this.option = newArrData
    },
    // 增加 | 修改 数据的方法
    async addDepartmentFun(value) {
      if (this.isEdit) {
        // 修改的方法
        const res = await updateDepardetails(this.itemData.id, value)
             // 重新加载整页数据 调用数据列表的数据
        Message.success('修改成功! 不过接口好像有点问题！！！');
        console.log(res);
            // 调用上方获取列表的方法
      this.DepartmentsList()
      } else {
        // 增加接口方法
        await addDepartmentItem(value)
        // 重新加载整页数据 调用数据列表的数据
        Message.success('新增成功！');
        // 调用上面的方法
      }
  
    },
    // 删除的方法
    async del(value) {
      await deleteDepardetails(value.id)
      // 重新请求
      this.DepartmentsList()
      Message.success('删除成功!');
    },
  },

}
</script>
 <style scoped>
.tree-card {
  margin-top: 20px;
  margin-left: 20px;
  width: 80vw;
  height: 90vh;
  font-size: 14px;
}
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    height: 60vh;
    width: 70vw;
    margin: 0 auto;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }


</style>