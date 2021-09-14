import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import Signup from '../views/Signup.vue';
import LoginView from '../views/Login.vue';
import WorkspaceView from '../views/Workspace.vue'
import WorkspaceItemView from '../views/WorkspaceItem.vue'
import DashboardView from '../views/Dashboard';
import BoardsView from '../views/Boards.vue'
import SettingsView from '../views/Settings.vue'


const routes = [
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/',
    redirect: { name: 'login' }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/terms-and-service',
    name: 'terms-and-service',
    component: Signup
  },
  {
    path: '/dashboard/',
    name: 'siner-dashboard',
    component: DashboardView,
    // beforeEnter: requireAuth,
    children:[
      {
        path:'home', 
        name:'home-view', 
        component: HomeView
      },
      {
        path:'boards', 
        name:'boards-view', 
        component: BoardsView
      },
      {
        path:'boards/:name', 
        name:'boards-detail-view', 
        component: BoardsView
      },
      {
        path:'workspaces', 
        name:'workspaces', 
        component: WorkspaceView
      },
      {
        path:'workspaces/:name', 
        name:'workspace-detail-view', 
        component: WorkspaceItemView,
        props: true
      },
      {
        path:'settings', 
        name:'settings-view', 
        component: SettingsView
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active'
})

export default router
