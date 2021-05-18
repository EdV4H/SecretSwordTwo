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
        <base-row label="スキル1" partition="3">
          <v-btn
            class="ma-1"
            plain
            @click="openSkillDialog(1)"
          >
            {{ data.skillId1 ? data.skill1.name : 'スキルを選択する' }}
          </v-btn>
        </base-row>
        <base-row label="スキル2" partition="3">
          <v-btn
            class="ma-1"
            plain
            @click="openSkillDialog(2)"
          >
            {{ data.skillId2 ? data.skill2.name : 'スキルを選択する' }}
          </v-btn>
        </base-row>
        <base-row label="スキル3" partition="3">
          <v-btn
            class="ma-1"
            plain
            @click="openSkillDialog(3)"
          >
            {{ data.skillId3 ? data.skill3.name : 'スキルを選択する' }}
          </v-btn>
        </base-row>
        <base-row label="スキル4" partition="3">
          <v-btn
            class="ma-1"
            plain
            @click="openSkillDialog(4)"
          >
            {{ data.skillId4 ? data.skill4.name : 'スキルを選択する' }}
          </v-btn>
        </base-row>
      </v-card-text>
    </v-form>
    <v-dialog v-model="skillDialog" max-width="600px">
      <v-card>
        <v-list two-line subheader color="primary" dark>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h5 my-3">スキル選択</v-list-item-title>
              <v-list-item-subtitle>スキルを検索して下さい。</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card-text>
          <v-autocomplete
            v-model="selectSkill"
            :items="skills"
            :loading="isLoading"
            :search-input.sync="search"
            color="white"
            hide-no-data
            hide-selected
            item-text="name"
            item-value="id"
            label="技を検索"
            placeholder="Start typing to Search"
            prepend-icon="mdi-database-search"
            return-object
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="" @click="delDialog = false">キャンセル</v-btn>
          <v-btn color="primary" @click="setSkill()"><v-icon left>mdi-book-open-blank-variant</v-icon>変更する</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { API, Storage, graphqlOperation } from 'aws-amplify'

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
        skillId4: null,
        skill1: null,
        skill2: null,
        skill3: null,
        skill4: null
      },

      skills: [],
      skillDialog: false,
      selectNum: null,
      selectSkill: null,
      isLoading: false,
      model: null,
      search: null
    }
  },
  async mounted () {
    if (this.$route.query.id) {
      this.isNew = false
      await this.getData()
    } else {
      this.data.id = this.generateUuid()
    }
  },
  watch: {
    async search (val) {
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
      this.skills = res.data.searchSkills.items

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
      const image = await Storage.get(this.data.imageUrl)
      this.$refs.croppieRef.bind({
        url: image
      })
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
      console.log(this.data)
      if (!this.$refs.form.validate()) { return }
      await this.uploadIcon()
      delete this.data.skill1
      delete this.data.skill2
      delete this.data.skill3
      delete this.data.skill4
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
      this.$router.push('/monster')
    },
    openSkillDialog (num) {
      this.selectNum = num
      this.skillDialog = true
    },
    setSkill () {
      switch (this.selectNum) {
        case 1:
          this.data.skill1 = this.selectSkill
          this.data.skillId1 = this.selectSkill.id
          break
        case 2:
          this.data.skill2 = this.selectSkill
          this.data.skillId2 = this.selectSkill.id
          break
        case 3:
          this.data.skill3 = this.selectSkill
          this.data.skillId3 = this.selectSkill.id
          break
        case 4:
          this.data.skill4 = this.selectSkill
          this.data.skillId4 = this.selectSkill.id
          break
      }
      this.selectNum = null
      this.selectSkill = null
      this.skillDialog = false
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
