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
        <v-spacer></v-spacer> 
        <v-btn round color="primary" dark ><v-icon>add</v-icon> Add Address</v-btn>
      </v-card-title>

      <!--EDIT DIALOG-->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Address</span>
          </v-card-title>

          <v-card-text>
            <v-container fluid>
              <v-layout row justify-space-between>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.address" label="Address"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row justify-space-between>
                <v-flex xs12>
                  <v-switch
              color="primary" v-model="editedItem.tls" label="TLS"></v-switch>
                </v-flex>
              </v-layout>
              <v-layout row justify-space-between>
                <v-flex xs12>
                  <v-switch
              color="primary" v-model="editedItem.staging" label="Staging?"></v-switch>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
<!--DELETE DIALOG-->
      <v-dialog v-model="deletedialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Delete Address</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                Are you sure you want to delete {{ editedItem.URL }}?

                This will also delete any associated addresses.....
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="deleteclose">Cancel</v-btn>
            <v-btn color="error darken-1" flat @click="deleteapp">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-data-table
      :headers="headers"
      :items="addresses"
      :loading="loading"
      class="elevation-1"
    >
<template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td><a target="_blank" :href="props.item.address">{{ props.item.address }}</a></td>
        <td>
          <v-icon medium v-if="props.item.tls">check</v-icon>
          <v-icon medium v-else>close</v-icon>
        </td>
        <td>
          <v-icon medium v-if="props.item.staging">check</v-icon>
          <v-icon medium v-else>close</v-icon>
        </td>
        <td>{{ props.item.app }}</td>
        <td>{{ props.item.provider }}</td>
        <td>
          <v-icon medium v-if="props.item.dns_challenge">check</v-icon>
          <v-icon medium v-else>close</v-icon>
        </td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
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
        dialog: false,
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
          { text: 'Provider', value: 'provider' },
          { text: 'DNS Verification', value: 'dns_challenge' },
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
    close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      deleteclose (){
        this.deletedialog = false
                setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        console.log(this.editedItem)
        this.$store.commit('UPDATE_ADDRESS', this.editedItem)
        this.close()
      },

      deleteapp () {
        console.log(this.editedItem)
        this.$store.commit('DELETE_ADDRESS', this.editedItem)
        this.deleteclose()
      },
      
    editItem (item) {
        this.editedIndex = this.addresses.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
    deleteItem (item) {
      this.editedIndex = this.addresses.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.deletedialog = true
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
