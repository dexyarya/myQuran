<script setup>
import { shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'
const layout = shallowRef()
const route = useRoute()

watch(route, async ({ meta }) => {
  layout.value = (await import(`./layouts/${meta.layout || 'defaultLayout'}.vue`)).default

})
</script>

<template>
  <component :is="layout">
    <router-view  />
  </component>
</template>

<style scoped></style>
