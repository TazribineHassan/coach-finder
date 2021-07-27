export default {
    namespaced:true,
    state(){
        return {
            coaches:[], 
        };
    },
    getters:{
        getCoaches(state){
            return state.coaches;
        },
        getHasCoaches(state){
            return state.coaches.length > 0;
        },
        isUserIdExist(state, _, _2, rootGetters){
          return state.coaches.some( c => c.id === rootGetters.getUserId);
        }
    },
    mutations:{
      addNewCoach(state, paylod){
          state.coaches.push(paylod);
      },
      getAllCoaches(state, paylod){
        state.coaches = paylod;
      }
    },
    actions:{
      async addCoach(context, paylod){
        const userId = context.rootGetters.getUserId;
        const response = await fetch(`https://coach-finder-37657-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
          method:'PUT',
          body:JSON.stringify(paylod)
        });

        const data = await response.json();
        if(!response.ok){
          throw new Error(data.message || 'Failed to regster!');
        }
        context.commit('addNewCoach', paylod);
      },
      async loadCoaches(context){
        const response = await fetch(`https://coach-finder-37657-default-rtdb.firebaseio.com/coaches.json`);
        const data = await response.json();
        
        if(!response.ok){
          throw new Error(data.message || 'Failed to fetch!');
        }

        const coaches = [];

        for(const key in data){
          coaches.push({
            id: key,
            firstName: data[key].firstName,
            lastName: data[key].lastName,
            areas: data[key].areas,
            description: data[key].description,
            hourlyRate: data[key].hourlyRate
          })
        }

        context.commit('getAllCoaches', coaches);
      }
    }
}; 