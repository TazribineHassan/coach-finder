<template>
    <section>
        FILTER
    </section>
    <section>
        <div class="controls">
            <button>Refresh</button>
            <router-link to="/register">Register</router-link>
        </div>
        <ul v-if="hasCoaches">
            <coach-item v-for="coach in getAllCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :area="coach.areas"
            :rate="coach.hourlyRate"></coach-item>
        </ul>
        <h3 v-else>No data found</h3>
    </section>
</template>

<script> 
import CoachItem from '../../components/coaches/CoachItem.vue';
export default {
    components:{
        CoachItem,
    },
    computed:{
        getAllCoaches(){
            return this.$store.getters['coach/getCoaches'];
        },
        hasCoaches(){
            return this.$store.getters['coach/getHasCoaches'];
        },
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