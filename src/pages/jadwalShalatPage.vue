<script setup>
import axios from "axios"
import { onMounted, ref } from "vue"

const data = ref([])

const getJadwalShalat = async () => {
  try {
    const response = await axios.get(
      "https://api.aladhan.com/v1/calendar/2024/2?latitude=-6.235455&longitude=106.821048&method=15"
    )

    data.value = response.data.data
    // console.log(response.data.results.datetime[0].times)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getJadwalShalat()
})
</script>
<template>
  <div>
    <div>
      ini jadwal shjalat
    </div>
  </div>
</template>
