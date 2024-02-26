<script setup>
import { computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

const store = useStore()
const router = useRouter()

// log env
console.log(import.meta.env.VITE_APP_URL)

const loading = computed(() => {
  return store.state.doaModule.loading
})

const data = computed(() => {
  return store.state.doaModule.doaList
})

const getDataDoa = async () => {
  console.log(import.meta.env.VITE_APP_URL_DOA)
  store.commit("doaModule/setLoading", true)
  try {
    await store.dispatch("doaModule/fetchDoaList")
    store.commit("doaModule/setLoading", false)
  } catch (error) {
    store.commit("doaModule/setLoading", false)
  }
}

const openDoaDetail = (paramId) => {
  router.push({ name: "doaDetail", params: { id: paramId } })
}

onMounted(() => {
  getDataDoa()
})
</script>

<template>
  <div class="mx-2 max-w-screen-xl">
    <div
      class="grid grid-cols-1 mb-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3  w-full justify-content-between "
    >
      <div
        v-if="loading"
        class=" flex items-center justify-center align-center"
      >
        <loading-ceomponent></loading-ceomponent>
      </div>

      <div
        v-else
        class="col justify-content-between  block w-full align-content-center justify-center rounded-lg bg-black p-3 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 hover:bg-green-800 cursor-pointer"
        v-for="(items, index) in data"
        :key="index"
      >
        <div
          class="flex flex-row w-full align-content-center gap-3 justify-between"
          @click="openDoaDetail(items.id)"
        >
          <div class="flex justify-between gap-3 ">
            <div
              class="rounded-full w-10 h-10 dark:bg-gray-600 flex items-center justify-center"
            >
              <p class="text-white">{{ index + 1 }}</p>
            </div>

            <div class="flex-col gap-0">
              <p
                class="text-xl text-base text-neutral-600 dark:text-neutral-200"
              >
                {{ items.judul }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
