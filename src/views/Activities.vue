<template>
  <div id="app">
    <Header subtitle="Activities" />
    <ActivitiesList />
    
  </div>
</template>

<script>

  import Header from '@/components/Header.vue';
  import ActivitiesList from '@/components/ActivitiesList.vue'

  export default {
    name: 'Activities',
    
    components: {
      Header,ActivitiesList
    },
    methods: {
        
    },

  }

</script>

<style scoped>

</style>