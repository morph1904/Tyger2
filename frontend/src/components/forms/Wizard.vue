<template>
  <v-dialog v-model="show" max-width="700px">
    <v-alert
      :value="alert"
      type="error"
      dismissible
      transition="scale-transition"
    >There is a problem with your data, please check and try again.</v-alert>
    <v-card>
      <v-stepper v-model="step" alt-labels>
        <v-stepper-header>
          <v-stepper-step
            :complete="step > 1"
            step="1"
            editable
            :rules="[() => !errors.has('appName') && !errors.has('appURL')]"
          >Set up Application</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :complete="step > 2"
            step="2"
            editable
            :rules="[() => !errors.has('extURL')]"
          >Set up Domain</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">Configure Options</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-text-field
              name="appName"
              label="Name"
              append-icon="face"
              placeholder="Name"
              v-model="formData.appName"
              :error-messages="errors.collect('appName')"
              v-validate="'required'"
            ></v-text-field>
            <v-text-field
              name="appURL"
              label="URL"
              append-icon="lock"
              placeholder="http://<ip address/dns name>:<port>/"
              v-model="formData.appURL"
              :error-messages="errors.collect('appURL')"
              v-validate="'required'"
            ></v-text-field>
            <v-container>
              <v-layout row justify-space-between>
                <v-flex xs3>
                  <v-btn color="primary" @click="step = 2">Continue</v-btn>
                </v-flex>

                <v-flex xs3>
                  <v-btn flat @click.stop="show=false">Cancel</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-stepper-content>

          <v-stepper-content step="2">
            
            <v-text-field
              label="External URL"
              name="extURL"
              append-icon="face"
              placeholder="myapp.mydomain.com"
              v-model="formData.extURL"
              :error-messages="errors.collect('extURL')"
              v-validate="'required'"
            ></v-text-field>

            <v-switch color="primary" class="px-3" label="Use HTTPS?" v-model="formData.https"></v-switch>
            <v-switch
              color="primary"
              class="px-3"
              label="Redirect all to HTTPS?"
              v-model="formData.redirectHttps"
            ></v-switch>
            <v-container>
              <v-layout row justify-space-between>
                <v-flex xs3>
                  <v-btn color="primary" @click="step = 3">Continue</v-btn>
                </v-flex>
                <v-flex xs3>
                  <v-btn flat @click.stop="show=false">Cancel</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-switch
              color="primary"
              class="px-3"
              label="Skip SSL Verification on Backend?"
              v-model="formData.insecure_skip_verify"
            ></v-switch>
            <v-switch
              color="primary"
              class="px-3"
              label="Enable Websockets?"
              v-model="formData.websockets"
            ></v-switch>
            <v-switch
              color="primary"
              class="px-3"
              label="Transparent Mode?"
              v-model="formData.transparent"
            ></v-switch>
            <v-container>
              <v-layout row justify-space-between>
                <v-flex xs3>
                  <v-btn color="primary" @click="submit">
                    <v-icon>check</v-icon>Finish
                  </v-btn>
                </v-flex>
                <v-flex xs3>
                  <v-btn flat @click.stop="show=false">Cancel</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        appName: "",
        appURL: "",
        extURL: "",
        https: "",
        redirectHttps: "",
        websockets: "",
        transparent: "",
        insecure_skip_verify: ""
      },
      step: 1,
      alert: false,
      success: false,
    };
  },
  methods: {
    emitAlert(type, message) {
      const data = {
        type: type,
        message: message
      };
      this.$eventHub.$emit("new-alert", data);
    },
    resetForm(){
this.formData = {
              appName: "",
              appURL: "",
              extURL: "",
              https: "",
              redirectHttps: "",
              websockets: "",
              transparent: ""
            }
    },
    createAddress(url) { 
      let data = {
        address: this.formData.extURL,
        tls: this.formData.https,
        staging: this.formData.staging,
        app: url
      };
      this.$http
        .post("addresses/", data)
        .then(({ data }) => {
          this.success = true;
            this.emitAlert(
              "success",
              "New proxy created from " +
                this.formData.extURL +
                " to " +
                this.formData.appURL
            );
            this.show = false;
            this.resetForm();
            this.step = 1;
            
            this.$eventHub.$emit('newProxy')
        })
        .catch(() => {
          this.emitAlert("error", "Could not save the proxy! Please check your data and try again");
          this.status = "error"
          this.alert = true;
        });
    },
    createApp() { 
      let data = {
        name: this.formData.appName,
        url: this.formData.appURL,
        insecure_skip_verify: this.formData.insecure_skip_verify,
        websocket: this.formData.websockets,
        transparent: this.formData.transparent
      };
      this.$http
        .post("apps/", data)
        .then(({ data }) => {
          //this.success = true;
/*             this.emitAlert(
              "success",
              "New proxy created from " +
                this.formData.extURL +
                " to " +
                this.formData.appURL
            ); */
            //this.show = false;
            //this.resetForm();
            //this.step = 1;
            this.createAddress(data.url)
        })
        .catch(() => {
          this.emitAlert("error", "Could not save the proxy! Please check your data and try again");
          this.status = "error"
          this.alert = true;
        });
    },
    submit() {
      this.$validator.validate().then(result => {
        if (result) {
            this.createApp();
        }
      });
    }
  },
  props: {
    value: Boolean
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>