import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/pages/home'
import video from '@/pages/video'
import supermarket from '@/pages/supermarket'
import community from '@/pages/community'
import user from '@/pages/user'

import homePage from '@/components/home/contentbox/homePage'
import chinaPage from '@/components/home/contentbox/chinaPage'
import demo from '@/examples/demo'
import pageview from '@/components/public/pageView'
import videopageview from '@/components/video/videoPageView'
import login from '@/components/public/login'
import register from '@/components/public/register'
import inputbox from '@/components/public/inputBox'
import videoinputbox from '@/components/video/videoinputbox'
import replyview from '@/components/public/replyView'
import search from '@/components/public/search'
import usermsg from '@/components/user/userMessage'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/home/homepage'
    },
    {
      path: '/',
      name: 'home',
      component: home,
      children: [{
          path: '/home/homepage',
          component: homePage
        },
        {
          path: '/home/chinapage',
          component: chinaPage
        }
      ]
    },
    {
      path: '/video',
      name: 'video',
      component: video
    },
    {
      path: '/supermarket',
      name: 'supermarket',
      component: supermarket
    },
    {
      path: '/community',
      name: 'community',
      component: community
    },
    {
      path: '/user',
      name: 'user',
      component: user

    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/pageview',
      name: 'pageview',
      component: pageview
    },
    {
      path: '/videopageview',
      name: 'videopageview',
      component: videopageview
    },
    {
      path: '/inputbox',
      name: 'inputbox',
      component: inputbox
    },
    {
      path: '/replyview',
      name: 'replyview',
      component: replyview
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/usermsg',
      name: 'usermsg',
      component: usermsg
    },
    {
      path: '/videoinputbox',
      name: 'videoinputbox',
      component: videoinputbox
    },
    
  ]
})
