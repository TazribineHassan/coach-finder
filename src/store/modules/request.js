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
        },
        loadRequests(state, paylod){
            state.requests = paylod;
        }
    },
    actions: {
        async addNewRequest(context, paylod) {
            await fetch(`https://coach-finder-37657-default-rtdb.firebaseio.com/requests.json`, {
                method:'POST',
                body:JSON.stringify(paylod)
            });
            context.commit('addRequest', paylod);
        },
        async getAllRequests(context){
            const response = await fetch(`https://coach-finder-37657-default-rtdb.firebaseio.com/requests.json`);
            const data = await response.json();
            if(!response.ok){
                throw new Error(data.message || 'Failed to fetch!');
            }
            const Reqs = [];
            for(const key in data){
                Reqs.push({
                    id: key,
                    coachId: data[key].coachId,
                    email: data[key].email,
                    msg: data[key].msg
                })
            }
            context.commit('loadRequests', Reqs);
        }
    },
    getters:{
        getRequests(state, _, _2, rootGetters){
            
            return state.requests.filter(req => req.coachId === rootGetters.getUserId);
        },      
    }
};