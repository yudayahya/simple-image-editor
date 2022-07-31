<script setup lang="ts">
const props = defineProps({
    displayText: {
        type: String,
        default: 'Default Button'
    },
    buttonClass: {
        type: String,
        default: 'w-8 h-8'
    },
    iconClass: {
        type: String,
        default: 'bx-rotate-right bx-xs'
    }
})
</script>

<template>
    <button
        :class="props.buttonClass + ' rounded-xl bg-gray-300/50 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-700/80 text-gray-700 dark:text-gray-300 transition-colors duration-500 flex justify-center items-center'">
        <i :class="'bx ' + props.iconClass"></i>
    </button>
</template>