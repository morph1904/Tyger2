import {
  VDatePicker, VMenu, VTextField
} from 'vuetify'

const MenuPicker = {
  props: {
    filter: Object,
  },
  data() {
    return {
      dataModel: null
    }
  },
  render(h) {
    return h(VMenu, {
      ref: `datePickerMenu`,
      props: {
        'offset-y': true,
        'full-width': true,
        'nudge-right': 40,
        'lazy': true,
        'min-width': '290px'
      }
    }, [
      h(VTextField,
        {
          slot: 'activator',
          on: {},
          props: {
            value: this.dataModel,
            'prepend-icon': 'event',
            'readonly': true
          }
        }, []),
      h(VDatePicker, {
        props: Object.assign({}, this.filter, {
          value: this.dataModel
        }),
        on: {
          input: (value) => {
            this.dataModel = value
            this.$emit('input', value)
            this.$emit('change', value)
          }
        }
      })
    ])
  }
}

export default {
  functional: true,
  render(h, ctx) {
    return h(MenuPicker, ctx.data, [])
  }
}
