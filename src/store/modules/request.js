export default {
    namespaced: true,
    state() {
        return {
            requests: []
        };
    },
    mutations: {
        addRequest(state, paylod) {
            state.requests.push(paylod);
        }
    },
    actions: {
        addNewRequest(context, paylod) {
            context.commit('addRequest', paylod);
        }
    },
    getters:{
        getRequests(state, _, _2, rootGetters){
            return state.requests.filter(req => req.coachId === rootGetters.getUserId);
        },      
    }
};