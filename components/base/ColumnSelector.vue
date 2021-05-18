<template>
  <v-card>
    <v-toolbar color="#6a5acd" dark flat>
      <v-toolbar-title class="text-subtitle-1">
        列の表示/非表示
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text class="mt-2">
      <v-btn text small color="primary" @click="setAll(true)">
        全て選択
      </v-btn>
      <v-btn text small color="error" @click="setAll(false)">
        全て解除
      </v-btn>
      <v-virtual-scroll
        :items="checkList"
        :item-height="50"
        height="310"
        class="mt-3"
      >
        <template #default="{ item }">
          <v-sheet class="pa-4">
            <v-checkbox
              v-model="item.value"
              :label="item.data.text"
              class="mt-n2"
            />
          </v-sheet>
        </template>
      </v-virtual-scroll>
    </v-card-text>
    <v-divider class="mx-2 mt-n4" />
    <v-card-actions>
      <v-spacer />
      <v-btn class="mb-1 mx-2" color="success" @click="save()">
        保存
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    col: {
      type: Array,
      default: () => ([])
    },
    colList: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      checkList: []
    }
  },
  mounted () {
    this.colList.forEach((item) => {
      this.checkList.push({
        data: item,
        value: false
      })
    })
    this.col.forEach((item) => {
      this.checkList.find(x => x.data.value === item.value).value = true
    })
  },
  methods: {
    save () {
      const output = []
      this.checkList.forEach((item) => {
        if (item.value) { output.push(item.data) }
      })
      this.$emit('input', output)
    },
    setAll (value) {
      this.checkList.forEach((item) => {
        item.value = value
      })
    }
  }
}
</script>
