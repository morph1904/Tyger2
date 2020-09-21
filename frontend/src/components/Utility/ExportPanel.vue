<template>
  <div>
    <v-toolbar color="deep-orange" dark flat>
      <v-toolbar-title>Export</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card flat class="blue-grey lighten-5">
      <v-card-title primary-title>
        <h2 class="blue-grey--text darken-4">Export</h2> 
        <v-spacer></v-spacer> 
      </v-card-title>
        <v-container>
        <p>Use this button to export and download a JSON representation of your Tyger2 Environment. This can then be used in TygerCaddy, to quickly update your configuration.</p>

        <v-btn @click="downloadExport()" color="primary" >Download Export</v-btn>
        </v-container>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {

    };
    
  },
  components:{

  },
  methods: {
    downloadExport () {
      console.log("Export Clicked")
    }
  },

  mounted() {
    
    this.loading = false;
    
  },
};
</script>
