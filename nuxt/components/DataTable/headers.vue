<script>
  import {
    VCheckbox, VIcon, VMenu, VDivider, VSubheader, VCard
  } from 'vuetify'
  import {
    VListTile, VList, VListTileTitle, VListTileAvatar, VListTileAction
  } from 'vuetify/es5/components/VList'
  import Filters from './Filter'

  const DIR = {
    NONE: 0,
    ASC: 1,
    DESC: 2
  }

  export default {
    props: {
      withSelect: Boolean,
      headers: Array,
      indeterminate: Boolean,
      all: Boolean
    },
    data: () => ({
      activeHeaders: [],
      pagination: {
        sort: {
          by: '',
          dir: DIR.NONE // 0 - none, 1-asc, 2-desc
        },
        filters: [],
      }
    }),
    created() {
      if (this.withSelect) {
        this.activeHeaders.push(false);
      }
      this.headers.forEach((h, i) => (this.activeHeaders.push(false)))
    },
    render(h, ctx) {
      return h('tr', {}, [this.createCells()])
    },
    methods: {
      createCells() {
        let headersComponents = []
        if (this.withSelect) {
          headersComponents.push(this.$createElement('th', {}, [this.$createElement(VCheckbox, {}, [])]))
        }
        for (let [index, header] of this.headers.entries()) {
          if (this.withSelect) {
            index++
          }
          const data = {
            staticClass: 'column',
            class: {},
            attrs: {
              id: `header${index}`
            },
            on: {}
          }
          let content = [header.value]

          if (header.sortable) {
            data.staticClass += ' sortable'
            data.class['active-sort'] = this.pagination.sort.by === header.value && this.pagination.sort.dir !== DIR.NONE
            content.push(
              this.$createElement(VIcon, {
                staticClass: 'sort',
                class: {
                  'hidden': this.pagination.sort.dir !== DIR.ASC && this.pagination.sort.dir !== DIR.NONE
                }
              }, ['arrow_downward']),
              this.$createElement(VIcon, {
                staticClass: 'sort',
                class: {
                  'hidden': this.pagination.sort.dir !== DIR.DESC
                }
              }, ['arrow_upward'])
            )
            if (!header.filterable) {
              data.on.click = () => {
                this.sortBy(header)
              }
            }
          }
          if (header.filterable) {
            data.staticClass += ' filterable'
            data.class['active-filter'] = this.isFilterActive(header)
            content.push(
              this.$createElement(VIcon, { staticClass: 'filter' }, ['filter_list'])
            )
            content.push(this.createMenu(index, header))
            data.on.click = (e) => {
              this.openHeaderMenu(index, e)
            }
          }
          headersComponents.push(this.$createElement('th', data, content))
        }

        return headersComponents
      },
      createMenu(index, header) {
        let content = []

        if (header.sortable) {
          content.push(...this.createInMenuSortItems(header))
          if (header.filterable) {
            content.push(this.$createElement(VDivider, {}, []))
          }
        }
        content.push(...this.createInMenuFilterItems(header))
        return this.$createElement(VMenu,
          {
            ref: `headerMenu${index}`,
            domProps: {},
            props: {
              closeOnContentClick: false,
              offsetY: true,
              fullWidth: true,
              minWidth: '300px',
              attach: `header${index}`,
              value: this.activeHeaders[index]
            },
            on: {
              input: (event) => {
                this.activeHeaders[index] = false
                this.$forceUpdate()
              }
            }
          },
          [
            this.$createElement(VCard, {}, [this.$createElement(VList, {}, content)])
          ])
      },
      createInMenuSortItems(header) {
        let children = []

        children.push(this.$createElement(VListTile, {
            class: {
              'active-list-tile': header.value === this.pagination.sort.by && this.pagination.sort.dir === DIR.ASC
            },
            on: {
              click: () => {
                this.sortBy(header, DIR.ASC)
              }
            }
          }, [
            this.$createElement(VListTileAvatar, {}, [
              this.$createElement(VIcon, {}, ['arrow_downward'])
            ]),
            this.$createElement(VListTileTitle, {}, [
              'Sort desc'
            ])
          ])
        )
        children.push(this.$createElement(VListTile, {
            class: {
              'active-list-tile': header.value === this.pagination.sort.by && this.pagination.sort.dir === DIR.DESC
            },
            on: {
              click: () => {
                this.sortBy(header, DIR.DESC)
              }
            }
          }, [
            this.$createElement(VListTileAvatar, {}, [
              this.$createElement(VIcon, {}, ['arrow_upward'])
            ]),
            this.$createElement(VListTileTitle, {}, [
              'Sort asc'
            ])
          ])
        )

        if (header.value === this.pagination.sort.by && this.pagination.sort.dir !== DIR.NONE) {
          children.push(this.$createElement(VListTile, {
              on: {
                click: () => {
                  this.sortBy(header, DIR.NONE)
                }
              }
            }, [
              this.$createElement(VListTileAvatar, {}, [
                this.$createElement(VIcon, {}, ['close'])
              ]),
              this.$createElement(VListTileTitle, {}, [
                'Cancel sort'
              ])
            ])
          )
        }

        return [children]
      },
      createInMenuFilterItems(header) {
        let children = [
          this.$createElement(VSubheader, 'Filter'),
          this.$createElement(VListTile, {}, [
            this.$createElement(Filters, {
              props: { header, filter: header.filter },
              on: {
                input: this.onFilterValueChange(header)
              }
            }, [])
          ])
        ]
        if (this.isFilterActive(header)) {
          children.push(
            this.$createElement(VListTile, {
              on: {
                click: () => {
                  this.cancelFilter(header)
                }
              }
            }, [
              this.$createElement(VListTileAvatar, {}, [
                this.$createElement(VIcon, {}, ['close'])
              ]),
              this.$createElement(VListTileTitle, {}, [
                'Cancel filter'
              ])
            ])
          )
        }
        return children
      },
      isFilterActive(header) {
        for (let filter of this.pagination.filters) {
          if (filter.by === header.value) {
            return true
          }
        }
        return false
      },
      cancelFilter(header) {
        for (let [index, filter] of this.pagination.filters.entries()) {
          if (filter.by === header.value) {
            this.pagination.filters.splice(index, 1)
            this.notifyChange()
            return
          }
        }
      },
      onFilterValueChange(header) {
        return (value) => {
          for (let filter of this.pagination.filters) {
            if (filter.by === header.value) {
              filter.value = value
              this.notifyChange()
              return
            }
          }
          // filter not in filters
          this.pagination.filters.push({ by: header.value, value: value })
          this.notifyChange()
        }
      },
      openHeaderMenu(index, e) {
        e.preventDefault()
        this.activeHeaders[index] = false
        this.$nextTick(() => {
          this.activeHeaders[index] = true
          this.$forceUpdate()
        })
      },
      sortBy(header, dir) {
        this.pagination.sort.by = header.value
        if (dir !== undefined) {
          this.pagination.sort.dir = dir
        } else {
          let dir = this.pagination.sort.dir
          this.pagination.sort.dir = dir === DIR.NONE ? DIR.ASC : dir === DIR.ASC ? DIR.DESC : DIR.NONE
        }
        this.notifyChange()
      },
      notifyChange() {
        this.$emit('change', this.pagination)
        this.$emit('input', this.pagination)
      }
    }
  }
</script>

<style lang="stylus">
  @require '../../node_modules/vuetify/src/stylus/components/_data-table.styl'
  .datatable
    thead
      th.column.filterable
        @extend .datatable thead th.column.sortable
        .menu
          cursor: default
          i
            opacity 1
            font-size 24px
            vertical-align: middle
            align-items: center;
            display: inline-flex;
      th.column.filterable, th.column.sortable
        &.active
          i
            opacity: 0
      th.column
        &.active-filter
          i.filter
            opacity: 1
      th.column
        &.active-sort
          i.sort
            opacity: 1

  .active-list-tile
    color: blue

  .hidden
    display: none !important
</style>
