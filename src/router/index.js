/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，vip文档中已提供路由的基础图标与小清新图标的配置方案，请仔细阅读
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import EmptyLayout from '@/layouts/EmptyLayout'
import { publicPath, routerMode } from '@/config'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/old/index'),
        meta: {
          title: '首页',
          icon: 'home',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/about',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/old/about'),
        name: 'About',
        meta: { title: '关于我们', icon: 'listview' },
      },
    ],
  },
  {
    path: '/news',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/old/news'),
        name: 'News',
        meta: { title: '最新动态', icon: 'listview', affix: false },
      },
    ],
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/old/product'),
        name: 'Product',
        meta: { title: '案例展示', icon: 'listview', affix: false },
      },
    ],
  },
  {
    path: '/gsyw',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/old/gsyw'),
        name: 'Gsyw',
        meta: { title: '公司业务', icon: 'listview', affix: false },
      },
    ],
  },
  {
    path: '/message',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/old/message'),
        name: 'Message',
        meta: { title: '在线留言', icon: 'listview', affix: false },
      },
    ],
  },
  {
    path: '/lxwm',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/old/lxwm'),
        name: 'Lxwm',
        meta: { title: '联系我们', icon: 'listview', affix: false },
      },
    ],
  },
  {
    path: '/data',
    component: Layout,
    redirect: '/data/list',
    meta: { title: '数据管理', icon: 'edit' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/data/list'),
        name: 'List',
        meta: { title: '数据仓库', icon: 'warehouse', affix: false },
      },
      {
        path: 'upload',
        component: () => import('@/views/data/upload'),
        name: 'Upload',
        meta: { title: '数据上传', icon: 'el-icon-upload', affix: false },
      },
    ],
  },
  {
    path: '/model',
    component: Layout,
    redirect: '/model/list',
    meta: { title: '模型管理', icon: 'edit' },
    children: [
      {
        path: 'create',
        component: () => import('@/views/model/create'),
        name: 'Create',
        meta: { title: '模型创建', icon: 'el-icon-s-data', affix: false },
      },
      {
        path: 'list',
        component: () => import('@/views/model/list'),
        name: 'MList',
        meta: { title: '模型列表', icon: 'list', affix: false },
      },
      {
        path: 'index',
        component: () => import('@/views/model/index'),
        name: 'Model',
        meta: { title: '数据分析', icon: 'fenxi', affix: false },
      },
    ],
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]

export const asyncRoutes = [
  /* {
    path: "/test",
    component: Layout,
    redirect: "noRedirect",
    children: [
      {
        path: "test",
        name: "Test",
        component: () => import("@/views/test/index"),
        meta: {
          title: "test",
          icon: "marker",
          permissions: ["admin"],
        },
      },
    ],
  }, */

  {
    path: '/personnelManagement',
    component: Layout,
    redirect: 'noRedirect',
    name: 'PersonnelManagement',
    meta: { title: '配置', icon: 'users-cog', permissions: ['admin'] },
    children: [
      {
        path: 'userManagement',
        name: 'UserManagement',
        component: () =>
          import('@/views/personnelManagement/userManagement/index'),
        meta: { title: '用户管理' },
      },
      {
        path: 'roleManagement',
        name: 'RoleManagement',
        component: () =>
          import('@/views/personnelManagement/roleManagement/index'),
        meta: { title: '角色管理' },
      },
      {
        path: 'menuManagement',
        name: 'MenuManagement',
        component: () =>
          import('@/views/personnelManagement/menuManagement/index'),
        meta: { title: '菜单管理', badge: 'New' },
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
})

export function resetRouter() {
  location.reload()
}

export default router
