<template>
  <v-card max-width="800" class="mx-auto">
    <v-list two-line subheader>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h5 my-3">
            スキルの詳細
          </v-list-item-title>
          <v-list-item-subtitle>スキルを編集できます。</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-row class="mr-1">
            <v-btn
              color="success"
              fab
              class="mx-1"
              :disabled="!valid"
              @click="postData()"
            >
              <v-icon>mdi-cloud-upload</v-icon>
            </v-btn>
          </v-row>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-divider class="mx-2 mb-2" />
      <v-subheader>
        <v-icon large left>
          mdi-text-box
        </v-icon>
        <span class="text-h6">基本情報</span>
      </v-subheader>
      <v-card-text>
        <base-row label="スキル名" partition="3">
          <base-text-field
            v-model="data.name"
            label="スキル名を入力"
          />
        </base-row>

        <base-row label="説明" partition="3">
          <base-text-field
            v-model="data.description"
            label="説明を入力"
          />
        </base-row>

        <base-row label="威力" partition="3">
          <base-text-field
            v-model.number="data.power"
            label="威力を入力"
            type="number"
          />
        </base-row>

        <base-row label="命中率" partition="3">
          <base-text-field
            v-model.number="data.hitrate"
            label="命中率を入力"
            type="number"
            suffix="%"
          />
        </base-row>

        <base-row label="属性" partition="3">
          <v-btn-toggle
            v-model="elements"
            mandatory
            tile
            group
          >
            <v-btn value="fire">火</v-btn>
            <v-btn value="water">水</v-btn>
            <v-btn value="leef">草</v-btn>
            <v-btn value="light">光</v-btn>
            <v-btn value="dark">闇</v-btn>
          </v-btn-toggle>
        </base-row>
      </v-card-text>

      <!--<v-divider class="mx-2 mb-2" />
      <v-subheader>
        <v-icon large left>
          mdi-shape-square-rounded-plus
        </v-icon>
        <span class="text-h6">追加効果</span>
      </v-subheader>-->
    </v-form>
  </v-card>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'

import { createSkill, updateSkill } from '../../../../graphql/mutations'
import { getSkill } from '~/graphql/queries'

export default {
  middleware: 'auth',
  data () {
    return {
      valid: true,
      isNew: true,
      elements: 'fire',
      data: {
        monsterId: null,
        skillId: null,
        name: '',
        description: null,
        power: null,
        hitrate: null,
        elements: null
      }
    }
  },
  mounted () {
    if (this.$route.query.id) {
      this.isNew = false
      this.getData()
    }
  },
  methods: {
    async getData () {
      if (!this.$route.query.id) { return }
      const res = await API.graphql(graphqlOperation(getSkill, {
        monsterId: this.$route.params.id,
        skillId: this.$route.query.id
      }))
      this.data = res.data.getSkill
    },
    getElements () {
      switch (this.elements) {
        case 'fire':
          return 0
        case 'water':
          return 1
        case 'leef':
          return 2
        case 'light':
          return 3
        case 'dark':
          return 4
      }
    },
    async postData () {
      if (!this.$refs.form.validate()) { return }
      this.data.elements = this.getElements()
      if (this.isNew) {
        this.data.monsterId = this.$route.params.id
        this.data.skillId = this.generateUuid()
        this.data.timestamp = Math.floor(Date.now() / 1000)
        await API.graphql(graphqlOperation(createSkill, {
          input: this.data
        }))
      } else {
        await API.graphql(graphqlOperation(updateSkill, {
          input: this.data
        }))
      }
      this.$router.push({ name: 'dna-id-skills', params: { id: this.$route.params.id } })
    },
    generateUuid () {
      // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
      // const FORMAT: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
      const chars = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split('')
      for (let i = 0, len = chars.length; i < len; i++) {
        switch (chars[i]) {
          case 'x':
            chars[i] = Math.floor(Math.random() * 16).toString(16)
            break
          case 'y':
            chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16)
            break
        }
      }
      return chars.join('')
    }
  }
}
</script>
