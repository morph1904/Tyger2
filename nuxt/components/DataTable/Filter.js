import TextFilterComponent from './Filters/text'
import ModalFilterComponent from './Filters/modal'
import SelectFilterComponent from './Filters/select'
import DatePickerFilterComponent from './Filters/datePicker'
import DateRangeFilterComponent from './Filters/dateRange'
import TimePickerFilterComponent from './Filters/timePicker'
import SliderFilterComponent from './Filters/slider'

export default {
  functional: true,
  props: {
    header: {
      required: true
    },
    filter: {
      required: true
    }
  },
  render: function (h, ctx) {
    let component = ctx.props.filter.component
    if (ctx.props.filter.component.constructor === String) {
      // choose from build in
      switch (ctx.props.filter.component) {
        case 'text':
          component = TextFilterComponent
          break
        case 'modal':
          component = ModalFilterComponent
          break
        case 'select':
          component = SelectFilterComponent
          break
        case 'date':
          component = DatePickerFilterComponent
          break
        case 'dateRange':
          component = DateRangeFilterComponent
          break
        case 'time':
          component = TimePickerFilterComponent
          break
        case 'slider':
          component = SliderFilterComponent
          break
        default:
          throw Error(`Unknown filter component ${ctx.props.component}`)
      }
    }

    return h(
      component,
      ctx.data
    )
  }
}
