<template>
    <base-dialog :show="!!error" title="An error occured" @close="exitModal">
        <p>{{error}}</p>
    </base-dialog>
    <section>
            <coach-filter @change-filter="setFilter"></coach-filter>
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
                <base-button v-if="!isCoaches && !isLoading" :link="true" to="/register">Register as Coach</base-button>
            </div>
            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>
            <ul v-else-if="hasCoaches">
                <coach-item v-for="coach in getAllCoaches"
                :key="coach.id"
                :id="coach.id"
                :first-name="coach.firstName"
                :last-name="coach.lastName"
                :areas="coach.areas"
                :rate="coach.hourlyRate"></coach-item>
            </ul>
            <!-- <h3 v-else>No data found</h3> -->
        </base-card>
    </section>
</template>

<script> 
import CoachItem from '../../components/coaches/CoachItem.vue';
import BaseButton from '../../components/UI/BaseButton.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
export default {
    components:{
        CoachItem,
        BaseButton,
        CoachFilter
    },
    data(){
        return {
            filters: {
                frontend:true,
                backend:true,
                career:true
            },
            isLoading:false,
            error:null
        }
    },
    computed:{
        getAllCoaches(){
            const coaches = this.$store.getters['coach/getCoaches'];
            return coaches.filter( c => {
                if(this.filters.frontend && c.areas.includes('frontend')){
                    return true;
                }
                if(this.filters.backend && c.areas.includes('backend')){
                    return true;
                }                
                if(this.filters.career && c.areas.includes('career')){
                    return true;
                }
                console.log(coaches);
                return false;
            });
        },
        hasCoaches(){
            return !this.isLoading && this.$store.getters['coach/getHasCoaches'];
        },        
        isCoaches(){
            return this.$store.getters['coach/isUserIdExist'];
        },

    },
    methods:{
        setFilter(filters){ 
            this.filters = filters;
        },
        async loadCoaches(){

            this.isLoading = true;
            
            try{
                await this.$store.dispatch('coach/loadCoaches');
            }catch(err){
                this.error = err.message || 'Something went wrong';
                console.log(this.error);
            }

            this.isLoading = false;
        },
        exitModal(){
            this.error = null;
        }
    },
    created(){
        this.loadCoaches();
    }
}
</script>

<style scoped>
    ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>