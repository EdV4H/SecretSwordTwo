<template>
  <v-card :to="to">
    <v-list>
      <v-list-item>
        <v-list-item-avatar size="60">
          <v-icon
            :class="color"
            dark
          >
            {{ icon }}
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ title }}
          </v-list-item-title>
        </v-list-item-content>

        <!--<v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">
              mdi-information
            </v-icon>
          </v-btn>
        </v-list-item-action>-->
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'No Title'
    },
    icon: {
      type: String,
      default: undefined
    },
    color: {
      type: String,
      default: 'primary'
    },
    information: {
      type: String,
      default: 'No Information'
    },
    to: {
      type: String,
      default: '/'
    }
  }
}
</script>
