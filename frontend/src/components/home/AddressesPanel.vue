<template>
  <div>
    <v-toolbar color="deep-orange" dark flat>
      <v-toolbar-title>Addresses</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-badge color="blue-grey darken-4">
        <span slot="badge">{{ stats.addressCount }}</span>
        <v-icon large color="white">domain</v-icon>
      </v-badge>
    </v-toolbar>
    <v-card flat class="blue-grey lighten-5">
      <v-card-title primary-title>
        <h2 class="blue-grey--text darken-4">Addresses</h2>
      </v-card-title>
      <v-data-table
      :headers="headers"
      :items="addresses"
      :loading="loading"
      class="elevation-1"
    >
<template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td><a target="_blank" :href="props.item.address">{{ props.item.address }}</a></td>
        <td>{{ props.item.tls }}</td>
        <td>{{ props.item.staging }}</td>
        <td>{{ props.item.app }}</td>
      </template>
</v-data-table>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stats: {
        addressCount: null
      },
      addresses: [],
        loading: true,
        pagination: {},
        headers: [
          {
            text: 'Address ID',
            align: 'left',
            sortable: false,
            value: 'id'
          },
          { text: 'URL', value: 'address' },
          { text: 'TLS', value: 'tls' },
          { text: 'Staging', value: 'staging' },
          { text: 'Application', value: 'app' },
          { text: 'Actions', value: 'name', sortable: false }
        ]
    };
  },
  //watch:{
   // addresses: function(){
   //   this.addressList()
  //  }
  //},
  methods: {
        addressList(){
      this.$http.get("addresses/").then(({ data }) => {
        if (data){
          this.addresses = data.results;
          this.stats.addressCount = data.count
          this.loading = false
        }
       
      })
      .catch(() =>{
        this.emitAlert("error", "Could not communicate with the backend!");
      })
    },
    
  },
  mounted() {
    this.$eventHub.$on("newProxy", this.addressList);
  },
  created() {
    this.addressList();
  }
};
</script>
