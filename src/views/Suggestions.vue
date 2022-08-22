<template>
  <div id="app">
    <Header subtitle="User suggestions" />
    <SuggestionsList />
    <SuggestionForm />
    
    <!-- Provjerićemo token,i ako je korisnik ulogovan napravićemo mu formu za unos podataka-->
    <!-- Radimo prikaz suggestionsa-->

  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  import SuggestionsList from '@/components/SuggestionsList.vue'
  import SuggestionForm from '@/components/SuggestionForm.vue'
  import { mapActions } from 'vuex';

  export default {
    name: 'Suggestions',
    
    components: {
      Header,SuggestionsList,SuggestionForm
    },
    methods:{
     ...mapActions([
        'fetchSuggestions'
     ])

    },mounted(){
        this.fetchSuggestions();
    }
  }
</script>
