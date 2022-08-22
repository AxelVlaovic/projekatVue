<template>
  <div>

    <b-card v-for="suggestion in suggestions" :key="suggestion.id" :title="suggestion.name" :sub-title="suggestion.role">
    <b-card-text>
        Description: {{suggestion.description}}
    </b-card-text>
    <b-card-text>
        Location: {{suggestion.location}}
    </b-card-text>
    <b-card-text>
        Purpose: {{suggestion.purpose}}
    </b-card-text>
    <b-card-text>
        Created by: {{suggestion.user.username}}
    </b-card-text>

  </b-card>

  </div>
</template>

<script>
    
    import { mapState } from 'vuex';
    

  export default {
    name: 'SuggestionsList',
    computed:{
        ...mapState([
            'suggestions'
        ])
    }

  }

</script>

<style scoped>
</style>