<template>
  <div class="naslov">
    <h1>Volunteer Service</h1>
    <h2 v-if="subtitle">{{ subtitle }}</h2>
  </div>
</template>

<script>

  export default {
    name: 'Header',
    
    props: {
      subtitle: String
    }
  }

</script>

<style scoped>
  .naslov {
    padding-top: 15px;
    margin-bottom: 25px;
  }
</style>