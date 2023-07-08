<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button icon="el-icon-plus" size="small" type="primary" @click="addRole">新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table border="" :data="list">
              <el-table-column align="center" type="index" label=" " width="120" />
              <el-table-column align="center" prop="name" label="名称" width="240" />
              <el-table-column align="center" prop="description" label="描述" />
              <el-table-column align="center" label="操作">

                <template #defalut="scope">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="emitRole(scope.row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRole(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <el-pagination :current-page="page.page" :page-size="page.pagesize" :total="page.total" layout="prev, pager, next" @current-change="changePage" />
              </el-pagination>
            </el-row>
          </el-tab-pane>
          <!--  right 的栏 -->
          <el-tab-pane label="公司信息">
            <el-alert title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改" type="info" show-icon :closable="false" />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input disabled style="width:400px" v-model="formData.name" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input disabled style="width:400px" v-model="formData.companyAddress" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- 新增角色 -->
      <el-dialog :title="isEmit == true? '修改' :'增加' " :visible="showDialog" @close="btnCancel">
        <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name" />
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="roleForm.description" />
          </el-form-item>
        </el-form>
        <!-- 底部 -->
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="btnCancel">取消</el-button>
            <el-button size="small" type="primary" @click="btnOK">确定</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, addRole, getRoleDetail, updateRole, deleteRole } from '@/api/setting'
import { title } from '@/settings'
export default {
  data() {
    return {
      list: [], // 承接数组
      page: {
        // 放置页码及相关数据
        page: 1,
        pagesize: 10,
        total: 10 // 记录总数
      },
      formData: {},
      showDialog: false,

      //新增按钮表单数据 
      roleForm: {
        name: '111',
        description: '222'
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
      },
      // 是否为修改
      isEmit: true
    }
  },
  created() {
    this.getRoleList() // 获取角色列表
    this.getCompanyInfoFn()  // 获取公司信息的列表
  },
  methods: {
    async getRoleList() {
      const { data: res } = await getRoleList(this.page)
      const { total, rows } = res.data
      this.page.total = total
      this.list = rows
    },

    // 公司详细信息
    async getCompanyInfoFn() {
      const companyId = this.$store.state.user.userinfo.companyId
      const { data: res } = await getCompanyInfo(companyId)
      // console.log(res.data);
      this.formData = res.data // 将公司信息存储到组件中展示使用。
    },
    changePage(newPage) {
      // newPage是当前点击的页码
      this.page.page = newPage // 将当前页码赋值给当前的最新页码
      this.getRoleList()
    },
    // 不知道
    btnCancel() {

    },
    // 新增角色的方法
    addRole() {
      this.showDialog = true
      // 不为修改
      this.isEmit = false
    },
    // 点击修改角色按钮的回调
    async emitRole(id) {
      this.isEmit = true
      // 展示框
      this.showDialog = true
      const { data: res } = await getRoleDetail(id)
      this.roleForm = res.data //赋值

    },
    // 删除角色的方法
    async delRole(id) {
      const res = await deleteRole(id)

      if (res) {
        this.getRoleList() // 获取角色列表
      }
    },
    // 确定按钮
    async btnOK() {
      if (this.isEmit) {
        // 修改角色的方法
        console.log(this.roleForm);
        this.showDialog = false
        // 修改角色信息的方法
        const res = await updateRole({
          id: this.roleForm.id,
          name: this.roleForm.name,
          description: this.roleForm.description,
          permIds: this.roleForm.permIds
        })
        // 等有数据就调用重新查询方法
        if (res) {
          this.getRoleList() // 获取角色列表
        }
      } else {
        // 增加
        this.$refs.roleForm.validate(async (valid) => {
          if (valid) {
            console.log(this.roleForm);
            const name = this.roleForm.name
            const description = this.roleForm.description
            // 增加角色的接口
            const res = await addRole({ name, description })
            if (res) {
              this.getRoleList() // 获取角色列表
            }
            this.showDialog = false

          }
        })
      }

      // 清空
      this.roleForm = {
        name: '',
        description: ''
      }
    },
    // 取消按钮
    btnCancel() {
      this.showDialog = false
      // 清空
      this.roleForm = {
        name: '',
        description: ''
      }
    }
  }
}
</script>