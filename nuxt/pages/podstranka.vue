<template>
	<v-layout row wrap>
		<v-flex xs8 offset-xs2>
			<v-card>
				<v-card-title class="headline">Podstránka</v-card-title>
			</v-card>

			<v-card v-if="$auth.hasRole('ROLE_USER')">
				<v-card-title class="headline">Viditelné pro uživatele</v-card-title>
			</v-card>

			<v-card v-if="$auth.hasRole('ROLE_ADMIN')">
				<v-card-title class="headline">Viditelné pro admina</v-card-title>
			</v-card>
		</v-flex>
	</v-layout>
</template>
