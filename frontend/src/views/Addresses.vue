<template>
  <v-container>
    <h2 class="blue-grey--text darken-5 pa-2">Addresses</h2>
    <v-layout row wrap>
      <v-flex xs12 pa-3>
        <addresses-panel></addresses-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AddressesPanel from "@/components/home/AddressesPanel";
export default {
  components:{
    AddressesPanel
  }
};
</script>
