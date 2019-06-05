import {
  VDatePicker, VMenu, VTextField, VBtn
} from 'vuetify'
import {
  VCard, VCardActions
} from 'vuetify/es5/components/VCard'

const MenuPicker = {
  props: {
    filter: Object,
  },
  data() {
    return {
      dataModel: {
        from: null,
        to: null,
      },
      isMenuOpen: false
    }
  },
  render(h) {
    return h(VMenu, {
      ref: `dateRangePickerMenu`,
      props: {
        'offset-y': true,
        'full-width': true,
        'nudge-right': 40,
        'close-on-content-click': false,
        'return-value.sync': this.dataModel,
        'lazy': true,
        'min-width': '290px',
        'value': this.isMenuOpen
      }
    }, [
      h(VTextField,
        {
          slot: 'activator',
          on: {},
          props: {
            value: `${this.dataModel.from === null ? '' : `${this.dataModel.from} - ${this.dataModel.to}`}`,
            'prepend-icon': 'event',
            'readonly': true
          }
        }, []),
      h(VCard, {}, [
        h(VDatePicker, {
          props: Object.assign({}, this.filter, {
            value: this.dataModel.from
          }),
          on: {
            input: (value) => {
              this.dataModel.from = value
            }
          }
        }),
        h(VDatePicker, {
          props: Object.assign({}, this.filter, {
            value: this.dataModel.to
          }),
          on: {
            input: (value) => {
              this.dataModel.to = value
            }
          }
        }),
        h(VCardActions, {}, [
          h(VBtn, {
            on: {
              click: () => {
                this.isMenuOpen = false
              }
            }
          }, ['Cancel']),
          h(VBtn, {
            on: {
              click: () => {
                this.$refs.dateRangePickerMenu.save(this.dataModel)
                this.$emit('input', this.dataModel)
                this.$emit('change', this.dataModel)
              }
            }
          }, ['OK'])
        ])
      ])
    ])
  }
}

export default {
  functional: true,
  render(h, ctx) {
    return h(MenuPicker, ctx.data, [])
  }
}
