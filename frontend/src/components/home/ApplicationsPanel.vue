<template>
  <div>
    <v-toolbar color="deep-orange" dark flat>
      <v-toolbar-title>Applications</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-badge color="blue-grey darken-4">
        <span slot="badge">{{ stats.appCount }}</span>
        <v-icon large color="white">apps</v-icon>
      </v-badge>
    </v-toolbar>
    <v-card flat class="blue-grey lighten-5">
      <v-card-title primary-title>
        <h2 class="blue-grey--text darken-4">Apps</h2>
      </v-card-title>

      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Application</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.url" label="URL"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-switch
              color="primary" v-model="editedItem.insecure_skip_verify" label="Skip SSL Verification on Backend?"></v-switch>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-switch
              color="primary" v-model="editedItem.websocket" label="Enable Websockets?"></v-switch>
                </v-flex>
                <v-flex xs12 sm6 md4>
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
        <td>{{ props.item.insecure_skip_verify }}</td>
        <td>{{ props.item.websocket }}</td>
        <td>{{ props.item.transparent }}</td>
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
export default {
  data() {
    return {
      stats: {
        appCount: null
      },
      apps: [],
        loading: true,
        dialog: false,
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
      }
    },
  methods: {
          close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        console.log(this.editedItem)
        this.close()
      },
     emitAlert(type, message) {
      const data = {
        type: type,
        message: message
      };
      this.$eventHub.$emit("new-alert", data);
    },

    appList(){
      this.$http.get("apps/").then(({ data }) => {
        if (data){
          this.apps = data.results;
          this.stats.appCount = data.count;
          this.loading = false
        }
       
      })
      .catch(() =>{
        this.emitAlert("error", "Could not communicate with the backend!");
      })
    },
     editItem (item) {
        this.editedIndex = this.apps.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
  },
  mounted() {
    this.appList();
    this.$eventHub.$on("newProxy", this.appList)
  }
};
</script>
