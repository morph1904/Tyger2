<template>
    <v-dialog v-model="show" max-width="500px">
        <v-card>
           <v-card-title class="primary" dark flat>
            <span class="headline white--text">Edit Application</span>
          </v-card-title>

          <v-card-text>
            <v-container fluid>
              <v-layout row justify-space-between>
                <v-flex xs12>
                  <v-text-field v-model="item.name" label="Name"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row justify-space-between>
                <v-flex xs12>
                  <v-text-field v-model="item.url" label="URL"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row justify-space-between>
                <v-flex xs12>
                  <v-switch
              color="primary" v-model="item.insecure_skip_verify" label="Skip SSL Verification on Backend?"></v-switch>
                </v-flex>
              </v-layout>
              <v-layout row justify-space-between>
                <v-flex xs12>
                  <v-switch
              color="primary" v-model="item.websocket" label="Enable Websockets?"></v-switch>
                </v-flex>
              </v-layout>
              <v-layout row justify-space-between>
                <v-flex xs12>
                  <v-switch
              color="primary" v-model="item.transparent" label="Transparent Mode?"></v-switch>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="accent" flat @click="close">Cancel</v-btn>
            <v-btn color="primary" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>
export default {
    
    props: {
    value: Boolean,
    item: Object
  },
   model: {
        prop: 'value',
        event: 'showhide'
    },
  computed: {
    show: {
      get: function() {
        return this.value;
      },
      set: function(value) {
        this.$emit("showhide", value);
      }
    }
  },
     methods: {
          close (){
            this.show = false
      },
      save () {
             //   console.log(this.item)
        this.$store.dispatch('updateApp', this.item)
        this.close()
      },
     },
}

</script>