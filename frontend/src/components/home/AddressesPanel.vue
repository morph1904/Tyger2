<template>
  <div>
    <AddAddress v-model="addAddressForm"/>
    <AddressDelete v-model="deletedialog" :item="deleteid"/>
    <AddressEdit v-model="editdialog" :item="editedItem"/>
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
        <v-btn round color="primary" dark @click.stop="addAddressForm=true"><v-icon>add</v-icon> Add Address</v-btn>
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
import { mapState } from "vuex";
import { mapGetters,  mapActions} from 'vuex'
import AddAddress from "@/components/forms/AddAddress";
import AddressDelete from "@/components/Addresses/AddressDelete";
import AddressEdit from "@/components/Addresses/AddressEdit";
export default {
  data() {
    return {

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
    ...mapActions(['getAddresses']),
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

      deleteadd () {
        console.log(this.editedItem)
        this.$store.commit('DELETE_ADDRESS', this.editedItem)
        this.deleteclose()
      },
      
    editItem (item) {
        this.editedIndex = this.addresses.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.editdialog = true
      },
    deleteItem (item) {
      this.deleteid = this.editedItem = Object.assign({}, item);
      this.deletedialog = true;
    },
  },
  computed: mapState({
    addresses: "addresses",
    addressCount: "addressCount",
    alert: "alert",
    alertmessage: "alertmessage"
  }),

  mounted() {
     this['getAddresses']();
    //this.$store.dispatch('main/getAddresses', null, {root:true})
    //this.$store.modules.main.dispatch('getAddresses')
    this.loading = false;
  },
};
</script>
