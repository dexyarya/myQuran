<script setup>
import Navbar from '../components/navbar.vue'
// import tabPage from '../components/tabPage.vue'

</script>

<template >
    <main>
        <Navbar class="sticky top-0" />
        <!-- <tabPage class="sticky top-16" /> -->

        <div class="dark:bg-black h-auto">
            <div class="dark:bg-black flex justify-evenly pt-4 h-full">
                <slot />
            </div>
        </div>
    </main>
</template>
