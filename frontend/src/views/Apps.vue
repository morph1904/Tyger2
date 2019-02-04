<template>

<v-container>
  <h2 class="blue-grey--text darken-5 pa-2">Applications</h2>
  <v-layout row wrap>
    <v-flex xs12 pa-3>
        <applications-panel></applications-panel>
    </v-flex>
  </v-layout>
</v-container>
  
</template>

<script>

  import ApplicationsPanel from "@/components/home/ApplicationsPanel";
export default {
  components:{
    ApplicationsPanel
  }
};
</script>
