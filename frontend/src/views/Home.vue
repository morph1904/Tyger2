<template>
  <v-container>
    <h2 class="blue-grey--text darken-5 pa-2">Dashboard</h2>
    <v-layout row wrap>
      <v-flex xs12 sm6 pa-3>
        <v-toolbar color="deep-orange" dark flat>
          <v-toolbar-title>Applications</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn absolute top right fab dark icon color="accent" @click.stop="showWizardForm=true">
            <v-icon>add</v-icon>
          </v-btn>
          <Wizard v-model="showWizardForm"/>
        </v-toolbar>
        <v-card flat class="blue-grey lighten-5">
          <v-card-title primary-title>
            <h2 class="blue-grey--text darken-4">Apps</h2>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 pa-3>
        <v-toolbar color="deep-orange" dark flat>
          <v-toolbar-title>Domains</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn absolute top right fab dark icon color="accent">
            <v-icon>add</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card flat class="blue-grey lighten-5">
          <v-card-title primary-title>
            <h2 class="blue-grey--text darken-4">Domains</h2>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Wizard from "@/components/forms/Wizard";
export default {
  data() {
    return {
      showWizardForm: false
    };
  },
  components: {
    Wizard
  }
};
</script>
