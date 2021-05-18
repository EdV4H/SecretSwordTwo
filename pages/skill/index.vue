<template>
  <v-card>
    <v-list two-line subheader>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h5 my-3">
            スキル
          </v-list-item-title>
          <v-list-item-subtitle>スキルを確認・追加・編集ができます。</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-row class="mr-1">
            <v-btn color="error" fab dark class="mx-1" to="/skill/editor">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-row>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-card-text>
      <v-row dense>
        <v-col cols="8">
          <base-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
          />
        </v-col>
      </v-row>

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
        :search="search"
        sort-by="number"
        class="elevation-1"
        :footer-props="{
          itemsPerPageAllText: 'すべて表示',
          itemsPerPageOptions: [30, 50, 100, -1],
          itemsPerPageText: '表示数',
          pageText: '{0}-{1}件目を表示中（全{2}件）',
          showCurrentPage: true,
          showFirstLastPage: true,
        }"
      >
        <template #[`item.actions`]="{ item }">
          <v-btn x-small icon :to="{ path: '/skill/editor', query: { id: item.id } }">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import { listSkills } from '../../graphql/queries'

export default {
  middleware: 'auth',
  data () {
    return {
      dialog: false,
      tab: 0,
      search: '',
      headers: [
        { text: 'スキル名', value: 'name' },
        { text: '説明', value: 'description' },
        { text: '威力', value: 'power' },
        { text: '命中率', value: 'hitrate' }
      ],
      headerList: [
        { text: 'スキル名', value: 'name' },
        { text: '説明', value: 'description' },
        { text: '威力', value: 'power' },
        { text: '命中率', value: 'hitrate' }
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
    this.getData()
  },
  methods: {
    async getData () {
      const res = await API.graphql(graphqlOperation(listSkills, { limit: 9999999 }))
      this.data = res.data.listSkills.items
    },
    setHeaders (headers) {
      this.headers = headers
      this.dialog = false
    }
  }
}
</script>
