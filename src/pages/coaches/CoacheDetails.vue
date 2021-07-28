<template>
    <div>
        <section>
            <base-card>
                <h2> {{ selectedCoach.firstName + " " + selectedCoach.lastName }} </h2>
                <h3> ${{ selectedCoach.hourlyRate }}/hour </h3>
            </base-card>
        </section>
        <section>
            <base-card>
                <header>
                    <h2> Interested Reach out now </h2>
                    <base-button :link="true" :to="$route.params.id + '/contact'">Contact</base-button>
                </header>
                <router-view></router-view>
            </base-card>
        </section>
        <section>
            <base-card>
                <base-badge v-for="area in selectedCoach.areas" :key="area" :title="area" :type="area"></base-badge>
                <p> {{selectedCoach.description}} </p>
            </base-card>
        </section>
    </div>
</template>

<script>
export default {
    props: ['id'],
    data(){
        return {
            selectedCoach: null
        }
    },
    created(){
        this.selectedCoach = this.$store.getters['coach/getCoaches'].find(co => co.id === this.id);
    }
}
</script>