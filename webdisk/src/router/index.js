import Vue from 'vue'
import Router from 'vue-router'
import welcome from '@/components/welcomePage'
import regist from '@/components/registPage'
import login from '@/components/loginPage'
import disk from '@/components/disk'
import allFile from '@/components/allFile'
import dom from '@/components/dom'
import music from '@/components/music'
import pic from '@/components/pic'
import seed from '@/components/seed'
import video from '@/components/video'
import admin from '@/components/admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcomePage',
      component: welcome
    },
    {
      path:'/login',
      name:'login',
      component:login,
      beforeEnter(to,from,next){
        if(localStorage.flag==='true'){
          next('/disk');
        }else{
          next();
        }
      }
    },
    {
      path: '/regist',
      name:'regist',
      component:regist
    },
    {
      path: '/disk',
      component:disk,
      children:[
        {path :'/',
         name: 'disk',
         redirect:'/allFile'
      },{
        path: '/allFile',
        name: 'allFile',
        component:allFile
      },{
        path: '/dom',
        name: 'dom',
        component: dom
      },{
        path: '/music',
        name: 'music',
        component: music
      },{
        path: '/pic',
        name: 'pic',
        component:pic
      },{
        path: '/seed',
        name: 'seed',
        component:seed
      },{
        path: '/video',
        name: 'vedeo',
        component:video
      }
      ],
      beforeEnter(to,from,next){
        if(localStorage.flag==='true'){       
          next();
        }else{
          alert("请先登录");
          next('/login');
        }
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component:admin,
    }
  ]
})
