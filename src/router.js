import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from  './pages/coaches/CoachesList.vue';
import CoacheDetails from  './pages/coaches/CoacheDetails.vue';
import CoachRegistration from  './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsRecieves from './pages/requests/RequestsRecieves.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import NotFound from './pages/NotFound.vue';
import store from './store/index.js';

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