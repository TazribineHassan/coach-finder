export default {
    namespaced:true,
    state(){
        return {
            coaches:[
                {
                  id: 'c1',
                  firstName: 'TAZRIBINE',
                  lastName: 'Hassan',
                  areas: ['frontend', 'backend', 'career'],
                  description:
                    "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
                  hourlyRate: 30
                },
                {
                  id: 'c2',
                  firstName: 'Julie',
                  lastName: 'Jones',
                  areas: ['frontend', 'career'],
                  description:
                    'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
                  hourlyRate: 20
                }
            ],
        };
    },
    getters:{
        getCoaches(state){
            return state.coaches;
        },
        getHasCoaches(state){
            return state.coaches.length > 0;
        }
    }
};