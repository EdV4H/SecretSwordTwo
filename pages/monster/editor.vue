<template>
  <v-card max-width="800" class="mx-auto">
    <v-list two-line subheader>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h5 my-3">
            モンスターの詳細
          </v-list-item-title>
          <v-list-item-subtitle>モンスターを編集できます。</v-list-item-subtitle>
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
          mdi-image
        </v-icon>
        <span class="text-h6">写真情報</span>
      </v-subheader>
      <v-card-text>
        <v-btn
          color="primary"
          @click="selectFile"
        >
          <v-icon left>
            mdi-paperclip
          </v-icon>
          ファイルを選択
        </v-btn>
        <input
          ref="input"
          style="display: none"
          type="file"
          @change="bind()"
        >
        <!-- Note that 'ref' is important here (value can be anything). read the description about `ref` below. -->
        <vue-croppie
          ref="croppieRef"
          :enable-orientation="true"
          :enable-resize="false"
          :boundary="{ width: 300, height: 300 }"
          :viewport="{ width: 300, height: 300 }"
        />
      </v-card-text>
      <v-divider class="mx-2 mb-2" />
      <v-subheader>
        <v-icon large left>
          mdi-text-box
        </v-icon>
        <span class="text-h6">基本情報</span>
      </v-subheader>
      <v-card-text>
        <base-row label="モンスター名" partition="3">
          <base-text-field
            v-model="data.name"
            label="モンスター名を入力"
          />
        </base-row>

        <base-row label="説明" partition="3">
          <base-text-field
            v-model="data.description"
            label="説明を入力"
          />
        </base-row>

        <base-row label="HP/SPD" partition="3">
          <v-row dense>
            <v-col cols="6">
              <base-text-field
                v-model.number="data.hp"
                label="HPを入力"
                type="number"
              />
            </v-col>
            <v-col cols="6">
              <base-text-field
                v-model.number="data.spd"
                label="SPDを入力"
                type="number"
              />
            </v-col>
          </v-row>
        </base-row>

        <base-row label="ATK/DEF" partition="3">
          <v-row dense>
            <v-col cols="6">
              <base-text-field
                v-model.number="data.atk"
                label="ATKを入力"
                type="number"
              />
            </v-col>
            <v-col cols="6">
              <base-text-field
                v-model.number="data.def"
                label="DEFを入力"
                type="number"
              />
            </v-col>
          </v-row>
        </base-row>
      </v-card-text>
      <v-divider class="mx-2 mb-2" />
      <v-subheader>
        <v-icon large left>
          mdi-book-open-blank-variant
        </v-icon>
        <span class="text-h6">スキル</span>
      </v-subheader>
      <v-card-text>
        <base-row label="スキル１" partition="3">
          <v-autocomplete
            v-model="data.skillId1"
            :items="skills"
            :loading="isLoading"
            :search-input.sync="search"
            color="white"
            hide-no-data
            hide-selected
            item-text="name"
            item-value="id"
            label="Public APIs"
            placeholder="Start typing to Search"
            prepend-icon="mdi-database-search"
            return-object
          />
        </base-row>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'

import { createMonster, updateMonster } from '../../graphql/mutations'
import { getMonster, searchSkills } from '~/graphql/queries'

export default {
  middleware: 'auth',
  data () {
    return {
      valid: true,
      isNew: true,
      data: {
        id: null,
        name: '',
        description: null,
        imageUrl: null,
        hp: null,
        spd: null,
        atk: null,
        def: null,
        skillId1: null,
        skillId2: null,
        skillId3: null,
        skillId4: null
      },

      descriptionLimit: 60,
      skills: [],
      isLoading: false,
      model: null,
      search: null
    }
  },
  mounted () {
    if (this.$route.query.id) {
      this.isNew = false
      this.getData()
    } else {
      this.data.id = this.generateUuid()
    }
  },
  watch: {
    async search (val) {
      console.log(val)
      if (val === '') { return }

      // Items have already been requested
      if (this.isLoading) { return }

      this.isLoading = true

      const res = await API.graphql(graphqlOperation(searchSkills, {
        filter: {
          or: [
            { name: { wildcard: '*' + val + '*' } },
            { name: { match: val } }
          ]
        },
        limit: 20
      }))
      console.log(res)
      this.skills = res.data.searchSkills.items
      console.log(this.skills)

      this.isLoading = false
    }
  },
  methods: {
    async getData () {
      if (!this.$route.query.id) { return }
      const res = await API.graphql(graphqlOperation(getMonster, {
        id: this.$route.query.id
      }))
      this.data = res.data.getMonster
    },
    selectFile () {
      if (this.$refs.input !== undefined) {
        this.$refs.input.click()
      }
    },
    bind () {
      const self = this
      const fileObject = this.$refs.input.files[0]
      const reader = new FileReader()

      reader.onload = function (event) {
        self.$refs.croppieRef.bind({
          url: event.target.result
        })
      }
      reader.readAsDataURL(fileObject)
    },
    async uploadIcon () {
      const options = {
        type: 'blob'
      }
      const filepath = 'monsters/' + this.data.id + '/images/icon.png'
      const output = await this.$refs.croppieRef.result(options)
      await Storage.put(filepath, output)
      this.data.imageUrl = filepath
    },
    async postData () {
      if (!this.$refs.form.validate()) { return }
      if (this.isNew) {
        this.data.timestamp = Math.floor(Date.now() / 1000)
        await API.graphql(graphqlOperation(createMonster, {
          input: this.data
        }))
      } else {
        await API.graphql(graphqlOperation(updateMonster, {
          input: this.data
        }))
      }
      await this.uploadIcon()
      this.$router.push('/monster')
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
