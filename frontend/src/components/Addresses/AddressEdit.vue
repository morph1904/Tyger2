<template>
<v-dialog v-model="show" max-width="700px">
     <v-card>
          <v-card-title class="primary" dark flat>
            <span class="headline white--text">Edit Address</span>
          </v-card-title>

          <v-card-text>
            <v-container fluid>
              <v-layout row justify-space-between>

                  <v-text-field 
                  name="address" 
                  label="External Address"  
                  v-model="item.address"
                  :error-messages="errors.collect('address')"
                  v-validate="'required'">
                </v-text-field>

              </v-layout>
              <v-layout row justify-space-between>
             
                   <v-switch
              color="primary"
              class="px-3"
              label="Default to HTTPS?"
              v-model="item.tls"
            ></v-switch>
               
              </v-layout>
              <v-layout row justify-space-between>
                
                  <v-switch
              color="primary"
              class="px-3"
              label="Use HTTPS Staging?"
              v-model="item.staging"
            ></v-switch>
            
              </v-layout>
              <v-layout row justify-space-between>
                
                  <v-combobox
          v-model="item.app"
          :items="apps"
          item-text="name"
          item-value="name"
          label="Select an app to proxy to:"
        ></v-combobox>
              </v-layout>
              <v-layout row justify-space-between>
                
                  <v-combobox
          v-model="item.provider"
          :items="providers"
          item-text="provider_name"
          item-value="provider_name"
          label="Select your DNS provider:"
        ></v-combobox>
              </v-layout>
              <v-layout row justify-space-between>
             
                   <v-switch
              color="primary" 
              class="px-3"
              label="Use DNS Challenge?"
              v-model="item.dns_challenge"
            ></v-switch>
               
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
    show: {
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
            this.show = false
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