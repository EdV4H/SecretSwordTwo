<template>
  <v-card>
    <v-list two-line subheader>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h5 my-3">
            スキル - {{ $route.params.id }}
          </v-list-item-title>
          <v-list-item-subtitle>スキルを確認・追加・編集ができます。</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-row class="mr-1">
            <v-btn color="error" fab dark class="mx-1" :to="{ name: 'dna-id-skills-editor', params: { id: $route.params.id } }">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-row>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-card-text>
      <base-monster-profile
        :monsterId="$route.params.id"
      />

      <v-dialog v-model="dialog" max-width="400px">
        <template #activator="{ on }">
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            v-on="on"
          >
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        <base-column-selector :col="headers" :col-list="headerList" @input="setHeaders" />
      </v-dialog>

      <v-data-table
        :headers="headers"
        :items="displayItems"
        :items-per-page="30"
        sort-by="number"
        class="elevation-0"
        :footer-props="{
          itemsPerPageAllText: 'すべて表示',
          itemsPerPageOptions: [30, 50, 100, -1],
          itemsPerPageText: '表示数',
          pageText: '{0}-{1}件目を表示中（全{2}件）',
          showCurrentPage: true,
          showFirstLastPage: true,
        }"
      >
        <template #[`item.elements`]="{ item }">
          <v-chip
            :color="getColor(item.elements)"
            dark
          >
            {{ getElements(item.elements) }}
          </v-chip>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-btn x-small icon :to="{ name: 'dna-id-skills-editor', query: { id: item.skillId } }">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import { listSkills } from '../../../../graphql/queries'

export default {
  middleware: 'auth',
  data () {
    return {
      dialog: false,
      delId: undefined,
      tab: 0,
      headers: [
        { text: 'スキル名', value: 'name' },
        { text: '説明', value: 'description' },
        { text: '作成者', value: 'owner' },
        { text: '属性', value: 'elements' },
        { text: '威力', value: 'power' },
        { text: '命中率', value: 'hitrate' },
        { text: '操作', value: 'actions' }
      ],
      headerList: [
        { text: 'スキル名', value: 'name' },
        { text: '説明', value: 'description' },
        { text: '作成者', value: 'owner' },
        { text: '属性', value: 'elements' },
        { text: '威力', value: 'power' },
        { text: '命中率', value: 'hitrate' },
        { text: '操作', value: 'actions' }
      ],
      data: []
    }
  },
  computed: {
    displayItems () {
      return this.data
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.getData()
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    async getData () {
      const res = await API.graphql(graphqlOperation(listSkills, {
        limit: 9999999,
        monsterId: this.$route.params.id
      }))
      this.data = res.data.listSkills.items
    },
    openDelDialog (id) {
      this.delId = id
      this.delDialog = true
    },
    setHeaders (headers) {
      this.headers = headers
      this.dialog = false
    },
    getColor (elements) {
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
    getElements (elements) {
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
