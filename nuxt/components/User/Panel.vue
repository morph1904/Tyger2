<template>
	<div>
		<v-menu
				:close-on-content-click="false"
				v-model="menu"
				offset-y
		>
			<v-btn slot="activator" flat icon>
				<v-icon>account_circle</v-icon>
			</v-btn>
			<v-card>
				<template v-if="$auth.isLoggedIn">
					<v-list>
						<v-list-tile avatar>
							<v-list-tile-avatar>
								<img src="http://www.gravatar.com/avatar/32dc008f58672e97fd61b77ad4510331?s=181" alt="John">
							</v-list-tile-avatar>
							<v-list-tile-content>
								<v-list-tile-title>{{$auth.user.fullName}}</v-list-tile-title>
								<v-list-tile-sub-title>{{$auth.user.username}}</v-list-tile-sub-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="primary" flat @click="$auth.logout()">{{$t('user.panel.logout')}}</v-btn>
					</v-card-actions>
				</template>
				<template v-else>
					<v-card>
						<v-container fill-height fluid>
							<v-layout row wrap fill-height>
								<v-flex xs12 align-end flexbox>
									<login-form></login-form>
								</v-flex>
								<v-flex xs12 align-end flexbox text-xs-right>
									<v-btn to="/registrace" color="primary" flat @click="menu = false">{{$t('user.panel.register')}}</v-btn>
								</v-flex>
							</v-layout>
						</v-container>
					</v-card>
				</template>
			</v-card>
		</v-menu>
		<v-btn to="/admin" v-if="$auth.hasRole('ROLE_ADMIN')" flat>
			Administrace
		</v-btn>
	</div>
</template>

<script>
	import LoginForm from '~/components/User/LoginForm'

	export default {
		components: {LoginForm},
		data() {
			return {
				menu: false,
			}
		}
	}
</script>
