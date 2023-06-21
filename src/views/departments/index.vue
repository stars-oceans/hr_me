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
                  操作
                  <i class="el-icon-arrow-down"></i>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <!-- 头部与下面的分割线 -->
      <hr>
      <!-- 列表， 下面为树形控件， 注意：只要有嵌套，基本都是递归 -->
      <el-tree style="margin :12px 0;" :data="treedata" :props="defaultProps" :default-expand-all="true">
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
                      <el-dropdown-item>添加子部门</el-dropdown-item>
                      <el-dropdown-item>编辑部门</el-dropdown-item>
                      <el-dropdown-item>删除部门</el-dropdown-item>
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

  </el-card>

  </div>
</template>

<script>
import { getDepartmentsList } from '@/api/departments'
export default {
  data() {
    return {
      organization: 'organization',
      treedata: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  mounted() {
    this.DepartmentsList()
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    async DepartmentsList() {
      const { data: res } = await getDepartmentsList()
      this.treedata = res.data.depts
    }
  }
}
</script>
 <style scoped>
.tree-card {
  margin-top: 20px;
  margin-left: 20px;
  width: 80vw;
  height: 70vh;
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