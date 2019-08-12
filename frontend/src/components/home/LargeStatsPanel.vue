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
                  :completed-steps="cpu_percent"
                  :total-steps="totalSteps"
                >{{ cpu_percent }}%</radial-progress-bar>
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
                  :completed-steps="mem_percent"
                  :total-steps="totalSteps"
                >{{ mem_percent }}%</radial-progress-bar>
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
            <v-btn round color="primary" dark block to="/logs">View Logs</v-btn>
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
            <v-btn round color="primary" dark block @click="ReloadProxy()">Reload Proxy</v-btn>
            <v-btn round color="primary" dark block to="/logs">View Logs</v-btn>
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
import { mapGetters } from "vuex"
export default {
    data() {
    return {
      interval: null,
      totalSteps:100,
    }
    },
    components: {
        RadialProgressBar,
  },
  computed: {
     ...mapGetters({
      cpu_percent: 'getCPU', 
      mem_percent: 'getMEM'
    })
  },
  methods:{
          ReloadProxy() {
            this.$store.dispatch('reloadProxy')
          },
          loadStats(){
            this.$store.dispatch('getStats')
          }
  },
beforeCreate(){
   this.interval = setInterval(() => this.loadStats(), 1000)
  }
}
</script>
