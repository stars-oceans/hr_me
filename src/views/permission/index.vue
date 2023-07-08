<template>
  <div>
    权限管理
  </div>
</template>

<script>
import { getRoleAPI } from '@/api/permission'
export default {
  mounted() {
      this.getRole()  // 获取角色列表
  },
  methods: {
    async getRole() {
      const { data: res } = await getRoleAPI({
        page: '1',
        pagesize: '10'
      })

      console.log(res);
    }
  }
}
</script>

<style>

</style>