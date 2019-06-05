<template>
	<v-form v-model="isValid">
		<v-text-field
				v-model="username"
				:rules="usernameRules"
				:label="$t('user.form.login.username')"
				required
		></v-text-field>
		<v-text-field
				v-model="password"
				:append-icon="isPasswordHidden ? 'visibility' : 'visibility_off'"
				:append-icon-cb="() => (isPasswordHidden = !isPasswordHidden)"
				:type="isPasswordHidden ? 'password' : 'text'"
				:label="$t('user.form.login.password')"
		></v-text-field>
		<v-flex text-xs-right>
			<v-btn color="primary" @click="login" :disabled="!isValid">{{$t('user.form.login.submit')}}</v-btn>
		</v-flex>

	</v-form>
</template>

<script>
	export default {
		data() {
			return {
				isValid: false,
				isPasswordHidden: true,
				password: '',
				username: '',
				usernameRules: [
					v => !!v || this.$t('user.form.validation.username.required')
					// v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$i18n.t('validation.email.invalid')
				]
			}
		},
		methods: {
			login() {
				if (this.isValid === true) {
					this.$auth.login(this.username, this.password)
				}
			}
		}
	}
</script>
