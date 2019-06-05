<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title class="headline">Seznam
          <v-icon>arrow_upward</v-icon>
        </v-card-title>
      </v-card>
    </v-flex>
    <v-flex>
      <v-card>
        <v-data-table
          :headers="headers"
          :items="desserts"
          hide-actions
          class="elevation-1"
        >
          <template slot="headers" slot-scope="props">
            <headers v-bind="props" withSelect></headers>
          </template>
          <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
          <template slot="items" slot-scope="props">
            <tr :active="props.selected" @click="props.selected = !props.selected">
              <td>
                <v-checkbox
                  :input-value="props.selected"
                  primary
                  hide-details
                ></v-checkbox>
              </td>
              <td>{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.calories }}</td>
              <td class="text-xs-right">{{ props.item.fat }}</td>
              <td class="text-xs-right">{{ props.item.carbs }}</td>
              <td class="text-xs-right">{{ props.item.protein }}</td>
              <td class="text-xs-right">{{ props.item.iron }}</td>
            </tr>
          </template>
          <template slot="no-data">
            <v-alert :value="true" color="error" icon="warning">
              Sorry, nothing to display here :(
            </v-alert>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import AdminPageMixin from './AdminPageMixin'
  import Headers from '~/components/DataTable/headers'
  // import DynamicList from '~/components/DynamicList/index.vue'
  // import VDataTable from '../../components/DynamicList/VDataTable'

  export default {
    // mixins: [AdminPageMixin],
    components: { Headers },

    data () {
      return {
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            filterable: true,
            value: 'name',
            filter: {
              component: 'text',
              label: 'Filter deserts'
            }
          },
          {
            text: 'Calories',
            sortable: true,
            value: 'calories',
            filterable: true,
            filter: {
              component: 'modal',
              contentComponent: {
                render (h) {
                  h('div', {}, ['test'])
                }
              },
              label: 'Filter stuff'
            }
          },
          { text: 'Fat (g)', value: 'fat', sortable: true },
          {
            text: 'Carbs (g)',
            value: 'carbs',
            filterable: true,
            filter: {
              component: 'select',
              label: 'Filter stuff',
              'single-line': true,
              items: [
                { text: 'State 1' },
                { text: 'State 2' },
                { text: 'State 3' },
                { text: 'State 4' },
                { text: 'State 5' },
                { text: 'State 6' },
                { text: 'State 7' }
              ]
            }
          },
          {
            text: 'Protein (g)',
            value: 'protein',
            filterable: true,
            filter: {
              // component: 'date',
              component: 'dateRange',
              // component: 'time',
              format: '24hr',
              label: 'Filter stuff'
            }
          },
          { text: 'Iron (%)', value: 'iron' }
        ],
        desserts: [
          {
            value: false,
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%'
          },
          {
            value: false,
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%'
          },
          {
            value: false,
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%'
          },
          {
            value: false,
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%'
          },
          {
            value: false,
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%'
          },
          {
            value: false,
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%'
          },
          {
            value: false,
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%'
          },
          {
            value: false,
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%'
          },
          {
            value: false,
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%'
          },
          {
            value: false,
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%'
          }
        ]
      }
    }
  }
</script>
