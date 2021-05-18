<template>
  <v-textarea
    outlined
    dense
    single-line
    v-bind="{
      rows: 3,
      ...$attrs,
    }"
    v-on="$listeners"
  />
</template>
