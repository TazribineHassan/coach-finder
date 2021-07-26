<template>
    <form @submit.prevent="onSubmit">
        <div class="from-control" :class="{invalid : !formData.firstName.isValide}">
            <label for="firstname">Firstname</label>
            <input type="text" name="" id="firstname" v-model.trim="formData.firstName.val" @blur="clearValidaty('firstName')">
            <p v-if="!formData.firstName.isValide">Pleas enter your firstname</p>
        </div>        
        <div class="from-control" :class="{invalid : !formData.lastName.isValide}">
            <label for="lastname">Lastname</label>
            <input type="text" name="" id="lastname" v-model.trim="formData.lastName.val" @blur="clearValidaty('lastName')">
            <p v-if="!formData.lastName.isValide">Pleas enter your lastName</p>
        </div>        
        <div class="from-control" :class="{invalid : !formData.description.isValide}">
            <label for="description">Description</label>
            <textarea   id="description" rows="5" v-model.trim="formData.description.val" @blur="clearValidaty('description')"></textarea>
            <p v-if="!formData.description.isValide">Pleas enter your description</p>
        </div>        
        <div class="from-control" :class="{invalid : !formData.hourlyRate.isValide}">
            <label for="rate">Hourly Rate</label>
            <input  type="number" id="rate"  v-model.number="formData.hourlyRate.val" @blur="clearValidaty('hourlyRate')">
            <p v-if="!formData.hourlyRate.isValide">Pleas enter a valide number</p>
        </div>        
        <div class="from-control" :class="{invalid : !formData.areas.isValide}">
            <h3>Area of Expertise</h3>
            <div>
                <input type="checkbox" id="frontend" value="frontend" v-model="formData.areas.val" @blur="clearValidaty('areas')">
                <label for="frontend">Frontend Development</label>
            </div>           
            <div>
                <input type="checkbox" id="backend" value="backend" v-model="formData.areas.val" @blur="clearValidaty('areas')">
                <label for="backend">Backend Development</label>
            </div>            <div>
                <input type="checkbox" id="career" value="career" v-model="formData.areas.val" @blur="clearValidaty('areas')">
                <label for="career">Career Advisory</label>
            </div>
            <p v-if="!formData.areas.isValide">At least one skill is required</p>
        </div>
        <base-button>Register</base-button>
    </form>
</template>

<script>
export default {
    data(){
        return {
            formData:{
                firstName:{
                    val:'',
                    isValide:true
                },
                lastName:{
                    val:'',
                    isValide:true
                },
                areas:{
                    val:[],
                    isValide:true
                },
                description:{
                    val:'',
                    isValide:true
                },
                hourlyRate:{
                    val:null,
                    isValide:true
                }
            },
            isValideForm:true 
        }
    },
    methods:{
        clearValidaty(input){
            this.formData[input].isValide = true;
        },
        validate(){
            this.isValideForm = true;
            if(this.formData.firstName.val === ''){
                this.formData.firstName.isValide = false;
                this.isValideForm = false;
            }            
            if(this.formData.lastName.val === ''){
                this.formData.lastName.isValide = false;
                this.isValideForm = false;
            }            
            if(this.formData.description.val === ''){
                this.formData.description.isValide = false;
                this.isValideForm = false;
            }             
            if(this.formData.hourlyRate.val <= 0){
                this.formData.hourlyRate.isValide = false;
                this.isValideForm = false;
            }             
            if(this.formData.areas.val.length === 0 ){
                this.formData.areas.isValide = false;
                this.isValideForm = false;
            } 
        },
        onSubmit(){
            this.validate();
            if(!this.isValideForm){
                return;
            }

            const data = {
                id: new Date().toISOString(),
                firstName: this.formData.firstName.val,
                lastName: this.formData.lastName.val,
                areas: this.formData.areas.val,
                description: this.formData.description.val,
                hourlyRate: this.formData.hourlyRate.val
            };

            this.$emit('save-data', data);
        }
    }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>