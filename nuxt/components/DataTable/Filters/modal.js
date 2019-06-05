import {
  VDialog
} from 'vuetify'
import {
  VCard, VCardText
} from 'vuetify/es5/components/VCard'

const DEFAULT_MESSAGE = 'Open dialog'

const Modal = {
  data() {
    return {
      dataModel: '',
      dialogOpen: false
    }
  },
  render(h) {
    console.log(this)
    console.log(this.$children)
    console.log(this.$slots)
    return h('div', {}, [
      h('div', {
        on: {
          click: () => {
            this.dialogOpen = true
          }
        }
      }, [DEFAULT_MESSAGE]),
      h(VDialog, {}, [
        h(VCard, {}, [
          h(VCardText, {
            scopedSlots: {
              default: function (props) {
                return h('span', 'default')
              }
            }
          }, this.$slots.default)
        ])
      ])
    ])
  }
}

export default {
  functional: true,
  render (h, ctx) {
    ctx.data.props = Object.assign({}, ctx.data.props.filter)
    return h('div', ctx.data, [ctx.data.props.contentComponent])
  }
}
