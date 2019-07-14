<template>
<div>
  <AddressEditEndpoint v-model="editEndpointShow" :item="endpoint" />
  <AddressDeleteEndpoint v-model="deleteEndpointShow" :item="endpoint" />
    <v-dialog v-model="detailshow" max-width="700px">

     <v-card>
          <v-card-title class="primary" dark flat>
            <span class="headline white--text">Address Detail</span>
          </v-card-title>

          <v-card-text>
            <v-container fluid>
              <h3>Address Detail: </h3>
              <v-layout row justify-space-between>
               Address: {{item.address}}
              </v-layout>
              <v-layout row justify-space-between>
                Uses TLS: {{item.tls}}
              </v-layout>
              <v-layout row justify-space-between>
                Uses TLS Staging: {{item.staging}}
              </v-layout>
              <v-layout row justify-space-between>
                Proxies to: {{item.app}}
              </v-layout>
              <v-layout row justify-space-between>
                DNS Provider: {{item.provider}}
              </v-layout>
              <v-layout row justify-space-between>
                Uses DNS Challenge: {{item.dns_challenge}}
              </v-layout>
            </v-container>
          </v-card-text>
          <v-container fluid>
<v-layout>
<h3>Endpoints:</h3>
          </v-layout>

<v-data-table
      :headers="headers"
      :items="endpoints"
      :loading="loading"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      class="elevation-1"
    >
<template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.endpoint }}</td>
        <td>
          <a @click="detailItem(props.item)"> {{props.item.address}} </a>
        <td>{{ props.item.proxy_to }}</td>
        <td class="justify-center layout px-0">
            <v-tooltip top> 
              <v-btn icon class="mr-0" color="primary" @click="editEndpoint(props.item)" slot="activator"> 
                <v-icon>edit</v-icon> 
              </v-btn> 
              <span>Edit Endpoint</span> 
            </v-tooltip>
            <v-tooltip top> 
              <v-btn icon class="mr-0" color="primary" @click="deleteEndpoint(props.item)" slot="activator"> 
                <v-icon>delete</v-icon> 
              </v-btn> 
              <span>Delete Endpoint</span> 
            </v-tooltip>
        </td>
      </template>
</v-data-table>
          </v-container>
          
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="accent" flat @click="close">Close</v-btn>
           <!-- <v-btn color="primary" flat @click="save">Save</v-btn> -->
          </v-card-actions>
        </v-card>
</v-dialog>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddressEditEndpoint from "@/components/Addresses/AddressEditEndpoint"
import AddressDeleteEndpoint from "@/components/Addresses/AddressDeleteEndpoint"

export default {
  components:{
    AddressEditEndpoint,
    AddressDeleteEndpoint
  },
 data() {
    return {
      editEndpointShow: false,
      deleteEndpointShow: false,
      rowsPerPageItems: [10, 20, 30, 40, 50, 100],
      pagination: {
        rowsPerPage: 30
      },
      headers: [
          {
            text: 'Endpoint ID',
            align: 'left',
            value: 'id'
          },
          { text: 'Endpoint', value: 'endpoint' },
          { text: 'Address', value: 'address' },
          { text: 'Proxy To', value: 'proxy_to' },
          { text: 'Actions', value: 'name', sortable: false }
        ],
         loading: false,
         endpoint: {
        id: 0,
        address: "",
        endpoint: "",
        proxy_to: "",
        addrid:0
      }
    }
 },
    props: {
    value: Boolean,
    item: Object
  },
   model: {
        prop: 'value',
        event: 'showhide'
    },
  computed: {
    detailshow: {
      get: function() {
        return this.value;
      },
      set: function(value) {
        this.$emit("showhide", value);
      },
    },
    ...mapGetters({
      providers: 'showDNS',
      apps:'showApps',
      endpoints:'showEndpoints'
    })
      
    
  },
     methods: {
          close (){
            this.detailshow = false
          },
          editEndpoint (endpoint) {
            let addrid = this.item.id
            this.endpoint = Object.assign({}, endpoint)
            this.endpoint.addrid = addrid
            this.editEndpointShow = true
          },
          deleteEndpoint (endpoint) {
            let addrid = this.item.id
            this.endpoint = Object.assign({}, endpoint)
            this.endpoint.addrid = addrid
            this.deleteEndpointShow = true
          }
     },
}

</script>