<template>
  <div>
    <v-toolbar color="deep-orange" dark flat>
      <v-toolbar-title>Applications</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-badge color="blue-grey darken-4">
        <span slot="badge">{{ appCount }}</span>
        <v-icon large color="white">apps</v-icon>
      </v-badge>
    </v-toolbar>
    <v-card flat class="blue-grey lighten-5">
      <v-card-title primary-title>
        <h2 class="blue-grey--text darken-4">Apps</h2>
        <v-spacer></v-spacer> 
        <v-btn round color="primary" dark @click.stop="AddAppDialog=true"><v-icon>add</v-icon> Add App</v-btn>
      </v-card-title>
<!--EDIT DIALOG-->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Application</span>
          </v-card-title>

          <v-card-text>
            <v-container fluid>
              <v-layout row justify-space-between>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row justify-space-between>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.url" label="URL"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row justify-space-between>
                <v-flex xs12>
                  <v-switch
              color="primary" v-model="editedItem.insecure_skip_verify" label="Skip SSL Verification on Backend?"></v-switch>
                </v-flex>
              </v-layout>
              <v-layout row justify-space-between>
                <v-flex xs12>
                  <v-switch
              color="primary" v-model="editedItem.websocket" label="Enable Websockets?"></v-switch>
                </v-flex>
              </v-layout>
              <v-layout row justify-space-between>
                <v-flex xs12>
                  <v-switch
              color="primary" v-model="editedItem.transparent" label="Transparent Mode?"></v-switch>
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
            <span class="headline">Delete Application</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                Are you sure you want to delete {{ editedItem.name }}?

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
      :items="apps"
      :loading="loading"
      class="elevation-1"
    >
<template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.name }}</td>
        <td><a target="_blank" :href="props.item.url">{{ props.item.url }}</a></td>
        <td>
          
            <v-icon medium v-if="props.item.insecure_skip_verify">check</v-icon>
            <v-icon medium v-else>close</v-icon>
          
        </td>
        <td>
          
          <v-icon medium v-if="props.item.websocket">check</v-icon>
          <v-icon medium v-else>close</v-icon>
          
        </td>
        <td>
          
          <v-icon medium v-if="props.item.transparent">check</v-icon>
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
import { mapState } from 'vuex'

export default {
  data() {
    return {
        loading: true,
        dialog: false,
        AddAppDialog: false,
        deletedialog: false,
        pagination: {},
        headers: [
          {
            text: 'App ID',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Name', value: 'name' },
          { text: 'URL', value: 'url' },
          { text: 'SSL Verify', value: 'insecure_skip_verify' },
          { text: 'Websocket', value: 'websocket' },
          { text: 'Transparent', value: 'transparent' },
          { text: 'Actions', value: 'name', sortable: false }
        ],
        editedItem: {
          id:0,
        name: '',
        url: '',
        insecure_skip_verify: false,
        websocket: false,
        transparent: false
      },
    };
  },
   watch: {
      pagination: {
        handler () {
          this.appList()
        },
        deep: true
      },
       dialog (val) {
        val || this.close()
      },
      deletedialog (val) {
        val || this.deleteclose()
      },
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
        console.log(this.editedItem)
        this.$store.commit('UPDATE_APPS', this.editedItem)
        this.close()
      },

      deleteapp () {
        console.log(this.editedItem)
        this.$store.commit('DELETE_APP', this.editedItem)
        this.deleteclose()
      },
      
    editItem (item) {
        this.editedIndex = this.apps.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
    deleteItem (item) {
      this.editedIndex = this.apps.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.deletedialog = true
    },
  },
  computed: mapState({
     apps: 'apps',
     appCount: 'appCount',
     alert: 'alert',
     alertmessage: 'alertmessage'
    }),
  mounted() {
    this.$store.dispatch('getApps')
    this.loading = false
    this.$eventHub.$on("newProxy", this.appList)
  }
};
</script>
