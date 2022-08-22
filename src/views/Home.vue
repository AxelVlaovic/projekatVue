<template>
  <div id="app">
    <Header />
    <img
      src="https://svdpli.org/wp-content/uploads/2022/04/iStock-1303107115-1-1-1024x683.jpg"
      width="600"
      alt="Logo"
    />
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  import { mapActions,mapState } from 'vuex';

  export default {
    name: 'Home',
    
    components: {
      Header
    },
    computed:{
      ...mapState([
        'token','flag'
      ])
    },
    methods:{
      ...mapActions([
        'fetchUserRelations','fetchRelations'
      ])

    },
    mounted(){

      if(this.token && !this.flag){
      this.fetchRelations();
      this.fetchUserRelations();
    }

    }

  }
</script>
