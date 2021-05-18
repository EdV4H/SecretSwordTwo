<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      dark
    >
      <v-list nav>
        <template v-for="item in items">
          <v-row
            v-if="item.heading"
            :key="item.heading"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-center"
            >
              <a
                href="#!"
                class="body-2 black--text"
              >EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template #activator>
              <v-list-item-content>
                <v-list-item-text>
                  {{ item.text }}
                </v-list-item-text>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              :to="child.to"
              link
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-text>
                  {{ child.text }}
                </v-list-item-text>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.text"
            :to="item.to"
            :href="item.href"
            link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        class="ml-0 pl-4"
      >
        {{ title }} - ver {{ ver }}
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: true,
      items: [
        {
          icon: 'mdi-home',
          text: 'ホーム',
          to: '/'
        },
        // {
        //  icon: 'mdi-chevron-up',
        //  'icon-alt': 'mdi-chevron-down',
        //  text: 'カテゴリー',
        //  model: true,
        //  children: [
        //  ]
        // },
        {
          text: 'スキル一覧',
          to: '/skill',
          icon: 'mdi-bridge'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Secret Sword Ⅱ',
      ver: 'β1.00'
    }
  },
  mounted () {
    if (this.$vuetify.breakpoint.lgAndUp) { this.drawer = true }
  }
}
</script>
