export default {
  props: {
    items: Array // [1,2,3]
  },
  data: () => ({
    activeItems: []
  }),
  render (h) {
    let itemsDiv = []
    for (let item of this.items) {
      itemsDiv.push(h('div', {
        class: {
          'hidden': this.isItemActive(item)
        },
        on: {
          click: () => {
            this.activeItems.push(item)
          }
        }
      }))
    }
    return itemsDiv
  },
  methods: {
    isItemActive (item) {
      return () => {
        for (let item of this.items) {
          for (let itemActive of this.activeItems) {
            if (item === itemActive) {
              return true
            }
          }
        }
        return false
      }
    }
  }
}
