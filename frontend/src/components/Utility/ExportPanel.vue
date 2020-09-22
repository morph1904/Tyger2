<template>
  <div>
    <v-toolbar color="deep-orange" dark flat>
      <v-toolbar-title>Backup</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card flat class="blue-grey lighten-5">
      <v-card-title primary-title>
        <h2 class="blue-grey--text darken-4">Backup</h2> 
        <v-spacer></v-spacer> 
      </v-card-title>
        <v-container>
        <p>Use this button to export and download a JSON representation of your Tyger2 Environment. This can then be used in TygerCaddy, to quickly update your configuration.</p>

        <v-btn @click="downloadBackup()" color="primary" >Download Backup</v-btn>
        </v-container>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {

    };
    
  },
  components:{

  },
  methods: {
        downloadBackup() {
      let content = JSON.stringify(this.$store.state.backup)
      console.log(content)
      if (content === null) {
        this.$emit("error");
        return;
      }

      const blob = new Blob([content], {
        type: `application/json`
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `export.json`;
      link.click();
      this.$emit("success");
    }
  },
  computed: {
    ...mapGetters({
      export: 'showBackup'
    })
  },
  mounted() {
    this.$store.dispatch('getBackupData');
    console.log(this.export)
    this.loading = false;
    
  },
};
</script>
