<template>
  <v-container>
    <v-subheader>
      <v-icon left>
        mdi-calendar-today
      </v-icon>
      <span>
        今日のイベント
      </span>
      <v-spacer />
      <v-btn text>
        もっと見る
      </v-btn>
    </v-subheader>
    <v-row>
      <v-col
        v-for="i in 8"
        :key="i"
        cols="12"
        md="3"
      >
        <v-skeleton-loader
          type="list-item-avatar-three-line"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
