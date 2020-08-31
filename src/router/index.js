import Main from "../components/Main.vue"
import post from "../components/Post.vue"
import theme from "../components/theme.vue"
import hot from "../components/hot.vue"
import right from "../components/rightpage.vue"
import post_user from "../components/post-user.vue"
// const login = resolve => require(["../components/view/index.vue"], resolve);
// const index = resolve => require(["../components/view/index.vue"], resolve);
// const test = resolve => require(["../components/view/test.vue"], resolve);


export default [{
  path: '/',
  component: Main,
  name: 'main'

  },
  {
    path: '/post/:id',
    component: post,
    name: 'post',
    props: true
  },
  {
    path: '/theme/:id',
    component: theme,
    name: 'theme',
    props: true
  },
  {
    path: '/right/:id',
    component: right,
    name: 'right',
    props: true
  },
  {
    path: '/post_user/:user_id',
    component: post_user,
    name: 'post_user',
    props: true
  },
  {
    path: '/hot',
    component: hot,
    name: 'hot',
    props: true
  },
 
  {
    path: '/admin',
    name: 'admin',
    component: ()=>import('../components/admin/admin.vue'),
    children:[
      {
        name:'user_admin',
        path:'user_admin',
        component:()=>import('../components/admin/user_admin.vue')
      },
      {
        name:'cat_admin',
        path:'cat_admin',
        component:()=>import('../components/admin/cat_admin.vue')
      },
      {
        name:'post_admin',
        path:'post_admin',
        component:()=>import('../components/admin/post_admin.vue')
      },
      {
        name:'home',
        path:'home',
        component:()=>import('../components/admin/home.vue')
      },
    ]
  }
]