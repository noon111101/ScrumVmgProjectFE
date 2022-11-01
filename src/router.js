import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/ManageUser.vue';


Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },

    {
      path: '/add-user',
      name: '',
      component: () => import('./views/Add-User.vue'),
      beforeEnter: (to, from, next) => {
        const admin =JSON.parse(localStorage.getItem('user')).roles.includes("ROLE_ADMIN");
        if(admin)
          next()
        else next('/calender')
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/BoardUser.vue')
    },
    {
      path: '/user/:code/:departmentName/:fullName',
      name: 'user',
      component: () => import('./views/ViewDetailLogs.vue'),
      beforeEnter: (to, from, next) => {
        const admin =JSON.parse(localStorage.getItem('user')).roles.includes("ROLE_ADMIN");
        const manage =JSON.parse(localStorage.getItem('user')).roles.includes("ROLE_MANAGE");
        if(admin || manage)
          next()
        else next('/calender')
      }
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('./views/Report.vue'),
      beforeEnter: (to, from, next) => {
        const admin =JSON.parse(localStorage.getItem('user')).roles.includes("ROLE_ADMIN");
        const manage =JSON.parse(localStorage.getItem('user')).roles.includes("ROLE_MANAGE");
        if(admin || manage )
          next()
        else next('/calender')
      }
      },
    {
      path: '/changepassword',
      name: 'changepassword',
      component: () => import('./views/ChangePassword.vue')
    },
    {
      path: '/calender',
      name: 'calender',
      component: () => import('./views/CalenderReport.vue')
    },
    {
      path: '/timesheetmod',
      name: 'timesheetmod',
      component: () => import('./views/TimeSheetMod.vue'),
      beforeEnter: (to, from, next) => {
        const manage =JSON.parse(localStorage.getItem('user')).roles.includes("ROLE_MANAGE");
        if(manage)
          next()
        else next('/calender')
      }
    },
    {
      path: '/timesheetadmin',
      name: 'timesheetadmin',
      component: () => import('./views/TimeSheetsAdmin.vue'),
      beforeEnter: (to, from, next) => {
        const admin =JSON.parse(localStorage.getItem('user')).roles.includes("ROLE_ADMIN");
        if(admin)
          next()
        else next('/calender')
      }
    },
    {
      path: '/manage',
      name: 'manage',
      component: () => import('./views/ManageUser.vue'),
      beforeEnter: (to, from, next) => {
        const admin =JSON.parse(localStorage.getItem('user')).roles.includes("ROLE_ADMIN");
        if(admin)
          next()
        else next('/calender')
      }
    },
    {
      path: '/profile',
      name: '',
      component: () => import('./views/Profile.vue')
    },
  ]
}
);

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  if (authRequired && !loggedIn) {
    if (to.path=='/forgotPassword') {
      next('/forgotPassword')
    }
    else
      next('/login');
  }
  else {
    next()
  }
});