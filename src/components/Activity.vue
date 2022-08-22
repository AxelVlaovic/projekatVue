<template>
  <div>
    
    <p>Organisation: {{activity.organisation}}</p>
    <p>Date: {{activity.date}}</p>
    <p>Time: {{activity.time}}</p>
    <p>Location: {{activity.location}}</p>
    <p>Description: {{activity.description}}</p>
    <br>

    <div v-if="token">
    <div v-if="relation">
    <p>Prijavljeni ste na ovu aktivnost</p>
    <b-icon icon="check-square" variant="success" scale="2"></b-icon>
    <br>
    <br>
    <p>
    <b-button type="submit" @click="signOut" variant="primary">Odjavi se</b-button>
    </p>
    </div>
    <div v-else>
    <p >Niste prijavljeni na ovu aktivnost</p>
    <b-icon  icon="x-circle" variant="danger" scale="2"></b-icon>
    <br>
    <br>
    <p>
    <b-button type="submit" variant="primary" @click="signIn" >Prijavi se</b-button>
    </p>
    </div>

    <h3>Prijavljeni korisnici: </h3>

    <ul v-if="activities[id]['relations'].length!=0">
        <li v-for="user in activities[id]['relations']" :key="user.id">{{user.users.username}}</li>
    </ul>

    </div>

  </div>
</template>

<script>

import { mapState,mapActions,mapGetters } from 'vuex';

  export default {
    name: 'Activity',

    props: {
      activity: Object
    },
    computed:{
      ...mapState([  
        'token','userRelations','activities'
     ]),
     id: function(){

        const activity = this.activities.filter( item => item.id == this.$route.params.id )[0];

        var index = this.activities.indexOf(activity);

       return index;

     }

    },
    data(){
      return{
        relation : false
      }
    },
    methods:{
      ...mapActions([
        'fetchSingleRelation','postSingleRelation','deleteSingleRelation'
      ]),

      signIn(){
        this.postSingleRelation(this.$route.params.id)
        .then(res => {
            
            if(res.length==0){
              this.relation = false;
            }else{
              this.relation = true;
            }

          })        
          
      },

      signOut(){
        this.deleteSingleRelation(this.$route.params.id)
        .then(res => {
            
            if(res){
              this.relation = false;
            }else{
              this.relation = true;
            }

          }) 
          
      }

    },
    mounted(){

      if(this.token){

        const relation = this.userRelations.filter( item => item.activityId == this.$route.params.id )[0];

                if(relation){
                  this.relation = relation;
                }else{
                  this.relation = false;
                }

      }

    }

  }

</script>

<style scoped>
</style>