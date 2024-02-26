<script setup>
// create router page form alwuran doa and jadwal shalat
import { useRouter } from "vue-router"
const router = useRouter()
// create function to route to alquran page
const alquran = () => {
  router.push("/")
}
// create function to route to doa page
const doa = () => {
  router.push("/doa")
}
// create function to route to jadwal shalat page
const jadwalShalat = () => {
  router.push("/jadwal-shalat")
}
</script>

<template>
  <div class="w-full flex justify-center bg-black h-auto">
    <div
      class="flex flex-col sm:flex-row justify-evenly w-full sm:w-3/4 rounded-lg bg-black p-3 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
    >
      <div
        class="cursor-pointer flex flex-col items-center justify-center align-center text-white hover:text-green-400 mb-4 sm:mb-0 active:text-green-900"
        @click="alquran"
      >
        <img
          src="../assets/icons/islam.png"
          alt="alquran"
          class="max-w-full h-auto h-16 w-16 hidden sm:block"
        />
        <p class="mt-3">Al-Quran</p>
      </div>
      <div
        class="cursor-pointer flex flex-col items-center justify-center align-center text-white hover:text-green-400 mb-4 sm:mb-0"
        @click="doa"
      >
        <img
          src="../assets/icons/hand.png"
          alt="pray"
          class="max-w-full h-auto h-16 w-16 hidden sm:block"
        />
        <p class="mt-3">Doa</p>
      </div>
      <div
        class="cursor-pointer flex flex-col items-center justify-center align-center text-white hover:text-green-400"
        @click="jadwalShalat"
      >
        <img
          src="../assets/icons/islam.png"
          alt="alquran"
          class="max-w-full h-auto h-16 w-16 hidden sm:block"
        />
        <p class="mt-3">Jadwal Shalat</p>
      </div>
    </div>
  </div>
</template>
