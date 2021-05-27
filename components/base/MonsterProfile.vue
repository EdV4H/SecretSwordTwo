<template>
  <v-list
    v-if="data"
    three-line
  >
    <v-list-item>
      <v-list-item-avatar
        size="200"
        rounded
      >
        <v-img :src="icon" />
      </v-list-item-avatar>

      <v-list-item-content v-if="$vuetify.breakpoint.smAndUp">
        <v-list-item-subtitle>
          <v-chip x-small>
            ID
          </v-chip>
          <span class="text-subtitle-2">{{ data.id }}</span>
        </v-list-item-subtitle>
        <v-list-item-title class="text-h4">
          {{ data.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          <v-chip
            :color="getColor(data.dna)"
            dark
          >
            {{ getElements(data.dna) }}
          </v-chip>
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <v-sheet
            height="90"
            class="mt-2"
          >
            <base-row label="モンスター説明" partition="3">
              <p>{{ data.description }}</p>
            </base-row>
          </v-sheet>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <slot />
      </v-list-item-action>
    </v-list-item>

    <v-list-item v-if="$vuetify.breakpoint.xs">
      <v-list-item-content>
        <v-list-item-subtitle>
          <v-chip x-small>
            ID
          </v-chip>
          <span class="text-subtitle-2">{{ data.id }}</span>
        </v-list-item-subtitle>
        <v-list-item-title class="text-h4">
          {{ data.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          <v-chip
            :color="getColor(data.dna)"
            dark
          >
            {{ getElements(data.dna) }}
          </v-chip>
        </v-list-item-subtitle>
        <v-list-item-subtitle class="pt-3">
          <base-row label="モンスター説明" partition="3">
            <p>{{ data.description }}</p>
          </base-row>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { API, graphqlOperation, Storage } from 'aws-amplify'
import { getMonsterDna } from '~/graphql/queries'

export default {
  props: {
    monsterId: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      data: undefined,
      icon: undefined
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const res = await API.graphql(graphqlOperation(getMonsterDna, {
        id: this.monsterId
      }))
      this.data = res.data.getMonsterDna
      this.icon = await Storage.get(this.data.imageUrl)
    },
    getColor (dna) {
      const elements = Number(dna.charAt(0))
      if (elements === 0) {
        return 'red'
      } else if (elements === 1) {
        return 'blue'
      } else if (elements === 2) {
        return 'green'
      } else if (elements === 3) {
        return 'yellow darken-3'
      } else if (elements === 4) {
        return 'purple'
      } else { return 'grey' }
    },
    getElements (dna) {
      const elements = Number(dna.charAt(0))
      if (elements === 0) {
        return '火'
      } else if (elements === 1) {
        return '水'
      } else if (elements === 2) {
        return '草'
      } else if (elements === 3) {
        return '光'
      } else if (elements === 4) {
        return '闇'
      } else { return '無' }
    }
  }
}
</script>
