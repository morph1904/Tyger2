<template>
  <div>
    <AddApp v-model="addAppForm"/>
    <AppsDelete v-model="deletedialog" :item="deleteid"/>
    <AppsEdit v-model="editdialog" :item="editedItem"/>
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
        <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
        <v-btn round color="primary" dark @click.stop="addAppForm=true"><v-icon>add</v-icon> Add App</v-btn>
      </v-card-title>

      <v-data-table 
        :headers="headers" 
        :items="apps" 
        :loading="loading" 
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
        class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.name }}</td>
          <td>
            <a target="_blank" :href="props.item.url">{{ props.item.url }}</a>
          </td>
          <td><v-icon medium v-if="props.item.insecure_skip_verify">check</v-icon>
          <v-icon medium v-else>close</v-icon></td>
          <td><v-icon medium v-if="props.item.websocket">check</v-icon>
          <v-icon medium v-else>close</v-icon></td>
          <td><v-icon medium v-if="props.item.transparent">check</v-icon>
          <v-icon medium v-else>close</v-icon></td>
          <td class="justify-center layout px-0">
            <v-tooltip top> 
              <v-btn icon class="mr-0" color="primary" @click="editItem(props.item)" slot="activator"> 
                <v-icon>edit</v-icon> 
              </v-btn> 
              <span>Edit App</span> 
            </v-tooltip>
            <v-tooltip top> 
              <v-btn icon class="mr-0" color="primary" @click="deleteItem(props.item)" slot="activator"> 
                <v-icon>delete</v-icon> 
              </v-btn> 
              <span>Delete App</span> 
            </v-tooltip>
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
import { mapGetters } from "vuex";
import AppsDelete from "@/components/Apps/AppsDelete";
import AppsEdit from "@/components/Apps/AppsEdit";
import AddApp from "@/components/forms/AddApp";
export default {
  data() {
    return {
      rowsPerPageItems: [10, 20, 30, 40, 50, 100],
      pagination: {
        rowsPerPage: 30
      },
      loading: true,
      addAppForm: false,
      deletedialog: false,
      deleteid: {},
      editdialog: false,
      search: '',
      headers: [
        {
          text: "App ID",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Name", value: "name" },
        { text: "URL", value: "url" },
        { text: "SSL Verify", value: "insecure_skip_verify" },
        { text: "Websocket", value: "websocket" },
        { text: "Transparent", value: "transparent" },
        { text: "Actions", value: "name", sortable: false }
      ],
      editedItem: {
        id: 0,
        name: "",
        url: "",
        insecure_skip_verify: false,
        websocket: false,
        transparent: false
      }
    };
  },
  components: {
    AddApp,
    AppsDelete,
    AppsEdit
  },
  watch: {
    editdialog(val) {
      val || this.close();
    },
    deletedialog(val) {
      val || this.deleteclose();
    }
  },
  methods: {
    close() {
      this.editdialog = false;
    },

    deleteclose() {
      this.deletedialog = false;
    },
    editItem(item) {
      this.editedIndex = this.apps.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editdialog = true;
    },
    deleteItem(item) {
      this.deleteid = this.editedItem = Object.assign({}, item);
      this.deletedialog = true;
    }
  },
  computed: {
    ...mapGetters({
      apps: 'showApps', 
      appCount: 'showAppCount'
    })
  },
  mounted() {
    this.$store.dispatch("getApps");
    this.loading = false;
  }
};
</script>
