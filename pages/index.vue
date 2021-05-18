<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-row>
        <v-col
          v-for="(menu, index) in menus"
          :key="index"
          cols="12"
        >
          <base-menu-card
            :title="menu.title"
            :to="menu.to"
            :icon="menu.icon"
            :color="menu.color"
            :information="menu.information"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: 'auth',
  data () {
    return {
      menus: [
        {
          title: 'スキル一覧',
          to: '/skill',
          icon: 'mdi-bridge',
          color: 'primary',
          information: ''
        }
      ]
    }
  }
}
</script>
