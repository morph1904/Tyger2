<template>
<div>
        <v-layout row wrap hidden-sm-and-down>
      <v-flex xs4 pa-3>
        <v-card class="mx-auto" color="blue-grey darken-3" dark max-width="400">
          <v-card-title>
            <v-icon large left>dns</v-icon>
            <span class="title font-weight-light">CPU Usage:</span>
          </v-card-title>

          <v-card-text class="headline font-weight-bold">
            <v-layout row wrap class="justify-center">
              <v-flex xs4>
                <radial-progress-bar
                  class="text-xs-center"
                  :diameter="100"
                  startColor="#ff5722"
                  stopColor="#ff5722"
                  :completed-steps="stats.cpu_percent"
                  :total-steps="totalSteps"
                >{{ stats.cpu_percent }}%</radial-progress-bar>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs4 pa-3>
        <v-card class="mx-auto" color="blue-grey darken-3" dark max-width="400">
          <v-card-title>
            <v-icon large left>dns</v-icon>
            <span class="title font-weight-light">Memory Usage:</span>
          </v-card-title>

          <v-card-text class="headline font-weight-bold">
            <v-layout row wrap class="justify-center">
              <v-flex xs4>
                <radial-progress-bar
                  class="text-xs-center"
                  :diameter="100"
                  startColor="#ff5722"
                  stopColor="#ff5722"
                  :completed-steps="stats.mem_percent"
                  :total-steps="totalSteps"
                >{{ stats.mem_percent }}%</radial-progress-bar>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs4 pa-3>
        <v-card class="mx-auto full-height" color="blue-grey darken-3" dark max-width="400">
          <v-card-title>
            <v-icon large left>dns</v-icon>
            <span class="title font-weight-light">Actions</span>
          </v-card-title>

          <v-card-text class="headline font-weight-bold">
            <v-btn round color="primary" dark block @click="ReloadProxy()">Reload Proxy</v-btn>
            <v-btn round color="primary" dark block>View Logs</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
        <v-layout row wrap hidden-md-and-up justify-center>
      <v-flex xs12 pa-3>
        <v-card class="mx-auto full-height" color="blue-grey darken-3" dark>
          <v-card-title>
            <v-icon large left>dns</v-icon>
            <span class="title font-weight-light">Actions</span>
          </v-card-title>

          <v-card-text class="headline font-weight-bold">
            <v-layout row wrap justify-center>
              <v-flex xs6>
            <v-btn round color="primary" dark block>Reload Proxy</v-btn>
            <v-btn round color="primary" dark block>View Logs</v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    </div>
</template>


<script>
import RadialProgressBar from "vue-radial-progress";
export default {
    data() {
    return {
        stats: {
        cpu_percent: 100,
        mem_percent: 100,
        
      },
      showWizardForm: false,
      totalSteps:100,
    }
    },
    components: {
        RadialProgressBar,
  },
  methods:{
          ReloadProxy() {
            this.$store.dispatch('reloadProxy')
          }
  },

}
</script>
