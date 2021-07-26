import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from  './pages/coaches/CoachesList.vue';
import CoacheDetails from  './pages/coaches/CoacheDetails.vue';
import CoachRegistration from  './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsRecieves from './pages/requests/RequestsRecieves.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path: '/', redirect:'/coaches'},
        {path: '/coaches', component: CoachesList},
        {path: '/coaches/:id', component: CoacheDetails, props:true, children:[
            {path: 'contact', component: ContactCoach},
        ]},
        {path: '/register', component: CoachRegistration},
        {path: '/requests', component: RequestsRecieves},
        {path: '/:notFound(.*)', component: NotFound},
    ],
})

export default router;