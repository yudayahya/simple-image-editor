<script setup lang="ts">
import { reactive, ref } from 'vue'
import DefaultButton from '@/components/Button/Default.vue'
import IconButton from '@/components/Button/Icon.vue'
import getElementById from '@/composables/getElementById'
import { useData } from '@/stores/data'

interface ImageStyle {
    filter: string,
    transform: string
}

const filtersActive = ref<String | null>()
const inputImage = getElementById('input-image')
const dataImage = ref<File | null>()
const previewImage = ref<HTMLImageElement>()
const imageUrl = ref<string | ArrayBuffer | null>()
const filterData = useData()
const rangeFilters = ref<string>("100")
const previewImageStyle = reactive<ImageStyle>({
    filter: '',
    transform: ''
})

const applyFilters = () => {
    switch (filtersActive.value) {
        case 'Brightness':
            rangeFilters.value = filterData.brightness
            break;
        case 'Saturation':
            rangeFilters.value = filterData.saturation
            break;
        case 'Inversion':
            rangeFilters.value = filterData.inversion
            break;
        case 'Grayscale':
            rangeFilters.value = filterData.grayscale
            break;
        default:
            break;
    }

    previewImageStyle.filter = `brightness(${filterData.brightness}%) saturate(${filterData.saturation}%) invert(${filterData.inversion}%) grayscale(${filterData.grayscale}%)`
    previewImageStyle.transform = `rotate(${filterData.rotate}deg) scale(${filterData.horizontalFlip}, ${filterData.verticalFlip})`
}

const btnClick = (btnName: String) => {
    filtersActive.value = filtersActive.value == btnName ? null : btnName
    applyFilters()
}

const setTransform = (direction: string) => {
    switch (direction) {
        case 'right':
            filterData.setRightRotate()
            break;
        case 'left':
            filterData.setLeftRotate()
            break;
        case 'horizontal':
            filterData.setHorizontalFlip()
            break;
        case 'vertical':
            filterData.setVerticalFlip()
            break;
        default:
            break;
    }

    applyFilters()
}

const chooseImage = () => {
    inputImage.value?.click()
}

const handleFileUpload = async (e: Event) => {
    const target = e.target as HTMLInputElement
    if (target.files && target.files[0]) {
        dataImage.value = target.files[0]

        const reader = new FileReader()
        reader.onload = () => {
            imageUrl.value = reader.result
        }

        reader.readAsDataURL(dataImage.value)
        resetFilters()
    }
}

const updateFilter = () => {
    switch (filtersActive.value) {
        case 'Brightness':
            filterData.setBrightness(rangeFilters.value)
            break;
        case 'Saturation':
            filterData.setSaturation(rangeFilters.value)
            break;
        case 'Inversion':
            filterData.setInversion(rangeFilters.value)
            break;
        case 'Grayscale':
            filterData.setGrayscale(rangeFilters.value)
            break;
        default:
            break;
    }

    applyFilters()
}

const resetFilters = () => {
    filterData.resetData()
    applyFilters()
}

const downloadImage = () => {
    previewImage.value = document.getElementById('preview-image') as HTMLImageElement
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.height = previewImage.value.naturalHeight
    canvas.width = previewImage.value.naturalWidth
    ctx!.filter = previewImageStyle.filter
    ctx!.translate(canvas.width / 2, canvas.height / 2)
    if (filterData.rotate !== 0) {
        ctx!.rotate(filterData.rotate * Math.PI / 180)
    }
    ctx!.scale(filterData.horizontalFlip, filterData.verticalFlip)
    ctx!.drawImage(previewImage.value, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height)

    const link = document.createElement('a')
    link.download = dataImage.value!.name
    link.href = canvas.toDataURL()
    link.click()
}
</script>

<template>
    <div class="w-full p-3 sm:p-10 bg-gray-100 dark:bg-zinc-800 rounded-lg transition-colors duration-500">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div class="w-full order-2 sm:order-1">
                <div :class="imageUrl ? 'opacity-100' : 'opacity-30 pointer-events-none'">
                    <h1 class="text-gray-700 dark:text-gray-300 text-2xl font-bold mb-3">Filters</h1>
                    <div class="grid grid-cols-2 gap-4 mb-5">
                        <DefaultButton display-text="Brightness"
                            :is-active="filtersActive == 'Brightness' ? true : false" @click="btnClick('Brightness')" />
                        <DefaultButton display-text="Saturation"
                            :is-active="filtersActive == 'Saturation' ? true : false" @click="btnClick('Saturation')" />
                        <DefaultButton display-text="Inversion" :is-active="filtersActive == 'Inversion' ? true : false"
                            @click="btnClick('Inversion')" />
                        <DefaultButton display-text="Grayscale" :is-active="filtersActive == 'Grayscale' ? true : false"
                            @click="btnClick('Grayscale')" />
                    </div>
                    <div class="mb-5">
                        <div class="w-full flex justify-between">
                            <span class="text-gray-700 dark:text-gray-300 text-lg font-semibold">{{ filtersActive ?
                                    filtersActive : 'Select Filters'
                            }}</span>
                            <span class="text-gray-700 dark:text-gray-300 text-lg font-semibold">
                                {{ rangeFilters }}%
                            </span>
                        </div>
                        <input type="range" class="w-full" v-model="rangeFilters" min="0" max="200"
                            :class="filtersActive ? 'opacity-100' : 'opacity-30 pointer-events-none'"
                            @input="updateFilter">
                    </div>
                    <h1 class="text-gray-700 dark:text-gray-300 text-2xl font-bold mb-3">Rotate & Flip</h1>
                    <div class="w-full flex justify-between">
                        <IconButton button-class="w-16 h-12 sm:w-20 sm:h-14" icon-class="bx-rotate-right bx-md"
                            @click="setTransform('right')" />
                        <IconButton button-class="w-16 h-12 sm:w-20 sm:h-14" icon-class="bx-rotate-left bx-md"
                            @click="setTransform('left')" />
                        <IconButton button-class="w-16 h-12 sm:w-20 sm:h-14" icon-class="bx-reflect-horizontal bx-md"
                            @click="setTransform('vertical')" />
                        <IconButton button-class="w-16 h-12 sm:w-20 sm:h-14" icon-class="bx-reflect-vertical bx-md"
                            @click="setTransform('horizontal')" />
                    </div>
                </div>
                <div class="w-full mt-8" :class="imageUrl ? 'opacity-100' : 'opacity-30 pointer-events-none'">
                    <DefaultButton display-text="Reset Filters" @click="resetFilters" />
                </div>
                <div class="w-full grid grid-cols-2 gap-4 mt-4">
                    <DefaultButton display-text="Choose Image" @click="chooseImage" />
                    <DefaultButton display-text="Save Image" @click="downloadImage"
                        :class="imageUrl ? 'opacity-100' : 'opacity-30 pointer-events-none'" />
                </div>
            </div>
            <div class="w-full min-h-[208px] max-h-52 sm:max-h-[524px] order-1 sm:order-2 sm:col-span-2 bg-zinc-200 dark:bg-zinc-100/80 rounded-lg flex justify-center items-center overflow-hidden"
                :class="imageUrl ? 'cursor-default' : 'cursor-pointer'" @click="chooseImage">
                <img v-if="imageUrl" :src="imageUrl.toString()" id="preview-image"
                    class="object-contain max-h-52 sm:max-h-[524px]" :style="previewImageStyle">
                <span v-else><i class="bx bx-image-add bx-lg"></i></span>
            </div>
        </div>
        <input type="file" accept="image/*" class="hidden" id="input-image" @change="handleFileUpload">
    </div>
</template>