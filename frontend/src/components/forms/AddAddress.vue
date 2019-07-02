<template>
<v-dialog v-model="show" max-width="700px">
     <v-card>
          <v-card-title class="primary" dark flat>
            <span class="headline white--text">Add Address</span>
          </v-card-title>

          <v-card-text>
            <v-container fluid>
              <v-layout row justify-space-between>

                  <v-text-field 
                  name="address" 
                  label="External Address"  
                  v-model="formData.address"
                  :error-messages="errors.collect('address')"
                  v-validate="'required'">
                </v-text-field>

              </v-layout>
              <v-layout row justify-space-between>
             
                   <v-switch
              color="primary"
              class="px-3"
              label="Default to HTTPS?"
              v-model="formData.tls"
            ></v-switch>
               
              </v-layout>
              <v-layout row justify-space-between>
                
                  <v-switch
              color="primary"
              class="px-3"
              label="Use HTTPS Staging?"
              v-model="formData.staging"
            ></v-switch>
            
              </v-layout>
              <v-layout row justify-space-between>
                
                  <v-combobox
          v-model="formData.app"
          :items="apps"
          item-text="name"
          item-value="name"
          label="Select an app to proxy to:"
        ></v-combobox>
              </v-layout>
              <v-layout row justify-space-between>
                
                  <v-combobox
          v-model="formData.provider"
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
              v-model="formData.dns_challenge"
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
    
    data() {
    return {
      formData: {
        address: "",
        tls: false,
        staging: false,
        app: "",
        provider: "",
        dns_challenge: false
      },
      
    };
  },
 props: {
    value: Boolean
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
    },

    ...mapGetters({
      providers: 'showDNS',
      apps:'showApps' 
    })
  },
  methods: {
      close () {
        this.show=false
        this.resetForm()
      },
      save(){
          this.submit()
      },
    resetForm(){
            this.formData = {
              address: "",
              tls: false,
              staging: false,
              app: "",
            }
            this.errors.clear()
    },
    createAdd() { 
      let data = {
          address: this.formData.address,
          tls: this.formData.tls,
          staging: this.formData.staging,
          app: this.formData.app.name,
          provider: this.formData.provider.provider_name,
          dns_challenge: this.formData.dns_challenge
      }
      
      this.$store.dispatch('addAddress', data)
            this.show = false;
            this.resetForm();
            this.close()
    },
    submit() {
      this.$validator.validate().then(result => {
        if (result) {
            this.createAdd();
        }
      });
    }
  },  

}
</script>
