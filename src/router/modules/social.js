// 社保
import Layout from '@/layout'

export default {
  path: '/social',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/social/index.vue'),
      meta: { title: '社保',icon : 'table' }
    }
  ]
}