<script setup lang="ts">
const props = defineProps({
    displayText: {
        type: String,
        default: 'Default Button'
    },
    isActive: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <button class="w-full py-3 sm:py-4 rounded-xl text-gray-700 dark:text-gray-300 transition-colors duration-500"
        :class="[props.isActive ? 'bg-gray-400/50 hover:bg-gray-400 dark:bg-zinc-500 dark:hover:bg-zinc-500/80' : 'bg-gray-300/50 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-700/80']">
        {{ props.displayText }}
    </button>
</template>