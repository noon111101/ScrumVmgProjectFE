import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/',
      redirect:'/login',
    },
    {
      path: '/register',
      component:  () => import('./views/ManageUser.vue')
    },

    {
      path: '/add-user',
      name: '',
      component: () => import('./views/Add-User.vue'),
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
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('./views/Report.vue'),
      },
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      component: () => import('./views/ForgotPassword.vue'),
    },
    {
      path: '/confirmForgot',
      name: 'confirmForgot',
      component: () => import('./views/ConfirmForgot.vue'),
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
    },

    {
      path: '/user/:id',
      name: 'edit',
      component: () => import('./views/EditUser.vue'),
    },

    {
      path: '/timesheetadmin',
      name: 'timesheetadmin',
      component: () => import('./views/TimeSheetsAdmin.vue'),
    },
    {
      path: '/manage',
      name: 'manage',
      component: () => import('./views/ManageUser.vue'),
    },
    {
      path: '/profile',
      name: '',
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/unpermist',
      name: 'unpermist',
      component: () => import('./views/UnPermist.vue')
    },
  ]
}
);

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home','/forgotPassword','/confirmForgot','/'];
  const userPages = ['/user','/calender','/profile','/changepassword','/unpermist']
  const adminPages = ['/add-user', '/manage', '/timesheetadmin','/report'];
  const managePages = [ '/timesheetmod','/report'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  if (authRequired && !loggedIn) {
    next('/login');
  }
  if(!authRequired && !loggedIn){
    next()
  }
  else {
    const admin =JSON.parse(localStorage.getItem('user')).roles.includes("ROLE_ADMIN");
    const manage =JSON.parse(localStorage.getItem('user')).roles.includes("ROLE_MANAGE");
    if((adminPages.includes(to.path) || to.path.startsWith("/user/")) && admin  || managePages.includes(to.path) && manage || userPages.includes(to.path) || publicPages.includes(to.path))
      next();
    else
      next('/unpermist')
  }
});
export default router;