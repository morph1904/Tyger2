import {
  VTextField
} from 'vuetify'

export default {
  functional: true,
  render(h, ctx) {
    ctx.data.props = Object.assign({}, ctx.data.props.filter)
    return h(VTextField,ctx.data, ctx.children)
  }
}
