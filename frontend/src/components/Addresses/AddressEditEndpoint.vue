<template>
<v-dialog v-model="editEndpointShow" max-width="700px">
     <v-card>
          <v-card-title class="primary" dark flat>
            <span class="headline white--text">Edit URL Proxy</span>
          </v-card-title>

          <v-card-text>
            <v-container fluid>
              <v-layout row justify-space-between>
               <v-text-field 
                  name="URL" 
                  label="URL" 
                  placeholder="/example/link" 
                  v-model="item.endpoint"
                  :error-messages="errors.collect('URL')"
                  v-validate="'required'">
                </v-text-field>
              </v-layout>
              <v-layout row justify-space-between>
                <v-combobox
          v-model="item.proxy_to"
          :items="apps"
          item-text="name"
          item-value="name"
          label="Select an app to proxy to:"
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
import { mapGetters } from 'vuex'
export default {
data() {
    return {
      formData: {
        url: "",
        app: "",
        address_id:"",
      },
      
    };
  },
    props: {
    value: Boolean,
    item: Object
  },
   model: {
        prop: 'value',
        event: 'showhide'
    },
  computed: {
    editEndpointShow: {
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
            this.editEndpointShow = false
      },
    
      save () {
        let data = {
          id: this.item.id,
          address: this.item.address,
          endpoint: this.item.endpoint,
          proxy_to: this.item.proxy_to.name,
          addrid: this.item.addrid
      }
      console.log(data)
        this.$store.dispatch('updateEndpoint', data)
        this.close()
      },
     },
}

</script>