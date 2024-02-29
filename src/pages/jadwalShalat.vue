<script setup>
import axios from "axios"
import { onMounted, ref, watch } from "vue"

const data = ref([])
const location = ref(null)
const error = ref(null)
const dataTbale = ref([])
const dateNow = ref(null)
const myLocation = ref(null)
const loading = ref(false)

const fieldTable = ref([
  "Tanggal",
  "Subuh",
  "Terbit",
  "Zuhur",
  "Ashar",
  "Maghrib",
  "Isya",
  "Tengah Malam",
])

const showPosition = (position) => {
  location.value = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  }
}

const showError = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      error.value = "Izin lokasi ditolak oleh pengguna."
      break
    case error.POSITION_UNAVAILABLE:
      error.value = "Informasi lokasi tidak tersedia."
      break
    case error.TIMEOUT:
      error.value = "Waktu permintaan lokasi habis."
      break
    case error.UNKNOWN_ERROR:
      error.value = "Terjadi kesalahan yang tidak diketahui."
      break
  }
}

const getJadwalShalat = async () => {
  console.log(location.value)
  if (location.value !== null) {
    try {
      const response = await axios.get(
        `https://api.aladhan.com/v1/calendar/2024/2?latitude=${
          location.value.latitude
        }&longitude=${location.value.longitude}&method=15`
      )

      data.value = response.data.data

      data.value.forEach((item) => {
        console.log("ini item looping", item)
        const date = item.date.readable
        const fajr = item.timings.Fajr
        const sunrise = item.timings.Sunrise
        const dhuhr = item.timings.Dhuhr
        const asr = item.timings.Asr
        const maghrib = item.timings.Maghrib
        const isha = item.timings.Isha
        const imsak = item.timings.Imsak
        const midnight = item.timings.Midnight
        const locationNow = item.meta.timezone
        myLocation.value = locationNow

        dataTbale.value.push({
          date,
          fajr,
          imsak,
          sunrise,
          dhuhr,
          asr,
          maghrib,
          isha,
          midnight,
        })
      })
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }
}

const getLocation = () => {
  loading.value = true
  var today = new Date()
  var dd = String(today.getDate()).padStart(2, "0")
  var mm = String(today.toLocaleString("default", { month: "short" })) // Mendapatkan singkatan nama bulan
  var yyyy = today.getFullYear()

  var formattedDate = dd + " " + mm + " " + yyyy
  console.log(formattedDate) // Contoh output: "28 Feb 2024"

  console.log("fksalfks", formattedDate)

  dateNow.value = formattedDate
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError)
  } else {
    error.value = "Geolocation tidak didukung oleh browser ini."
  }
}

watch(location, (newLocation) => {
  if (newLocation !== null) getJadwalShalat()
})

onMounted(async () => {
  await getLocation()
})
</script>
<template>
  <div
    class="grid grid-cols-1  gap-3 w-full justify-content-between px-6 py-3 mx-5 my-6 max-w-screen-xl "
  >
    <div class="text-white">
      {{ myLocation }}
    </div>
    <div v-if="loading" class=" flex items-center justify-center align-center">
      <loading-ceomponent></loading-ceomponent>
    </div>

    <div v-else class="h-96 overflow-x-auto z-0">
      <table
        class=" z-0 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky-header"
        >
          <tr>
            <th v-for="field in fieldTable" scope="col" class="px-6 py-3">
              {{ field }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            :class="{
              'bg-orange-200': dateNow === itemtable.date,
              'bg-dark': dateNow !== itemtable.date,
            }"
            class="border-b dark:border-gray-700"
            v-for="itemtable in dataTbale"
          >
            <td class="px-6 py-4 font-bold  ">
              {{ itemtable.date }}
            </td>
            <td class="px-6 py-4">
              {{ itemtable.fajr }}
            </td>
            <td class="px-6 py-4">
              {{ itemtable.sunrise }}
            </td>
            <td class="px-6 py-4">
              {{ itemtable.dhuhr }}
            </td>
            <td class="px-6 py-4">
              {{ itemtable.asr }}
            </td>
            <td class="px-6 py-4">
              {{ itemtable.maghrib }}
            </td>
            <td class="px-6 py-4">
              {{ itemtable.isha }}
            </td>

            <td class="px-6 py-4">
              {{ itemtable.midnight }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
