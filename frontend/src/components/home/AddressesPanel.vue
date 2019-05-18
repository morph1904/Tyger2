<template>
  <div>
    <AddAddress v-model="addAddressForm"/>
    <AddressDelete v-model="deletedialog" :item="deleteid"/>
    <AddressEdit v-model="editdialog" :item="editedItem"/>
    <v-toolbar color="deep-orange" dark flat>
      <v-toolbar-title>Addresses</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn round color="accent" dark @click.stop="addAddressForm=true">Add Address</v-btn>
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
        <td><a target="_blank" :href="props.item.app">{{ props.item.app }}</a></td>
        <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          </td>
      </template>
</v-data-table>
    </v-card>
  </div>
</template>
<script>
import AddAddress from "@/components/forms/AddAddress";
import AddressDelete from "@/components/Addresses/AddressDelete";
import AddressEdit from "@/components/Addresses/AddressEdit";
export default {
  data() {
    return {
      stats: {
        addressCount: null
      },
      addresses: [],
      addAddressForm: false,
      deletedialog: false,
      deleteid: {},
      editdialog: false,
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
        ],
        editedItem: {
        id: 0,
        address: "",
        tls: "",
        staging: false,
        websocket: false,
        transparent: false
      }
    };
    
  },
  components:{
    AddAddress,
    AddressDelete,
    AddressEdit
  },

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
        this.$store.dispatch("getAdds");
    this.loading = false;
  },
  created() {
    this.addressList();
  }
};
</script>
