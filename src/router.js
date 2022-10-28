import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/ManageUser.vue';


Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/manage',
      name: 'manage',
      // lazy-loaded
      component: () => import('./views/ManageUser.vue')
    },
    {
      path: '/add-user',
      name: 'add-user',
      // lazy-loaded
      component: () => import('./views/Add-User.vue')
    },

    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./views/BoardUser.vue')
    },
    {
      path: '/user/:code/:departmentName/:fullName',
      name: 'user',
      // lazy-loaded
      component: () => import('./views/ViewDetailLogs.vue')
    },
    {
      path: '/timesheet',
      name: 'timesheet',
      // lazy-loaded
      component: () => import('./views/TimeSheets.vue')
    },
    {
      path: '/changepassword',
      name: 'changepassword',
      // lazy-loaded
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
      component: () => import('./views/TimeSheetMod.vue')
    },
    {
      path: '/timesheetadmin',
      name: 'timesheetadmin',
      component: () => import('./views/TimeSheetsAdmin.vue')
    },
    {
      path: '/manage',
      name: 'manage',
      // lazy-loaded
      component: () => import('./views/ManageUser.vue')
    },
    {
      path: '/profile',
      name: '',
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },
  ]
}
);

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }

});