<template>
	<v-layout row wrap>
		<v-flex xs8 offset-xs2>
			<v-card>
				<v-card-title class="headline">Chyba {{error.statusCode}}</v-card-title>
				<v-card-title  v-if="error.statusCode === 404">{{$t('error.404')}}</v-card-title>
				<v-card-title  v-else-if="error.message">{{$t(error.message)}}</v-card-title>
				<v-card-title  v-else>{{$t('error.unknown')}}</v-card-title>
				<v-btn to="/">{{$t('link.homepage')}}</v-btn>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
	export default {
		props: ['error'],
	}
</script>
