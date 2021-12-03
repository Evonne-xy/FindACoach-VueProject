import { createRouter, createWebHistory } from 'vue-router';

// import UserAuth from './pages/auth/UserAuth.vue';
// import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
// import CoachRegisteration from './pages/coaches/CoachRegisteration.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
// import RequestReceived from './pages/requests/RequestReceived.vue';
import store from './store/index.js';
import NotFound from './pages/NotFound.vue';

const UserAuth = () => import('./pages/auth/UserAuth.vue');
const CoachDetails = () => import('./pages/coaches/CoachDetails.vue');
const CoachRegisteration = () => import('./pages/coaches/CoachRegisteration.vue');
const ContactCoach = () => import('./pages/requests/ContactCoach.vue');
const RequestReceived = () => import('./pages/requests/RequestReceived.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    {path:'/auth',component: UserAuth,meta:{requiresUnAuth:true}},
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      props:true,
      children: [
        { path: 'contact', component: ContactCoach }
      ]
    },
    { path: '/register', component: CoachRegisteration, meta:{requiresAuth: true}},
    { path: '/request', component: RequestReceived, meta:{requiresAuth: true}},
    { path: '/:notFound(.*)', component: NotFound },
  ],
});


router.beforeEach(function(to,from,next){
  if(to.meta.requiresAuth && !store.getters.isAuthenticated){
    next('/auth');
  }
  else if(to.meta.requiresUnAuth && store.getters.isAuthenticated){
    next('/coaches');
  }
  else{
    next();
  }
})
export default router;
