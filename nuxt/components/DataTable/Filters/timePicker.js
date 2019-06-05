import {
  VTimePicker, VMenu, VTextField
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
      ref: `timePickerMenu`,
      props: {
        'offset-y': true,
        'full-width': true,
        'close-on-content-click': false,
        'nudge-right': 40,
        'return-value.sync': this.dataModel,
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
            'prepend-icon': 'access_time',
            'readonly': true
          }
        }, []),
      h(VTimePicker, {
        props: Object.assign({}, this.filter, {
          value: this.dataModel
        }),
        on: {
          input: (value) => {
            console.log('change', value)
            this.dataModel = value
            this.$refs.timePickerMenu.save(value)
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
