<template>
    <section>
        <base-card>
        <header>
        <h2>Request Received</h2>
        </header>
          <div v-if="isLoading">
            <base-spinner></base-spinner>
          </div>
        <ul v-if="hasRequests">
            <request-item v-for="req in getAllRequests" 
            :key="req.id" 
            :email="req.email"
            :msg="req.msg"></request-item>
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
        </base-card>
    </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue'
export default {
    data(){
      return {
        isLoading:false
      }
    },
    components:{
        RequestItem
    },
    computed:{
        getAllRequests(){
          return this.$store.getters['request/getRequests'];
        },      
        hasRequests(){
           return this.$store.getters['request/getRequests'].length > 0;
        }
    },
    methods:{
      async loadRequests(){
        this.isLoading = true;
        await this.$store.dispatch('request/getAllRequests');
        this.isLoading = false;
      }
    },
    created(){
      this.loadRequests();
    }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
</style>