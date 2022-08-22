<template>
    <div>

        <b-form @submit="onSubmit">
      <b-form-group label="Username:" label-for="username">
        <b-form-input id="username" v-model="form.username" placeholder="Enter username" required></b-form-input>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password" placeholder="Enter password" required></b-form-input>
      </b-form-group>
      <br>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>

    </div>    

</template>

<script>

import { mapActions } from 'vuex';

export default{

    name: 'Login',
    data(){
        return{
            form: {
                username:'',
                password: ''
            }

        }
    },
    methods:{

        ...mapActions([
            'login'
        ]),

        onSubmit(e){
            e.preventDefault();

            this.login(this.form)
            this.form.username = '';
            this.form.password = '';

        }

    }

}

</script>