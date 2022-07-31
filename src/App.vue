<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>

<template>
    <div class="w-full min-h-screen flex justify-center bg-white dark:bg-zinc-900 transition-colors duration-500">
        <div class="w-full sm:w-10/12 px-4 min-h-screen py-20 flex items-center">
            <Header />
            <router-view />
        </div>
    </div>
</template>
