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
          item-text="url"
          item-value="url"
          label="Select a app to proxy to:"
        ></v-combobox>
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
import { mapState } from "vuex";
export default {
    
    data() {
    return {
      formData: {
        address: "",
        tls: false,
        staging: false,
        app: "",
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
    apps(){
        //this.appslist = this.$store.state.apps
        //console.log(this.$store.state.apps)
        return this.$store.state.apps
    } 
  },
  methods: {
      close () {
        //this.value = false
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
          app: this.formData.app.url
      }
      
      this.$store.commit('ADD_ADDSTD', data)
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
