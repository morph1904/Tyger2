<template>
  <div>
    <v-toolbar color="deep-orange" dark flat>
      <v-toolbar-title>uWSGI Logs</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-badge color="blue-grey darken-4">
        <v-icon large color="white">memory</v-icon>
      </v-badge>
    </v-toolbar>
    <v-card flat class="blue-grey lighten-5">
     <v-data-table
      :headers="headers"
      :items="uwsgilogs"
      :loading="loading"
      class="elevation-1"
    >
<template slot="items" slot-scope="props">
        <td>{{ props.item }}</td>

      </template>
</v-data-table>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
        loading: true,
        headers: [
          {
            text: 'Message',
            align: 'left',
            sortable: true,
            value: 'date'
          },
        ],
    };
    
  },
  computed: {

    ...mapGetters({
      uwsgilogs: 'showuWSGILogs',
    })
  },
  mounted() {
    this.$store.dispatch('getuWSGILogs')
    
    this.loading = false;
    
  },
};
</script>
