import Vue from 'vue'
import VueRouter from 'vue-router'
import Gallery from '../views/Gallery.vue'
import Add from '../views/Add.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'gallery',
    component: Gallery
  },
  {
    path: '/add',
    name: 'add',
    component: Add
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
