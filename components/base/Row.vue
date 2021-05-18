<template>
  <v-row dense class="mt-n2" align="baseline">
    <v-col :cols="partition">
      <span :class="labelClass+' '+labelTextClass">{{ label }}</span>
    </v-col>
    <v-col :cols="String(12-Number(partition))">
      <slot />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: undefined
    },
    labelClass: {
      type: String,
      default: ''
    },
    labelTextClass: {
      type: String,
      default: ''
    },
    partition: {
      type: String,
      default: '6'
    }
  }
}
</script>
