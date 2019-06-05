<template>
	<v-app dark>
		<v-navigation-drawer
				:mini-variant="false"
				:clipped="true"
				v-model="drawer"
				fixed
				app
		>
			<v-list>
				<v-list-tile
						router
						:to="item.to"
						:key="i"
						v-for="(item, i) in items"
						exact
				>
					<v-list-tile-action>
						<v-icon v-html="item.icon"></v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title v-text="item.title"></v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
		<v-toolbar fixed app :clipped-left="true">
			<v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
			<v-toolbar-title v-text="title"></v-toolbar-title>
			<v-spacer></v-spacer>
			<user-panel></user-panel>
		</v-toolbar>
		<v-content>
			<v-container grid-list-md>
				<nuxt/>
			</v-container>
		</v-content>
		<v-footer :fixed="true" app>
			<span>&copy;2018</span>
			<v-spacer></v-spacer>
			<span>@2018</span>
		</v-footer>
	</v-app>
</template>

<script>

	import UserPanel from '~/components/User/Panel'

	export default {
		components: {UserPanel},
		data() {
			return {
				drawer: false,
				items: [
					{ icon: 'apps', title: 'Homepage', to: '/' },
					{ icon: 'apps', title: 'Podstránka', to: '/podstranka' },
					{ icon: 'apps', title: 'Admin', to: '/admin' },
					{ icon: 'apps', title: 'Seznam', to: '/admin/seznam' }
				],
				title: 'BASE APP',
			}
		},

	}
</script>
