<template>
  <div>

    <b-pagination
      v-model="currentPage"
      :total-rows="activities.length"
      :per-page="perPage"
      aria-controls="activities-table"
    ></b-pagination>
    <b-table
      id="activities-table"
      hover
      fixed
      :items="activities"
      :fields="fields"
      small
      :per-page="perPage"
      :current-page="currentPage"
      @row-clicked="rowClicked"
    >
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="activities.length"
      :per-page="perPage"
      aria-controls="activities-table"
    ></b-pagination> 
  </div>
</template>

<script>

  import { mapState } from 'vuex';

  export default {
    name: 'ActivitiesList',

    data() {
      return {
        fields: ['name', 'organisation', 'date', 'location'],
        currentPage: 1,
        perPage: 5
      }
    },

    computed: {
      ...mapState([
            'activities'
        ])
    },
    methods: {
      rowClicked(record,index){
        this.$router.push({name: 'Single',params:{id: record.id}})
      }
    }
  }

</script>

<style scoped>
  .pagination {
    justify-content: center;
  }
</style>