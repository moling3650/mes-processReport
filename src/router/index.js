import Vue from 'vue'
import Router from 'vue-router'
import MTable from '@/components/MTable'
import MChart from '@/components/MChart'
import MCharts from '@/components/MCharts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MTable',
      component: MTable
    },
    {
      path: '/chart',
      name: 'MChart',
      component: MChart
    },
    {
      path: '/charts',
      name: 'MCharts',
      component: MCharts
    }
  ]
})
