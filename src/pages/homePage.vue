<script setup>
import { onMounted, ref, computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from 'vuex'


const store = useStore()
const router = useRouter()

const loading = computed(() => {
  return store.state.surahModule.loading
})


const data = computed(() => {
  return store.state.surahModule.surahList
})
console.log(data.value)

const getDataAlquran = async () => {
  store.commit("surahModule/setLoading", true)
  try {
    await store.dispatch("surahModule/fetchSurahList")
    store.commit("surahModule/setLoading", false)
  } catch (error) {
    store.commit("surahModule/setLoading", false)
  }
}

const openSurahDetail = (paramId) => {
  router.push({ name: "detailPage", params: { id: paramId } })
}


onMounted(() => {
  getDataAlquran()
})
</script>

<template>
  <div class="mx-5 max-w-screen-xl">
    <div
      class="grid grid-cols-1 mb-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3  w-full justify-content-between ">
      <div v-if="loading" class=" flex items-center justify-center align-center">
        <loading-ceomponent></loading-ceomponent>
      </div>
      <div v-else
        class="col justify-content-between  block w-full align-content-center justify-center rounded-lg bg-black p-3 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 hover:bg-green-800 cursor-pointer"
        v-for="(items, index) in data" :key="index">
        <div @click="openSurahDetail(items.number)"
          class="flex flex-row w-full align-content-center gap-3 justify-between">
          <div class="flex justify-between gap-3 ">
            <div class="rounded-full w-10 h-10 dark:bg-gray-600 flex items-center justify-center">
              <p class="text-white">{{ items.number }}</p>
            </div>

            <div class="flex-col gap-0">
              <p class="text-xl text-base text-neutral-600 dark:text-neutral-200">
                {{ items.name }}
              </p>
              <p class=" text-base text-neutral-200 dark:text-neutral-200">
                {{ items.translation }}
              </p>
            </div>
          </div>

          <div class="justify-content-end">
            <h5 class="mb-2  font-medium leading-tight text-neutral-200 dark:text-neutral-50">
              {{ items.revelation }}
            </h5>
            <h5 class="mb-2  font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              {{ items.numberOfAyahs }}
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom {
  font-family: ilham;
}
</style>
