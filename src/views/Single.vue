<template>
  <div>
    <Header v-if="activity" :subtitle="name" />
    <Activity v-if="activity" :activity="activity" />

  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Activity from '@/components/Activity.vue'
import { mapActions,mapState } from 'vuex';
    
export default{
    name: 'Single',
    components:{
        Header,Activity
    },
    data(){
        return {
            activity: null,
            name : ''
        }


    },
    methods:{
        ...mapActions([
            'getActivityByID'
        ])
    },
    mounted(){
        this.getActivityByID(this.$route.params.id)
            .then(res => {
                this.activity = res;
                this.name = res.name;
            })

    }

}


</script>