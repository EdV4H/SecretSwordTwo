<template>
  <v-card>
    <v-list two-line subheader>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h5 my-3">
            モンスターDNA
          </v-list-item-title>
          <v-list-item-subtitle>モンスターDNAを確認・追加ができます。</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-row class="mr-1">
            <v-btn color="error" fab dark class="mx-1" to="/dna/editor">
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
        <template #[`item.actions`]="{ item }">
          <v-btn x-small icon :to="{ name: 'dna-id-skills', params: { id: item.id } }">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn x-small icon @click="openDelDialog(item.id)" class="mx-1">
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
    <v-dialog v-model="delDialog" max-width="600px">
      <v-card>
        <v-list two-line subheader color="error" dark>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h5 my-3">データ削除</v-list-item-title>
              <v-list-item-subtitle>データを削除しますか？この操作はやり直すことができません。</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="" @click="delDialog = false">キャンセル</v-btn>
          <v-btn color="error" @click="deleteData()"><v-icon left>mdi-trash-can</v-icon>削除する</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import { listMonsterDnas } from '../../graphql/queries'
import { deleteMonsterDna } from '~/graphql/mutations'

export default {
  middleware: 'auth',
  data () {
    return {
      dialog: false,
      delDialog: false,
      delId: undefined,
      tab: 0,
      search: '',
      headers: [
        { text: 'モンスター名', value: 'name' },
        { text: '説明', value: 'description' },
        { text: '作成者', value: 'owner' },
        { text: 'DNA', value: 'dna' },
        { text: '操作', value: 'actions' }
      ],
      headerList: [
        { text: 'モンスター名', value: 'name' },
        { text: '説明', value: 'description' },
        { text: '作成者', value: 'owner' },
        { text: 'DNA', value: 'dna' },
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
    this.getData()
  },
  methods: {
    async getData () {
      const res = await API.graphql(graphqlOperation(listMonsterDnas, { limit: 9999999 }))
      this.data = res.data.listMonsterDnas.items
    },
    openDelDialog (id) {
      this.delId = id
      this.delDialog = true
    },
    async deleteData () {
      await API.graphql(graphqlOperation(deleteMonsterDna, { input: { id: this.delId } }))
      this.delDialog = false
      await this.getData()
    },
    setHeaders (headers) {
      this.headers = headers
      this.dialog = false
    }
  }
}
</script>
