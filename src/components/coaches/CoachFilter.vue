<template>
    <base-card>
        <h2>Find your Coach</h2>
        <span class="filter-option">
            <input type="checkbox" name="" @change="setFilter" id="frontend" checked>
            <label for="frontend">frontend</label>
        </span>        
        <span class="filter-option">
            <input type="checkbox" name="" @change="setFilter" id="backend" checked>
            <label for="backend">Backend</label>
        </span>        
        <span class="filter-option">
            <input type="checkbox" name="" @change="setFilter" id="career" checked>
            <label for="career">Career</label>
        </span>
    </base-card>
</template>

<script>
export default {
    data(){
        return {
            filters:{
                frontend:true,
                backend:true,
                career:true
            }
        }
    },
    methods:{
        setFilter(event){

            if(event.target.id === 'frontend'){
                this.filters.frontend = event.target.checked;
            }            
            else if(event.target.id === 'backend'){
                this.filters.backend = event.target.checked;
            }            
            else if(event.target.id === 'career'){
                this.filters.career = event.target.checked;
            }

            this.$emit('change-filter', this.filters);
        }
    }
}
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>