<template>
<v-dialog v-model="show" max-width="700px">
     <v-card>
          <v-card-title class="primary" dark flat>
            <span class="headline white--text">Add Application</span>
          </v-card-title>

          <v-card-text>
            <v-container fluid>
              <v-layout row justify-space-between>

                  <v-text-field 
                  name="appName" 
                  label="Name"  
                  v-model="formData.appName"
                  :error-messages="errors.collect('appName')"
                  v-validate="'required'">
                </v-text-field>

              </v-layout>
              <v-layout row justify-space-between>
               
                  <v-text-field 
                  name="appURL"  
                  v-model="formData.appURL"
                  :error-messages="errors.collect('appURL')"
                  v-validate="{url: {require_protocol: true,require_tld: false,}, required: true}"
                  label="URL">
                  </v-text-field>
           
              </v-layout>
              <v-layout row justify-space-between>
             
                   <v-switch
              color="primary"
              class="px-3"
              label="Skip SSL Verification on Backend?"
              v-model="formData.insecure_skip_verify"
            ></v-switch>
               
              </v-layout>
              <v-layout row justify-space-between>
                
                  <v-switch
              color="primary"
              class="px-3"
              label="Enable Websockets?"
              v-model="formData.websockets"
            ></v-switch>
            
              </v-layout>
              <v-layout row justify-space-between>
                
                  <v-switch
              color="primary"
              class="px-3"
              label="Transparent Mode?"
              v-model="formData.transparent"
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

export default {
    data() {
    return {
      formData: {
        appName: "",
        appURL: "",
        websockets: false,
        transparent: false,
        insecure_skip_verify: false
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
              appName: "",
              appURL: "",
              websockets: false,
              transparent: false,
              insecure_skip_verify: false
            }
            this.errors.clear()
    },
    createApp() { 
      let data = {
        app:{
          name: this.formData.appName,
          url: this.formData.appURL,
          insecure_skip_verify: this.formData.insecure_skip_verify,
          websocket: this.formData.websockets,
          transparent: this.formData.transparent
        },
      }
      
      this.$store.dispatch('addApp', data)
            this.show = false;
            this.step = 1;
            this.resetForm();
            this.close()
    },
    submit() {
      this.$validator.validate().then(result => {
        if (result) {
            this.createApp();
        }
      });
    }
  },   
}
</script>
