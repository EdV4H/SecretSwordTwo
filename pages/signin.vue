<template>
  <v-container
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="#6a5acd"
            dark
            flat
          >
            <v-toolbar-title>Secret Sword Ⅱ にログイン</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <base-text-field
                v-model="loginid"
                label="ログインID"
                prepend-icon="mdi-account"
                :rules="[v => !!v || 'ログインIDを入力してください']"
                type="text"
                class="mt-4"
              />

              <base-text-field
                v-model="loginpw"
                label="パスワード"
                prepend-icon="mdi-lock"
                :rules="[v => !!v || 'パスワードを入力してください']"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="success" :disabled="!valid" @click="login()">
              ログイン
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
  data () {
    return {
      valid: false,
      loginid: '',
      loginpw: ''
    }
  },
  methods: {
    async login () {
      const res = await Auth.signIn(this.loginid, this.loginpw)
      if (res.challengeName === 'NEW_PASSWORD_REQUIRED') {
        res.completeNewPasswordChallenge(this.loginpw, {}, { onSuccess () {}, onFailure () {} })
      }
      this.$router.push('/')
    }
  }
}
</script>
