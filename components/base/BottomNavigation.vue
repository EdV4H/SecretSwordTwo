<template>
  <v-bottom-navigation
    v-model="value"
    app
    grow
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-btn to="/">
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn @click="dialog.share = true">
      <span>Share</span>
      <v-icon>mdi-share-variant</v-icon>
    </v-btn>

    <v-btn to="/account">
      <span>Account</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>

    <v-dialog
      v-model="dialog.share"
      width="500"
    >
      <base-share-card />
    </v-dialog>
  </v-bottom-navigation>
</template>

<script>
export default {
  data () {
    return {
      dialog: {
        share: false
      },
      value: 0
    }
  }
}
</script>

<style>
.v-item-group.v-bottom-navigation .v-btn.v-size--default {
    height: inherit;
}
</style>
