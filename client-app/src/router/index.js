import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import Signup from '../views/Signup.vue';
import LoginView from '../views/Login.vue';
import WorkspaceView from '../views/Workspace.vue'
// import WorkspaceItemView from '../views/WorkspaceItem.vue'
import DashboardView from '../views/Dashboard';
import BoardsView from '../views/Boards.vue'
import ProjectsView from '../views/Projects.vue'
import ProjectsDetailsView from '../views/ProjectDetails.vue'
import SettingsView from '../views/Settings.vue'
import TagsView from '../views/Tags.vue'

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
        path:'projects', 
        name:'projects-view', 
        component: ProjectsView,
      },
      {path:'projects/:id', name:'project-details', component: ProjectsDetailsView },
       {
        path:'tags', 
        name:'tags-view', 
        component: TagsView
      },
      // {
      //   path:'workspaces/:name?', 
      //   name:'workspace-detail-view', 
      //   component: WorkspaceItemView,
      //   props: true,
      //   redirect:{ name:'workspace-boards' },
      //   // beforeEnter: requireAuth,
      //   children:[
      //     {path:'boards', name:'workspace-boards', component: WorkspaceBoards},
      //     {path:'members', name:'workspace-members', component: WorkspaceMembers},
      //     {path:'lists', name:'workspace-lists', component: WorkspaceList},
      //     // {path:'meeting-notes', name:'workspace-meeting-notes', component: TransactionsList},
      //     // {path:'product-requirements', name:'workspace-product-requirements', component: TransactionsList},
      //     // {path:'settings', name:'workspace-settings', component: TransactionsList},
      //   ]
      // },
      {
        path:'clients', 
        name:'clients-view', 
        component: WorkspaceView,
        // beforeEnter: requireAuth,
        
      },
      {
        path:'settings', 
        name:'settings-view', 
        component: SettingsView
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("../views/ErrorPage.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active'
})

export default router
