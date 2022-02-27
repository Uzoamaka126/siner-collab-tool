import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import ClientsView from '../views/Clients.vue'
import ProjectsView from '../views/Projects.vue'
import ProjectsDetailsView from '../views/ProjectDetails.vue'
import SettingsView from '../views/Settings.vue'
import TagsView from '../views/Tags.vue'
import InvoicesView from '../views/Invoices.vue'
import CreateInvoiceView from '../components/invoices/CreateInvoice.vue';
import InvoiceDetailsView from '../components/invoices/InvoiceDetails.vue';
// const Register = () => import(/* webpackChunkname: "register" */'@/components/account/register.new')
// const Invite = () => import(/* webpackChunkname: "invite" */'@/components/account/invited')

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
    name: 'home',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    // component: LoginView,
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    // component: Signup
    component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue')

  },
  {
    path: '/reset',
    name: 'reset',
    // component: Signup
    component: () => import(/* webpackChunkName: "reset" */ '../views/Reset.vue')

  },
  {
    path: '/dashboard/',
    name: 'siner-dashboard',
    // component: DashboardView,
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),

    // beforeEnter: requireAuth,
    children:[
      {
        path:'home', 
        name:'home-view', 
        component: HomeView
      },
      {
        path:'workspaces', 
        name:'workspaces', 
        component: ClientsView
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
      {
        path: 'invoices', 
        name: 'invoices-view', 
        component: InvoicesView
      },
      {
        path: 'invoices/create', 
        name: 'create-invoice-view', 
        component: CreateInvoiceView
      },
      {
        path: 'invoices/view/:id', 
        name: 'details-invoice-view', 
        component: InvoiceDetailsView
      },
      {
        path:'clients', 
        name:'clients-view', 
        component: ClientsView,
        component: () => import(/* webpackChunkName: "clients" */ '../views/Clients'),
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
