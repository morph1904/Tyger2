<template>
  <v-container>
    <h2 class="blue-grey--text darken-5 pa-2">Server Logs</h2>
    <v-layout row wrap>
      <v-flex xs12 pa-3>
        <CaddyPanel></CaddyPanel>
      </v-flex>
            <v-flex xs12 sm12 pa-3>
        <uwsgiPanel></uwsgiPanel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CaddyPanel from "@/components/logs/CaddyPanel";
import uwsgiPanel from "@/components/logs/uwsgiPanel";
export default {
  components:{
    CaddyPanel,
    uwsgiPanel
  }
};
</script>
