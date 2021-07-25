import { createStore } from 'vuex';
import coachModule from './modules/coach.js';
import requestModule from './modules/request.js';

const store = createStore({
    modules:{
        coach: coachModule,
        request: requestModule
    },
    state(){
        return {

        };
    },
});

export default store;