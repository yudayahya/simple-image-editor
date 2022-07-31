<script setup lang="ts">
import { onMounted, ref } from 'vue'

const darkMode = ref<boolean | null>()

const toggleBtn = () => {
    darkMode.value = !darkMode.value
    if (darkMode.value) {
        document.documentElement.classList.add("dark")
        localStorage.setItem('theme', 'dark')
    } else {
        document.documentElement.classList.remove("dark")
        localStorage.setItem('theme', 'light')
    }
}

onMounted(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
        darkMode.value = true
    } else {
        document.documentElement.classList.remove('dark')
        darkMode.value = false
    }
})
</script>


<template>
    <div
        class="fixed top-0 left-0 right-0 py-4 px-8 bg-white dark:bg-zinc-900 border-b border-gray-300 dark:border-gray-100/25 flex justify-end items-center transition-colors duration-500 z-50">
        <div class="h-5 w-10 bg-gray-200 dark:bg-gray-600 cursor-pointer rounded-full flex items-center px-1 transition-colors duration-500"
            @click="toggleBtn">
            <i class="bx bx-sun opacity-100 dark:opacity-0 text-black dark:text-white transition-all duration-300"></i>
            <i class="bx bx-moon opacity-0 dark:opacity-100 text-black dark:text-white transition-all duration-300"></i>
        </div>
    </div>
</template>