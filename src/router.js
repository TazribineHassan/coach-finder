import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue';

import CoachesList from  './pages/coaches/CoachesList.vue';
import store from './store/index.js';

const CoacheDetails = defineAsyncComponent(() => import('./pages/coaches/CoacheDetails.vue'));
const CoachRegistration = defineAsyncComponent(() => import('./pages/coaches/CoachRegistration.vue'));
const ContactCoach = defineAsyncComponent(() => import('./pages/requests/ContactCoach.vue'));
const RequestsRecieves = defineAsyncComponent(() => import('./pages/requests/RequestsRecieves.vue'));
const UserAuth = defineAsyncComponent(() => import('./pages/auth/UserAuth.vue'));
const NotFound = defineAsyncComponent(() => import('./pages/NotFound.vue'));

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path: '/', redirect:'/coaches'},
        {path: '/coaches', component: CoachesList},
        {path: '/coaches/:id', component: CoacheDetails, props:true, children:[
            {path: 'contact', component: ContactCoach, props:true},
        ]},
        {path: '/register', component: CoachRegistration, meta: {auth: true} },
        {path: '/requests', component: RequestsRecieves, meta: {auth: true}},
        {path: '/auth', component: UserAuth, meta: {unauth: true}},
        {path: '/:notFound(.*)', component: NotFound},
    ],
});

router.beforeEach(function(to, _, next){
    if( to.meta.auth && !store.getters.isAuth){
        next('/auth');
    }
    else if(to.meta.unauth && store.getters.isAuth){
        next('/coaches');
    }
    else{
        next();
    }
});

export default router;