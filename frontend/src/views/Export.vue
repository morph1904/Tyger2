<template>
  <v-container>
    <h2 class="blue-grey--text darken-5 pa-2">Addresses</h2>
    <v-layout row wrap>
      <v-flex xs12 pa-3>
        <export-panel></export-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ExportPanel from "@/components/Utility/ExportPanel";
export default {
  components:{
    ExportPanel
  }
};
</script>
