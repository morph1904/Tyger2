<template>
  <div>
    <AddAddress v-model="addAddressForm"/>
    <AddressDelete v-model="deletedialog" :item="deleteid"/>
    <AddressEdit v-model="editdialog" :item="editedItem"/>
    <AddressDetail v-model="detaildialog" :item="editedItem"/>>

    <v-toolbar color="deep-orange" dark flat>
      <v-toolbar-title>Addresses</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-badge color="blue-grey darken-4">
        <span slot="badge">{{ addressCount }}</span>
        <v-icon large color="white">domain</v-icon>
      </v-badge>
    </v-toolbar>
    <v-card flat class="blue-grey lighten-5">
      <v-card-title primary-title>
        <h2 class="blue-grey--text darken-4">Addresses</h2> 
        <v-spacer></v-spacer> 
        <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
        <v-btn round color="primary" dark @click.stop="addAddressForm=true"><v-icon>add</v-icon> Add Address</v-btn>
      </v-card-title>
      <v-data-table
      :headers="headers"
      :items="addresses"
      :loading="loading"
      :search="search"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      class="elevation-1"
    >
<template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td><v-btn round small color="primary" dark @click.stop="detailItem(props.item)">{{ props.item.address }}</v-btn></td>
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
import AddAddress from "@/components/forms/AddAddress";
import AddressDelete from "@/components/Addresses/AddressDelete";
import AddressEdit from "@/components/Addresses/AddressEdit";
import AddressDetail from "@/components/Addresses/AddressDetail";

export default {
  data() {
    return {
      rowsPerPageItems: [10, 20, 30, 40, 50, 100],
      pagination: {
        rowsPerPage: 30
      },
      addAddressForm: false,
      deletedialog: false,
      detaildialog: false,
      deleteid: {},
      editdialog: false,
        loading: true,
        search: '',
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
    AddressEdit,
    AddressDetail
  },
  methods: {
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
        this.$store.commit('UPDATE_ADDRESS', this.editedItem)
        this.close()
      },

      deleteadd () {
        this.$store.commit('DELETE_ADDRESS', this.editedItem)
        this.deleteclose()
      },
      
    editItem (item) {
        this.editedIndex = this.addresses.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.editdialog = true
      },
    detailItem (item) {
        this.editedIndex = this.addresses.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.detaildialog = true
      },
    deleteItem (item) {
      this.deleteid = this.editedItem = Object.assign({}, item);
      this.deletedialog = true;
    },
  },
  computed: {

    ...mapGetters({
      addresses: 'showAddresses', 
      addressCount: 'showAddressCount',
      apps: 'showApps',
    })
  },

  mounted() {
    this.$store.dispatch('getAddresses')
    this.$store.dispatch('getDNS')
    
    this.loading = false;
    
  },
};
</script>
