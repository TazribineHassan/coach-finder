<template>
    <div>
        <base-dialog :show="!!error" title="Error" @close="exitModal">
            <p> {{ error }} </p>
        </base-dialog>
        <base-dialog :show="isLoading" title="Authenticating..." fixed>
            <base-spinner></base-spinner>
        </base-dialog>
        <base-card>
            <form @submit.prevent="onSubmit">
                <div class="form-control" :class="{invalid : !user.email.isValid}">
                    <label for="email">E-mail</label>
                    <input type="email" name="" id="email"  v-model.trim="user.email.val" @blur="clearValidate('email')">
                    <p v-if="!user.email.isValid">Please enter a valid email</p>
                </div>         
                <div class="form-control" :class="{invalid : !user.email.isValid}">
                    <label for="password">Password</label>
                    <input type="password" name="" id="password"  v-model.trim="user.password.val" @blur="clearValidate('password')">
                    <p v-if="!user.password.isValid">Please enter your password( at least 6 chars ).</p>
                </div>
                <base-button> {{ submitButtonCaption }} </base-button>
                <base-button type="button" mode="flat" @click="switchMode"> {{ submitModeButtonCaption }} </base-button>
            </form>
        </base-card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            isValideForm: true,
            mode: 'login',
            error: null,
            isLoading: false,
            user:{
                email:{
                    val:'',
                    isValid:true
                },                
                password:{
                    val:'',
                    isValid:true
                },
            }
        }
    },
    methods:{
        clearValidate(input){
            this.user[input].isValid = true;
        },
        validate(){
            this.isValideForm = true;
            if(this.user.email.val === ''){
                this.user.email.isValid = false;
                this.isValideForm = false;
            }            
            if(this.user.password.val === '' || this.user.password.val.length < 6){
                this.user.password.isValid = false;
                this.isValideForm = false;
            }
        },
        async onSubmit(){
            this.validate();
            if(!this.isValideForm){
                return;
            }
            // login or signup
            this.isLoading = true;
            try {
                if(this.mode === 'login'){
                    await this.$store.dispatch('auth', {
                        email: this.user.email.val,
                        password: this.user.password.val,
                        mode:'login'
                    });
                }else{
                    await this.$store.dispatch('auth', {
                        email: this.user.email.val,
                        password: this.user.password.val,
                        mode:'signup'
                    });
                }
                const url = '/' + (this.$route.query.redirect || 'coaches');
                this.$router.replace(url); 
            } catch (err) {
                this.error = err.message || 'An error occured please check your email or password';
            }
            this.isLoading = false;
        },
        switchMode(){
            if(this.mode === 'login'){
                this.mode='signup';
            }else{
                this.mode='login';
            }
        },
        exitModal(){
            this.error = null;
        }
    },
    computed:{
        submitButtonCaption(){
            if(this.mode === 'login'){
                return 'Login';
            }else{
                return 'SignUp?';
            }
        },        
        submitModeButtonCaption(){
            if(this.mode === 'login'){
                return 'SignUp?';
            }else{
                return 'Login';
            }
        },
    }
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>