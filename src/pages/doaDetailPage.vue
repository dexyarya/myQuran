<script setup>
import { ref, onMounted, computed } from "vue"
import { useRoute } from "vue-router"
import store from "../store"

const route = useRoute()
const loading = computed(() => {
  return store.state.doaModule.loading
})
const id = route.params.id
const data = computed(() => {
  return store.state.doaModule.doaDetail
})

const getDataDetailDoa = async () => {
  store.commit("doaModule/setLoading", true)
  try {
    await store.dispatch("doaModule/fetchDoaDetail", id)
    store.commit("doaModule/setLoading", false)
  } catch (error) {
    store.commit("doaModule/setLoading", false)
  }
}

onMounted(() => {
  getDataDetailDoa()
})
</script>
<template>
  <div class="mx-5 my-6 max-w-screen-xl w-full h-screen">
    <div v-if="loading" class=" flex items-center justify-center align-center">
      <loading-ceomponent></loading-ceomponent>
    </div>
    <div v-else class="grid grid-cols-1  gap-3 w-full justify-content-between ">
      <div
        class="col justify-content-start block w-full align-content-satart justify-satart rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 hover:bg-green-800 cursor-pointer"
      >
        <div>
          <h1
            class=" text-3xl  text-neutral-300 dark:text-neutral-200  mb-4 mt-4 leading-relaxed "
          >
            {{ data.judul }}
          </h1>
        </div>
        <h1
          class="custom text-4xl text-neutral-600 dark:text-neutral-200 text-right mb-4 mt-4 leading-relaxed font-arabic"
        >
          <span class=" number   text-neutral-600 dark:text-neutral-200">
            {{ data.arab }}
          </span>
        </h1>
        <div>
          <h2
            class="text-2xl text-white text-neutral-300 dark:text-neutral-200  mb-4 mt-4 leading-relaxed"
          >
            Latin:
          </h2>
          <h2
            class="text-1xl text-white text-neutral-300 dark:text-neutral-200  mb-4 mt-4 leading-relaxed"
          >
            {{ data.latin }}
          </h2>
        </div>

        <div>
          <h2
            class="text-2xl text-white text-neutral-300 dark:text-neutral-200  mb-4 mt-4 leading-relaxed"
          >
            Arti:
          </h2>
          <h2
            class="text-1xl text-white text-neutral-300 dark:text-neutral-200  mb-4 mt-4 leading-relaxed"
          >
            {{ data.terjemah }}
          </h2>
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
