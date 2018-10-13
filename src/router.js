import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Championships from './views/championships/Championships.vue'
import CreateChampionship from './views/championships/CreateChampionship.vue'
import Register from './views/user/Register.vue'
import Login from './views/user/Login.vue'
import Teams from './views/team/Teams.vue'
import UserProfile from './views/user/UserProfile.vue'
import Users from './views/user/Users.vue'
import NotFound from './views/common/NotFound.vue'
// import UserSettings from './components/user/UserSettings'
// import UserOverview from './components/user/UserOverview'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/championships',
      name: 'championships',
      component: Championships
    },
    {
      path: 'create',
      name: 'createChampionship',
      component: CreateChampionship
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/teams',
      name: 'teams',
      component: Teams
    },
    {
      path: '/user_:id',
      name: 'UserProfile',
      component: UserProfile
      // children: [
      //   {
      //     path: 'settings',
      //     component: UserSettings
      //   },
      //   {
      //     path: 'overview',
      //     component: UserOverview
      //   }
      // ]
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/*',
      name: 'not-found',
      component: NotFound
    }
  ]
})