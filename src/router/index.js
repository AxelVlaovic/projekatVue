import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Activities from '@/views/Activities.vue'
import Single from '@/views/Single.vue'
import Suggestions from '@/views/Suggestions.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/activities',
    name: 'Activities',
    component: Activities

  },
  {
    path: '/activity/:id',
    name: 'Single',
    component: Single

  },
  {
    path: '/suggestions',
    name: 'Suggestions',
    component: Suggestions

  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register

  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
