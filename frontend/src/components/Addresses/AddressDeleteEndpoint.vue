<template>

    <v-dialog v-model="show" max-width="500px">
        <v-card>
          <v-card-title class="primary" dark flat>
            <span class="headline white--text">Delete endpoint - {{ item.address }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                Are you sure you want to delete this endpoint?
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="accent darken-1" flat @click="deleteclose">Cancel</v-btn>
            <v-btn color="error darken-1" flat @click="deleteaddress">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>
<script>
export default {
    data(){
        return{
            editedItem: {
                id:0,
            }, 
        }
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
          deleteclose (){
            this.show = false
      },
      deleteaddress () {
        this.$store.dispatch('deleteEndpoint', this.item)
        this.deleteclose()
      },
     },
}

</script>