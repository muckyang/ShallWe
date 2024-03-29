import Vue from 'vue'
import VueRouter from 'vue-router'

import constants from '../lib/constants'

import Home from '../views/Home.vue'

// 유저
import Login from '../components/user/Login.vue'
import Join from '../components/user/Join.vue'
import editUser from '../components/user/editUser.vue'
import Profile from '../components/user/Profile.vue'
import SignUpComplete from '../components/user/SignUpComplete.vue'
import userList from '../components/user/userList.vue'
import accuseForm from '../components/user/accuseForm.vue'

// 아티클
import articleCreate from '../views/articles/articleCreate.vue'
import articleDetail from '../views/articles/articleDetail.vue'
import articleUpdate from '../views/articles/articleUpdate.vue'
import articleList from '../views/articles/articleList.vue'
import localList from '@/views/articles/localList.vue'

//자유게시판
import postCreate from '../views/post/postCreate'
import postDetail from '../views/post/postDetail'
import postUpdate from '../views/post/postUpdate'
import postList from '../views/post/postList'

//임시저장
import tempList from '../views/articles/tempList.vue'

// 에러
import err400 from '../views/errors/err400.vue'
import err404 from '../views/errors/err404.vue'
import err500 from '../views/errors/err500.vue'


//검색
import searchList from '../views/searchList.vue';

Vue.use(VueRouter)

  const routes = [
    //Home
    {
      path:'/',
      name:'HOME',
      component:Home,
    },   
    // 로그인
    { 
      path: '/user/login',
      name: constants.URL_TYPE.USER.LOGIN,
      component: Login
    },
    //회원가입
    {
      path: '/user/join',
      name: constants.URL_TYPE.USER.JOIN,
      component: Join
    },
    //회원 정보 조회
    {
      path:'/user/profile',
      name: constants.URL_TYPE.USER.PROFILE,
      component: Profile
    },
    //회원 정보 수정
    {
      path:'/user/edit',
      name: constants.URL_TYPE.USER.EDIT,
      component: editUser
    },
   
    //게시글 CRUD
    {
      path: '/create',
      name: 'articleCreate',
      component: articleCreate
    },
    {
      path: '/detail/:ID',
      name: 'articleDetail',
      component: articleDetail
    },
    {
      path: '/update/:ID',
      name: 'articleUpdate',
      component: articleUpdate
    },
    {
      path: '/article',
      name: 'articleList',
      component: articleList
    },
    {
      path: '/templist',
      name: 'tempList',
      component: tempList
    },
    {
      path:'/localList',
      name:'localList',
      component:localList
    },
    //자유게시판CRUD
    {
      path: '/pcreate',
      name: 'postCreate',
      component: postCreate
    },
    {
      path: '/pupdate',
      name: 'postDetail',
      component: postDetail
    },
    {
      path: '/pupdate',
      name: 'postUpdate',
      component: postUpdate
    },
    {
      path: '/posts',
      name: 'postList',
      component: postList
    },
    //검색
    {
      path:'/searchlist',
      name:'searchList',
      component: searchList
    },
    // 에러
    {
      path: '*',
      redirect: '/400',
    },
    {
      path: '/400',
      component: err400
    },
    {
      path: '*',
      redirect: '/404',
    },
    {
      path: '/404',
      component: err404
    },
    {
      path: '*',
      redirect: '/500',
    },
    {
      path: '/500',
      component: err500
    },
    // 회원가입 완료
    {
      path: '/user/signupcomplete',
      name: SignUpComplete,
      component: SignUpComplete
    },
    
    // 유저관리
    {
      path: '/user/userlist',
      name: userList,
      component: userList
    },
    // 신고양식
    {
      path: '/user/accuseform',
      name: accuseForm,
      component: accuseForm
    },
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  //로그인 하지 않아도 되는 페이지
  const publicPages = [constants.URL_TYPE.USER.LOGIN, constants.URL_TYPE.USER.JOIN, 'HOME', 'articleList','postList']
  //로그인 하면 안되는 페이지
  const authPages = [constants.URL_TYPE.USER.LOGIN, constants.URL_TYPE.USER.JOIN]
  
  const authRequired = !publicPages.includes(to.name)
  const unauthRequired = authPages.includes(to.name)
  const isLoggedIn = Vue.$cookies.isKey('auth-token')

  //로그인 하면 안되는 페이지에 로그인 상태로 접근
  if(unauthRequired && isLoggedIn) {
    next(from)
  }

  //로그인 해야 하는 페이지에 로그인 안한 상태로 접근
  if (authRequired && !isLoggedIn){
    alert('로그인 후 이용해 주세요')
    next('/')
  }else{
    next()
  }
})

export default router
