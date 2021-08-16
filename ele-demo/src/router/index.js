import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',
    component:()=>import("../components/layout.vue"),
    children:[
      {path:'menu',component:()=>import("../components/menu/index.vue"),meta:{selected:'/menu'}},
      {path:'menu/add',component:()=>import("../components/menu/info.vue"),meta:{selected:'/menu'}},
      {path:'menu/:id',component:()=>import("../components/menu/info.vue"),meta:{selected:'/menu'}},
      {path:'role',component:()=>import("../components/role/index.vue"),meta:{selected:'/role'}},
      {path:'role/add',component:()=>import("../components/role/info.vue"),meta:{selected:'/role'}},
      {path:'role/:id',component:()=>import("../components/role/info.vue"),meta:{selected:'/role'}},
      {path:'user',component:()=>import("../components/user/index.vue"),meta:{selected:'/user'}},
      {path:'user/add',component:()=>import("../components/user/info.vue"),meta:{selected:'/user'}},
      {path:'user/:id',component:()=>import("../components/user/info.vue"),meta:{selected:'/user'}},
      {path:'cate',component:()=>import("../components/cate/index.vue"),meta:{selected:'/cate'}},
      {path:'cate/add',component:()=>import("../components/cate/info.vue"),meta:{selected:'/cate'}},
      {path:'cate/:id',component:()=>import("../components/cate/info.vue"),meta:{selected:'/cate'}},
      {path:'goods',component:()=>import("../components/goods/index.vue"),meta:{selected:'/goods'}},
      {path:'goods/add',component:()=>import("../components/goods/info.vue"),meta:{selected:'/goods'}},
      {path:'goods/:id',component:()=>import("../components/goods/info.vue"),meta:{selected:'/goods'}},
    ]
    }
  ]
})
