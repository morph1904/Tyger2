<template>
	<v-layout row wrap>
		<v-flex xs8 offset-xs2>
			<v-card>
				<v-card-title class="headline">Admin zóna</v-card-title>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
	export default {
		middleware: ['auth'],
		AUTH_ROLE: ['ROLE_ADMIN']
	}
</script>
