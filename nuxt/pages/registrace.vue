<template>
	<v-layout row wrap>
		<v-flex xs8 offset-xs2>
			<v-card>
				<v-container fluid fill-height>
					<v-layout row wrap fill-height>
						<v-flex xs12 align-end flexbox>
							<v-card>
								<h1>{{this.$t('page.register.header')}}</h1>
								<p class="text-muted">{{$t('page.register.subHeader')}}</p>
								<v-form v-model="isValid">
									<v-text-field
											v-model="email"
											:rules="emailRules"
											:label="$t('user.form.login.username')"
											required
									></v-text-field>
									<v-text-field
											v-model="password"
											:append-icon="isPasswordHidden ? 'visibility' : 'visibility_off'"
											:append-icon-cb="() => (isPasswordHidden = !isPasswordHidden)"
											:type="isPasswordHidden ? 'password' : 'text'"
											:label="$t('user.form.login.password')"
											:hint="$t('user.form.register.password.hint')"
											:rules="passRules"
											min="8"
									></v-text-field>
									<v-flex text-xs-right>
										<v-btn color="primary" :disabled="!isValid">{{$t('user.form.register.submit')}}</v-btn>
									</v-flex>
								</v-form>
							</v-card>
						</v-flex>
					</v-layout>
				</v-container>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
	export default {
		data() {
			return {
				isValid: false,
				isPasswordHidden: true,
				password: '',
				passRules: [
					v => !!v || this.$i18n.t('user.form.validation.password.required'),
					v => v.length >= 8 || this.$i18n.t('user.form.validation.password.short')
				],
				email: '',
				emailRules: [
					v => !!v || this.$t('user.form.validation.username.required'),
					v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$i18n.t('user.form.validation.username.invalid')
				]
			}
		}
	}
</script>
