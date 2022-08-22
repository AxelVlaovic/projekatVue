import router from '@/router'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activities : [],
    suggestions: [],
    userRelations: [],
    token: '',
    flag: false
  }
  ,mutations: {

    addActivities(state,activities){
      state.activities = activities
    },

    addActivity(state,activity){
      state.activities.push(activity)
    },

    addSuggestions(state,suggestions){
      state.suggestions = suggestions
    },

    pushSuggestion(state,suggestion){
      state.suggestions.push(suggestion);
    },

    setUserRelations(state,relations){
       state.userRelations = relations;
    },

    addUserRelation(state,relation){
      state.userRelations.push(relation);
    },

    setFlag(state){
      state.flag = true;
    },

    addRelation(state,object){

        const entity = state.activities.filter( item => item.id == object.id)[0];

        var index = state.activities.indexOf(entity);

        if(index>-1){
          state.activities[index]['relations'].push(object.relation);
          }

    },

    removeRelation(state,obj){

      const entity = state.activities.filter( item => item.id == obj.id)[0];

      var indexActivity = state.activities.indexOf(entity);

      const relation = state.activities[indexActivity]['relations'].filter( item => item.id == obj.relation.id)[0];

      var indexRelation =  state.activities[indexActivity]['relations'].indexOf(relation);

      if(indexRelation>-1){
        state.activities[indexActivity]['relations'].splice(indexRelation,1);
        }

    },

    removeUserRelation(state,relation){

      const entity = state.userRelations.filter( item => item.activityId == relation.activityId)[0];

      var index = state.userRelations.indexOf(entity);

      if(index>-1){
      state.userRelations.splice(index,1);
      }

    },

    setToken(state,token){
      state.token = token;
      localStorage.token = token;
      router.push({name: 'Home'});
    },

    removeToken(state){
      state.token = '';
      localStorage.token = '';
      state.userRelations = [];
      state.relations = [];
      state.flag = false;
    },

  },
  actions: {

    fetchActivities({ commit }){
      fetch('https://volonterskiapi.herokuapp.com/api/activities')
        .then(res => res.json())
        .then(activities => {commit('addActivities',activities)
      });

    },

    getActivityByID({ commit,state},id){

      return new Promise((resolve,reject)=> {

        const activity = state.activities.filter(act => act.id == id)[0];

        if(activity){
          resolve(activity);
        }else{
          fetch('https://volonterskiapi.herokuapp.com/api/activities/' + id)
            .then(obj => obj.json())
            .then(res => {
              commit('addActivity',res);
              resolve(res);
            })
        }

      })

    },

    fetchSuggestions({commit}){
      fetch('https://volonterskiapi.herokuapp.com/api/user_suggestions')
        .then(obj => obj.json())
        .then(suggestions => commit('addSuggestions',suggestions))
    },

    postSuggestion({commit,state},suggestion){

      fetch('https://volonterskiapi.herokuapp.com/api/user_suggestions',{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${state.token}`
        },
        body: JSON.stringify(suggestion),
      }).then(obj => obj.json())
        .then(resp => {

          if(resp!=null){
             commit('pushSuggestion',resp);            
          }else{
            alert('Invalid credentials');
          }

        })

    },

    fetchRelations({commit,state}){

        fetch('https://volonterskiapi.herokuapp.com/api/relations_api',{
          headers: { 'Authorization' : `Bearer: ${state.token}`}
        })
          .then(obj => obj.json())
          .then(res => {

              state.activities.forEach(activity => {

                activity['relations'] = [];

                res.forEach(relation => {

                  if(activity.id == relation.activityId){
                    activity['relations'].push(relation);
                  }

                })

              })

          })


    },

    fetchSingleRelation({commit,state},id){

      return new Promise((resolve,reject)=>{

        fetch('https://volonterskiapi.herokuapp.com/api//relations_activity_single/' + id,{
        headers: { 'Authorization' : `Bearer ${state.token}`}
      })
        .then(obj => obj.json())
        .then(res => {
           resolve(res);             
        })

      })

    },

    postSingleRelation({commit,state},id){

      return new Promise((resolve,reject)=>{

        fetch('https://volonterskiapi.herokuapp.com/api//relations_activity_post/' + id,{
          method: 'POST',
        headers: { 'Authorization' : `Bearer ${state.token}`}
      })
        .then(obj => obj.json())
        .then(res => {

           commit('addUserRelation',res);
           commit('addRelation',{relation: res , id: id});
           resolve(res);             
        })

      })

    },

    deleteSingleRelation({commit,state},id){

      return new Promise((resolve,reject)=>{

        fetch('https://volonterskiapi.herokuapp.com/api/users_activities_single/' + id,{
          method: 'DELETE',
        headers: { 'Authorization' : `Bearer ${state.token}`}
      })
        .then(obj => obj.json())
        .then(res => {
            commit('removeRelation',{relation: res, id: id});
            commit('removeUserRelation',res);
            resolve(res);             
        })

      })

    },

    fetchUserRelations({commit,state}){

      fetch('https://volonterskiapi.herokuapp.com/api/user_relations_api',{
        headers: {'Authorization' : `Bearer ${state.token}` }
      })
        .then(obj => obj.json())
        .then(res => {
           commit('setFlag');
           if(res!=null){
           commit('setUserRelations',res);
           }
        })

    },

    login({commit},form){

      fetch('https://volonterskiauth.herokuapp.com/login',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
        .then(obj => obj.json())
        .then(res => {

          if(res.msg){
            alert(res.msg);
          }else{
            commit('setToken',res.token);
          }

        });
    },

    register({commit},form){

      fetch('https://volonterskiauth.herokuapp.com/register',{
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(form)
      })
        .then(obj=> obj.json())
        .then(res => {

          if(res.msg){
            alert(res.msg);
          }else{
            commit('setToken',res.token);
          }

        });

    },

    socket_suggestion({commit},suggestion){
      const obj = JSON.parse(suggestion)
      commit('pushSuggestion',obj);
    }

  }
  
})
