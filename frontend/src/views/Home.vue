<template>
  <v-container>
    
    <h2 class="blue-grey--text darken-5 pa-2">Dashboard
    </h2>
    <v-layout row wrap hidden-sm-and-down>
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
    class="mx-auto full-height"
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
      <span class="title font-weight-light">Actions</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      <v-btn round color="primary" dark block>text</v-btn>
      <v-btn round color="primary" dark block>text</v-btn>
    </v-card-text>
  </v-card>
      </v-flex>
    </v-layout>


<v-layout row wrap hidden-md-and-up justify-center>
  <v-flex xs12 pa-3 >
              <v-card
    class="mx-auto full-height"
    color="blue-grey darken-3"
    dark
    
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
      <span class="title font-weight-light">Actions</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      <v-layout row wrap justify-center>
        <v-flex xs6>
          <v-btn round color="primary" dark block>text</v-btn>
      <v-btn round color="primary" dark block>text</v-btn>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
      </v-flex>
</v-layout>






    <Wizard v-model="showWizardForm"/>
    <v-layout row wrap>
      <v-flex xs12 sm6 pa-3>
        <v-toolbar color="deep-orange" dark flat>
          <v-toolbar-title>Applications</v-toolbar-title>
          <v-spacer></v-spacer>
              <v-badge color="blue-grey darken-4">
      <span slot="badge">{{ stats.appCount }}</span>
      <v-icon
        large
        color="white"
      >
        apps
      </v-icon>
    </v-badge>
        </v-toolbar>
        <v-card flat class="blue-grey lighten-5">
          <v-card-title primary-title>
            <h2 class="blue-grey--text darken-4">Apps</h2>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 pa-3>
        <v-toolbar color="deep-orange" dark flat>
          <v-toolbar-title>Addresses</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-badge color="blue-grey darken-4">
      <span slot="badge">{{ stats.addressCount }}</span>
      <v-icon
        large
        color="white"
      >
        domain
      </v-icon>
    </v-badge>
        </v-toolbar>
        <v-card flat class="blue-grey lighten-5">
          <v-card-title primary-title>
            <h2 class="blue-grey--text darken-4">Addresses</h2>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Wizard from "@/components/forms/Wizard";
//import axios from 'axios'
//import config from '../config'
import RadialProgressBar from 'vue-radial-progress'
export default {
  data() {
    return {
      showWizardForm: false,
      stats: { 
        cpu_percent: 100, 
        mem_percent: 100,
        appCount: null,
        addressCount: null
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

            }
          })
          .catch(() => { console.log('Something went wrong!') })
      },
      appCount () {
        this.$http.get('apps/count/')
          .then(({ data }) => {
            if (data) {
              this.stats.appCount = data.appcount
            }
          })
          .catch(() => {console.log('Error communicating with backend!') })
      },
      addressCount () {
        this.$http.get('addresses/count/')
          .then(({ data }) => {
            if (data) {
              this.stats.addressCount = data.addresscount
            }
          })
          .catch(() => {console.log('Error communicating with backend!') })
      } 
    },
   mounted() {
    this.appCount()
    this.addressCount()
    this.interval = setInterval(() => this.getStats(), 1000);

},
        
};
</script>
<style>
 .full-height{
  min-height:100%
 }
    

  
</style>
