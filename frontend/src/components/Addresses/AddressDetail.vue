<template>
<v-dialog v-model="detailshow" max-width="700px">
     <v-card>
          <v-card-title class="primary" dark flat>
            <span class="headline white--text">Address Detail</span>
          </v-card-title>

          <v-card-text>
            <v-container fluid>
              <v-layout row justify-space-between>
               Address: {{item.address}}
              </v-layout>
              <v-layout row justify-space-between>
                Uses TLS: {{item.tls}}
              </v-layout>
              <v-layout row justify-space-between>
                Uses TLS Staging: {{item.staging}}
              </v-layout>
              <v-layout row justify-space-between>
                Proxies to: {{item.app}}
              </v-layout>
              <v-layout row justify-space-between>
                DNS Provider: {{item.provider}}
              </v-layout>
              <v-layout row justify-space-between>
                Uses DNS Challenge: {{item.dns_challenge}}
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
import { mapGetters } from 'vuex'
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
    detailshow: {
      get: function() {
        return this.value;
      },
      set: function(value) {
        this.$emit("showhide", value);
      },
    },
    ...mapGetters({
      providers: 'showDNS',
      apps:'showApps' 
    })
      
    
  },
     methods: {
          close (){
            this.detailshow = false
      },
    
      save () {
        let data = {
          id: this.item.id,
          address: this.item.address,
          tls: this.item.tls,
          staging: this.item.staging,
          app: this.item.app.name,
          provider: this.item.provider.provider_name,
          dns_challenge: this.item.dns_challenge
      }
        this.$store.dispatch('updateAddress', data)
        this.close()
      },
     },
}

</script>