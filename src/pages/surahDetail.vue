<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import store from '../store'

const route = useRoute()
const loading = computed(() => {
    return store.state.surahModule.loading
})
const id = route.params.id
const data = computed(() => {
    return store.state.surahModule.surahDetail
})

// const audioElement = ref(null)




const getDataAlqurandetail = async () => {
    store.commit("surahModule/setLoading", true)
    try {

        await store.dispatch("surahModule/fetchSurahDetail", id)
        store.commit("surahModule/setLoading", false)
        console.log(data.value)

    } catch (error) {
        store.commit("surahModule/setLoading", false)

    }

}

const isPlaying = ref(Array(data.value.length).fill(false))
const audioElement = Array(data.value.length).fill(null).map(() => new Audio())

const toggleAudio = (audioSrc, index) => {
    const audio = audioElement[index]
    console.log(audioSrc)

    if (!isPlaying.value[index]) {
        audio.src = audioSrc
        audio.play()
        audio.addEventListener('ended', () => {
            isPlaying.value[index] = false
        })
    } else {
        audio.pause()
        audio.currentTime = 0
    }

    // Mengatur status ikon berdasarkan status pemutaran aktual
    isPlaying.value.forEach((playing, idx) => {
        if (idx !== index) {
            isPlaying.value[idx] = false
        }
    })
    isPlaying.value[index] = !isPlaying.value[index]
}
onMounted(() => {
    getDataAlqurandetail()
})

</script>

<template>
    <div class="mx-5 my-6 max-w-screen-xl w-full">
        <div v-if="loading" class=" flex items-center justify-center align-center">
            <loading-ceomponent></loading-ceomponent>
        </div>
        <div v-else class="grid grid-cols-1  gap-3 w-full justify-content-between ">
            <div v-for="(item, index) in data" :key="index"
                class="col justify-content-between block w-full align-content-center justify-center rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 hover:bg-green-800 cursor-pointer">
                <div class="flex flex-row w-full align-content-center items-center gap-4 justify-between">
                    <div class="flex items-center justify-center">
                        <button @click="toggleAudio(item.audio.minshawi, index)"
                            class="border-solid bg-green-800 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-16 h-16 focus:outline-none focus:shadow-outline flex items-center justify-center">
                            <svg v-if="!isPlaying[index]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48"
                                height="48" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                                <path d="M0 0h24v24H0z" fill="none" />
                            </svg>
                            <svg v-else viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M11 7H8V17H11V7Z" fill="#fcfcfc"></path>
                                    <path d="M13 17H16V7H13V17Z" fill="#fcfcfc"></path>
                                </g>
                            </svg>

                        </button>
                        <audio ref="audioElement" :src="item.audio.minshawi"></audio>
                    </div>


                    <div class="flex justify-between align-content-center justify-between items-center gap-4">


                    </div>

                    <h1
                        class="custom text-4xl text-neutral-600 dark:text-neutral-200 text-right mb-4 mt-4 leading-relaxed font-arabic">
                        <span class=" number text-base  text-neutral-600 dark:text-neutral-200">

                            <span class="bracket"> ﴾ </span> {{ item.number.inSurah }} <span class="bracket"> ﴿</span>

                        </span> {{ item.arab }}
                    </h1>
                </div>
                <div>
                    <p
                        class="text-base text-neutral-600 dark:text-neutral-200 text-right mb-4 mt-4 leading-relaxed text-justify">
                        {{ item.translation }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom {
    font-family: ilham;

}

.number {
    font-family: number;
}

.bracket {
    font-family: ilham;
    font-size: 2rem;
}
</style>

