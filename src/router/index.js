import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import TopSignal from '@/components/TopSignal/TopSignal'
import Chart from '@/components/Chart'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/topsignal',
      name: 'TopSignal',
      component: TopSignal
    },
    {
      path: '/chart/:exchange/:symbol/:interval',
      name: 'Chart',
      component: Chart
    }
  ]
})
