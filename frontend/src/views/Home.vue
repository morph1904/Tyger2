<template>
  <v-container>
<<<<<<< HEAD
    
    <h2 class="blue-grey--text darken-5 pa-2">Dashboard
    </h2>
    <v-layout row wrap>
      <v-flex xs4 pa-3>
        <v-card
    class="mx-auto"
    color="blue-grey darken-3"
    dark
    max-width="400"
    
  >
  
    <v-card-title>
      <v-icon
        large
        left
      >
        dns
      </v-icon>
      <span class="title font-weight-light">CPU Usage:</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
        <v-layout row wrap class="justify-center">
       <v-flex xs4>
         
         <radial-progress-bar class="text-xs-center" :diameter="100" startColor="#ff5722" stopColor="#ff5722"
                       :completed-steps="stats.cpu_percent"
                       :total-steps="totalSteps"> {{ stats.cpu_percent }}%
  </radial-progress-bar>
         
       </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
      </v-flex>
      <v-flex xs4 pa-3>
              <v-card
    class="mx-auto"
    color="blue-grey darken-3"
    dark
    max-width="400"
    
  >
    <v-card-title>
      <v-icon
        large
        left
      >
        dns
      </v-icon>
      <span class="title font-weight-light">Memory Usage:</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
             <v-layout row wrap class="justify-center">
       <v-flex xs4>
         
         <radial-progress-bar class="text-xs-center" :diameter="100" startColor="#ff5722" stopColor="#ff5722"
                       :completed-steps="stats.mem_percent"
                       :total-steps="totalSteps"> {{ stats.mem_percent }}%
  </radial-progress-bar>
         
       </v-flex>
      </v-layout>
      
    </v-card-text>
  </v-card>
      </v-flex>
      <v-flex xs4 pa-3>
              <v-card
    class="mx-auto"
    color="blue-grey darken-3"
    dark
    max-width="400"
    
  >
  <v-btn absolute top right fab dark icon color="primary" @click.stop="showWizardForm=true">
            <v-icon>add</v-icon>
          </v-btn>
    <v-card-title>
      <v-icon
        large
        left
      >
        dns
      </v-icon>
      <span class="title font-weight-light">Activity</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      
    </v-card-text>
  </v-card>
      </v-flex>
    </v-layout>
=======
    <h2 class="blue-grey--text darken-5 pa-2">Dashboard</h2>
>>>>>>> 484501520473b429991d298f1fb7342d1a7606ae
    <v-layout row wrap>
      <v-flex xs12 sm6 pa-3>
        <v-toolbar color="deep-orange" dark flat>
          <v-toolbar-title>Applications</v-toolbar-title>
          <v-spacer></v-spacer>
<<<<<<< HEAD
=======
          <v-btn absolute top right fab dark icon color="accent" @click.stop="showWizardForm=true">
            <v-icon>add</v-icon>
          </v-btn>
>>>>>>> 484501520473b429991d298f1fb7342d1a7606ae
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
<<<<<<< HEAD
=======
          <v-btn absolute top right fab dark icon color="accent">
            <v-icon>add</v-icon>
          </v-btn>
>>>>>>> 484501520473b429991d298f1fb7342d1a7606ae
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
<<<<<<< HEAD
//import axios from 'axios'
//import config from '../config'
import RadialProgressBar from 'vue-radial-progress'
export default {
  data() {
    return {
      showWizardForm: false,
      stats: { 
        cpu_percent: 100, 
        mem_percent: 100
        },
        totalSteps: 100,
    };
  },
  components: {
    Wizard,
    RadialProgressBar
  },
    methods:{
       getStats () {
    
      this.$http.get('stats/')
      .then(({ data }) => {
        if (data) {
          //console.log(data);
          this.stats.cpu_percent = data.cpu_percent
          this.stats.mem_percent = data.mem_percent

        } else {
         console.log('Something went wrong!');
        }
      })
      .catch(() => { console.log('Something went wrong!') })
  }, 
    },
   mounted() {
    this.interval = setInterval(() => this.getStats(), 1000);
},
        
=======
export default {
  data() {
    return {
      showWizardForm: false
    };
  },
  components: {
    Wizard
  }
>>>>>>> 484501520473b429991d298f1fb7342d1a7606ae
};
</script>
