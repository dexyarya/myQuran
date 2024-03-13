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
const hours = ref(null)
const minutes = ref(null)
const seconds = ref(null)
const timePrayer = ref(null)
const nextPray = ref(null)

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
  const year = dateNow.value.split(" ")[2]

  const formateDateTime = new Date().toLocaleDateString()

  const month = new Date(formateDateTime).getMonth() + 1

  if (location.value !== null) {
    try {
      const response = await axios.get(
        `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${
          location.value.latitude
        }&longitude=${location.value.longitude}&method=15`
      )

      data.value = response.data.data

      data.value.forEach((item) => {
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
        const delimeeter = "/"
        myLocation.value = getNameLocation(locationNow, delimeeter)

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

      setInterval(() => {
        getTimeShalat()
      }, 1000)
    } catch (error) {
    } finally {
      loading.value = false
    }
  }
}

const getNameLocation = (string, delimiters) => {
  var indexGarisMiring = string.indexOf(delimiters)
  if (indexGarisMiring === -1 || indexGarisMiring === string.length - 1) {
    return "Tidak ada karakter setelah delimiter"
  } else {
    return string.substring(indexGarisMiring + 1)
  }
}

const getLocation = () => {
  loading.value = true
  var today = new Date()
  var dd = String(today.getDate()).padStart(2, "0")
  var mm = String(today.toLocaleString("default", { month: "short" })) // Mendapatkan singkatan nama bulan
  var yyyy = today.getFullYear()

  var formattedDate = dd + " " + mm + " " + yyyy

  dateNow.value = formattedDate
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError)
  } else {
    error.value = "Geolocation tidak didukung oleh browser ini."
  }
}

const getTimeShalat = () => {
  const todayDate = dataTbale.value.find((item) => item.date === dateNow.value)

  if (todayDate) {
    var nextPrayer = ""
    var prayerTime = Object.keys(todayDate).filter(
      (key) => key !== "date" && key !== "midnight"
    )

    for (let i = 0; i < prayerTime.length; i++) {
      if (todayDate[prayerTime[i]] > new Date().toLocaleTimeString()) {
        nextPrayer = prayerTime[i]
        timePrayer.value = nextPrayer.toUpperCase()

        break
      }
    }

    if (prayerTime !== "") {
      var nextPrayerTime = todayDate[nextPrayer]
      nextPray.value = todayDate[nextPrayer]

      var prayerTime = new Date(dateNow.value + " " + nextPrayerTime)
      var timeDifference = prayerTime - new Date()

      hours.value = Math.floor(timeDifference / (1000 * 60 * 60))
      minutes.value = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      )
      seconds.value = Math.floor((timeDifference % (1000 * 60)) / 1000)
    }
  } else {
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
  <div class="mx-5 max-w-screen-x">
    <div class="text-white flex align-center justify-center w-full ">
      <div class="flex flex-col justify-center items-center">
        <h1>
          Waktu shalat <span>{{ timePrayer }}</span>
        </h1>
        {{ nextPray }}

        <h2>{{ hours }} : {{ minutes }} : {{ seconds }}</h2>
        <h2>
          Untuk wilayah <span> {{ myLocation }}</span>
        </h2>
      </div>
    </div>
    <div
      class="grid grid-cols-1  gap-3 w-full justify-content-between px-12 py-3  my-6  "
    >
      <div
        v-if="loading"
        class=" flex items-center justify-center align-center"
      >
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
  </div>
</template>
