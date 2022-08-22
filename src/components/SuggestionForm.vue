<template>
  <div>
          <h2>Create a suggestion</h2>

            <div v-if="token">
              <div class="form-group row">
                        <div class="col-6">
                          <label for="ex1">Name</label>
                          <input class="form-control" id="cr1" v-model="suggestion.name" type="text" required>
                        </div>
                        <div class="col-6">
                          <label for="ex2">Location</label>
                          <input class="form-control" id="cr2" v-model="suggestion.location" type="text" required>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-6">
                            <label for="ex3">Purpose</label>
                            <textarea class="form-control" id="cr3" name="purpose" v-model="suggestion.purpose" rows="5" required></textarea>
                        </div>
                        <div class="col-6">
                            <label for="ex3">Role</label>
                            <textarea class="form-control" id="cr4" name="role" v-model="suggestion.role" rows="5" required></textarea>
                        </div>
                    </div>
                    <div class ="form-group row">
                        <div class ="col-6">
                        <label for="ex3">Description</label>
                        <textarea class="form-control" id="cr5" name="description" v-model="suggestion.description" rows="4" required></textarea>
                        </div>
                        <div class ="col-4">
                            <div id="tekst" class="form-text">All fields must be filled in</div>
                            <button type="button" @click="submit" class="btn btn-primary" id="btn1">Create</button>
                        </div>
                    </div>

            </div>
            <p v-else>You must be signed in to create a suggestion</p>

  </div>
</template>

<script>

import { mapActions,mapState } from 'vuex';

  export default {
    name: 'SuggestionForm',
    data(){

      return{
        suggestion:{
            name: '',
            location: '',
            purpose: '',
            role: '',
            description: ''
        }
      }

    },
    computed:{
      ...mapState([
        'token'     
      ])
    },
    methods:{
      ...mapActions([
        'postSuggestion'
      ]),

      submit(e){

        e.preventDefault();

        this.$socket.emit('suggestion',{suggestion:this.suggestion,token:this.token});
        this.suggestion.name = '';
        this.suggestion.location = '';
        this.suggestion.purpose = '';
        this.suggestion.role = '';
        this.suggestion.description = '';

      }
    }
    
  }

</script>

<style scoped>
</style>