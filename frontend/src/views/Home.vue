<template>
  <v-container>
    <h2 class="blue-grey--text darken-5 pa-2">Dashboard</h2>
    <LargeStatsPanel></LargeStatsPanel>
    <v-layout row wrap>
      <v-flex xs12 sm12 pa-3>
        <applications-panel></applications-panel>
      </v-flex>
      <v-flex xs12 sm12 pa-3>
        <addresses-panel></addresses-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import LargeStatsPanel from "@/components/home/LargeStatsPanel";
import ApplicationsPanel from "@/components/home/ApplicationsPanel";
import AddressesPanel from "@/components/home/AddressesPanel";
export default {
  data() {
    return {
      totalSteps: 100
    };
  },
  components: {
    ApplicationsPanel,
    AddressesPanel,
    LargeStatsPanel
  },
  methods: {
   
  }
};
</script>
<style>
.full-height {
  min-height: 100%;
}
</style>
