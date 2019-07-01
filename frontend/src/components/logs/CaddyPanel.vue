<template>
  <div>
    <v-toolbar color="deep-orange" dark flat>
      <v-toolbar-title>Caddy Logs</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-badge color="blue-grey darken-4">
        <v-icon large color="white">memory</v-icon>
      </v-badge>
    </v-toolbar>
    <v-card flat class="blue-grey lighten-5">
     <v-data-table
      :headers="headers"
      :items="caddylogs"
      :loading="loading"
      :search="search"
      class="elevation-1"
    >
<template slot="items" slot-scope="props">
        <td>{{ props.item.date }}</td>
        <td>{{ props.item.time }}</td>
        <td>{{ props.item.type }}</td>
        <td>{{ props.item.message }}</td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
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
        search: '',
        headers: [
          {
            text: 'Date',
            align: 'left',
            sortable: true,
            value: 'date'
          },
          { text: 'Time', value: 'time' },
          { text: 'Type', value: 'type' },
          { text: 'Message', value: 'message' },
        ],
    };
    
  },
  computed: {

    ...mapGetters({
      caddylogs: 'showCaddyLogs',
    })
  },
  mounted() {
    this.$store.dispatch('getCaddyLogs')
    
    this.loading = false;
    
  },
};
</script>
