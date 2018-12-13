import Vue from 'vue'
import Router from 'vue-router'
// 路由
import Map from '@/components/Map'
import Travel from '@/components/Travel'
import Weather from '@/components/Weather'
import Detail from '@/components/Detail'
// 导入 map 下的二级路由
import Hot from '@/components/topics/Hot'
import Mobile from '@/components/topics/Mobile'
import Entertainment from '@/components/topics/Entertainment'
import Military from '@/components/topics/Military'
import Society from '@/components/topics/Society'
import Sport from '@/components/topics/Sport'
// 导入 weather 下的二级路由
import City from '@/components/weather/City'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/travel',
      // name: 'Travel',
      component: Travel,
      children: [
        /* {
          path: 'detail',
          component: Detail
        } */
      ]
    },
    {
      path: '/weather',
      name: 'Weather',
      component: Weather,
      children: [{
        path: '/city',
        component: City
      }]
    },
    {
      path: '/map',
      name: 'Map',
      component: Map,
      children: [{
          path: '/',
          component: Hot
        },
        {
          path: 'entertainment',
          component: Entertainment
        },
        {
          path: 'mobile',
          component: Mobile
        },
        {
          path: 'military',
          component: Military
        },
        {
          path: 'society',
          component: Society
        },
        {
          path: 'sport',
          component: Sport
        },
      ]
    },
    {
      path: '/detail/:id',
      component: Detail
    },
    {
      path: '/*',
      redirect: '/travel'
    },
  ]
})
