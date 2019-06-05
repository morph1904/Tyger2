<template>
	<v-layout row wrap>
		<v-flex xs12 md4 align-end color="grey lighten-2">
			<v-list dark three-line>
				<v-list-tile avatar>
					<v-list-tile-avatar>
						<img src="http://www.gravatar.com/avatar/32dc008f58672e97fd61b77ad4510331?s=181" alt="John">
					</v-list-tile-avatar>

					<v-list-tile-content>
						<v-list-tile-title v-html="$auth.user.fullName"></v-list-tile-title>
						<v-list-tile-sub-title v-html="$auth.user.fullName.email"></v-list-tile-sub-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile>
					<v-list-tile-content>
						<v-select
								:items="SHARE_OPTIONS"
								v-model="shareSelected"
								label="Select"
								item-text="name"
								item-value="name"
								multiple
								chips
								max-height="auto"
								autocomplete
								dark
						>
							<template slot="selection" slot-scope="data">
								<v-chip
										:selected="data.selected"
										:key="JSON.stringify(data.item)"
										close
										class="chip--select-multi"
										@input="data.parent.selectItem(data.item)"
								>
									{{ data.item.name }}
								</v-chip>
							</template>
							<template slot="item" slot-scope="data">
								<template v-if="typeof data.item !== 'object'">
									<v-list-tile-content v-text="data.item"></v-list-tile-content>
								</template>
								<template v-else>
									<v-list-tile-avatar>
										<v-icon>{{data.item.icon}}</v-icon>
									</v-list-tile-avatar>
									<v-list-tile-content>
										<v-list-tile-title v-html="data.item.name"></v-list-tile-title>
									</v-list-tile-content>
								</template>
							</template>
						</v-select>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile  avatar>
					<v-list-tile-avatar>
						<v-icon>print</v-icon>
					</v-list-tile-avatar>
					<v-list-tile-content>
						<v-list-tile-title>Vytisknout CV</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-spacer></v-spacer>
				<v-list-tile>
					<v-progress-linear class="theme--dark" dark value="75" height="20"></v-progress-linear>
				</v-list-tile>
			</v-list>
		</v-flex>
		<v-flex xs12 md8 align-end flexbox>
			<h2>Osobní údaje</h2>
		</v-flex>
	</v-layout>
</template>

<script>
	const SHARE_OPTIONS = [
		{ name: 'Profil je viditelný pro úřad práce', icon: 'user' },
		{ name: 'Profil je viditelný pro karierní poradce', icon: 'user' },
		{ name: 'Profil je viditelný pouze pro mě', icon: 'user' },
		{ name: 'Profil je viditelný pouze pro kohokoli', icon: 'user' },
		]

	export default {
		middleware: ['auth'],
		AUTH_ROLE: ['ROLE_USER'],
		data() {
			return {
				SHARE_OPTIONS,
				shareSelected: [],
			}
		}
	}
</script>
