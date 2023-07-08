<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部 header -->
      <page-tools :show-before="true">
        <span slot="before">共166条记录</span>
        <template #after>
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary" @click="addEmp">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="list">
          <el-table-column label="序号" sortable="" prop="workNumber" />
          <!-- TODO: 重点：：： -->
          <el-table-column label="头像" sortable="">
            <template #default="{ row }">
              <img class="tou" :src="row.staffPhoto" alt="">
            </template>
          </el-table-column>
          
          <el-table-column label="姓名" sortable="" prop="username"/>
          <el-table-column label="工号" sortable="" prop="mobile" />
          <el-table-column label="聘用形式" sortable=""  prop="departmentName"/>
          <el-table-column label="部门" sortable="" prop="departmentName"/>
          <el-table-column label="入职时间" sortable="" prop="correctionTime" />
          <el-table-column label="账户状态" sortable="" prop="timeOfEntry" />
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template #default="scope">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5, 10, 20, 50]" :page-size="5" layout="sizes, prev, pager, next" :total="1000">
            </el-pagination>
          </div>
        </el-row>
      </el-card>
    <!-- 弹窗 -->
    <EmpForm :showDialog.sync="isDialog"></EmpForm>
    </div>
  </div>
</template>

<script>
import { getEmployeeList } from '@/api/employees'
import EmpForm from './components/EmpForm.vue'
export default {
  components : {EmpForm},
  data() {
    return {
      loading: false,
      list: [], // 接数据的
      page: {
        page: 1, // 当前页码
        size: 5,
        total: 0 // 总数
      },
      // 弹窗显示框的属性。
      isDialog : false
    }
  },
  created() {
    // 初次加载时调用获取的方法
    this.getEmployeeList()
  },
  methods: {
    // 获取列表数据的方法
    async getEmployeeList() {
      this.loading = true
      const { data: res } = await getEmployeeList(this.page)
      this.page.total = res.data.total
      this.list = res.data.rows
      this.loading = false
      console.log(this.list);
    },

    // 分页器 每页的
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.size = val
      this.getEmployeeList()
    },
    // 分页器 当前页的
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.page = val
      this.getEmployeeList()
    },
    // 新增员工的按钮回调
    addEmp(){
      this.isDialog = true // 显示对应弹窗。
    }
  }
}
</script>

<style scoped>
  .tou{
    display: inline-block;
    width: 100px;
    height: 100px;
  }
</style>