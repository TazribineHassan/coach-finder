<template>
    <section>
        FILTER
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline">Refresh</base-button>
                <base-button :link="true" to="/register">Register</base-button>
            </div>
            <ul v-if="hasCoaches">
                <coach-item v-for="coach in getAllCoaches"
                :key="coach.id"
                :id="coach.id"
                :first-name="coach.firstName"
                :last-name="coach.lastName"
                :areas="coach.areas"
                :rate="coach.hourlyRate"></coach-item>
            </ul>
            <h3 v-else>No data found</h3>
        </base-card>
    </section>
</template>

<script> 
import CoachItem from '../../components/coaches/CoachItem.vue';
import BaseButton from '../../components/UI/BaseButton.vue';
export default {
    components:{
        CoachItem,
        BaseButton,
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