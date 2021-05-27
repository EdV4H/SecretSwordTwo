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
        <v-row>
          <v-col
            v-for="(color, index) in colors"
            :key="index"
            cols="2"
          >
            <v-avatar
              :color="color"
              size="36"
            />
          </v-col>
        </v-row>
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

        <v-btn-toggle
          v-model="trend"
          tile
          group
        >
          <v-btn value="hp">不死不朽</v-btn>
          <v-btn value="attack">獅子奮迅</v-btn>
          <v-btn value="defence">金剛不壊</v-btn>
          <v-btn value="speed">迅速果敢</v-btn>
          <v-btn value="customer">お客様第一</v-btn>
        </v-btn-toggle>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
import { API, Storage, graphqlOperation } from 'aws-amplify'
import Vibrant from 'node-vibrant'
import { createMonsterDna } from '~/graphql/mutations'

export default {
  middleware: 'auth',
  data () {
    return {
      valid: true,
      isNew: true,
      data: {
        id: null,
        dna: null,
        name: '',
        description: null,
        imageUrl: null
      },
      colors: [],
      trend: 'customer'
    }
  },
  mounted () {
    this.data.id = this.generateUuid()
  },
  methods: {
    selectFile () {
      if (this.$refs.input !== undefined) {
        this.$refs.input.click()
      }
    },
    bind () {
      const self = this
      const fileObject = this.$refs.input.files[0]
      if (!fileObject) { return }
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
      await this.uploadIcon()
      this.data.dna = await this.generateDNA()
      this.data.timestamp = Math.floor(Date.now() / 1000)
      await API.graphql(graphqlOperation(createMonsterDna, {
        input: this.data
      }))
      this.$router.push('/dna')
    },
    getElemement (color) {
      const h = Math.floor(color[0] * 360)
      if (h < 30) {
        return 0 // 火
      } else if (h < 105) {
        return 1 // 光
      } else if (h < 180) {
        return 2 // 草
      } else if (h < 255) {
        return 3 // 水
      } else if (h < 300) {
        return 4 // 闇
      } else {
        return 0 // 火
      }
    },
    getStatus (trend) {
      const border = 200 + Math.floor(Math.random() * 100)
      console.log(border)
      let verify = false
      let status = []
      while (!verify) {
        let sum = 0
        status = []
        for (let i = 0; i < 5; i++) {
          let tmp = 0
          while (tmp === 0 || tmp === 100) {
            tmp = Math.floor(Math.random() * 100)
          }
          sum = sum + tmp
          status.push(tmp)
        }
        if (sum < border) {
          verify = true
          switch (trend) {
            case 'hp':
              status[0] = status[0] + (border - sum)
              break
            case 'attack':
              status[1] = status[1] + (border - sum)
              break
            case 'defence':
              status[2] = status[2] + (border - sum)
              break
            case 'speed':
              status[3] = status[3] + (border - sum)
              break
            case 'customer':
              status[4] = status[4] + (border - sum)
              break
            default:
              break
          }
        }
      }
      let output = ''
      for (const s of status) {
        output = output + ('000' + String(s)).slice(-3)
      }
      return output
    },
    async generateDNA () {
      let dna = ''
      // getElementByColor
      this.colors = []
      const options = {
        type: 'base64'
      }
      const output = await this.$refs.croppieRef.result(options)
      const v = new Vibrant(output, {})
      const palette = await v.getPalette()
      let color = null
      if (Math.random() < 0.5) {
        color = palette.DarkVibrant.hsl
      } else {
        color = palette.LightVibrant.hsl
      }
      dna = String(this.getElemement(color))
      dna = dna + this.getStatus(this.trend)
      console.log(dna)
      return dna
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
