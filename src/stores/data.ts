import { defineStore } from 'pinia'

interface State {
    brightness: string
    saturation: string
    inversion: string
    grayscale: string
    rotate: number
    horizontalFlip: number
    verticalFlip: number
}

export const useData = defineStore({
    id: 'data',
    state: (): State => {
        return {
            brightness: "100",
            saturation: "100",
            inversion: "0",
            grayscale: "0",
            rotate: 0,
            horizontalFlip: 1,
            verticalFlip: 1
        }
    },
    getters: {
        getData: (state) => state
    },
    actions: {
        setBrightness(value: string) {
            this.brightness = value
        },
        setSaturation(value: string) {
            this.saturation = value
        },
        setInversion(value: string) {
            this.inversion = value
        },
        setGrayscale(value: string) {
            this.grayscale = value
        },
        setRightRotate() {
            this.rotate += 90
        },
        setLeftRotate() {
            this.rotate -= 90
        },
        setHorizontalFlip() {
            this.horizontalFlip = this.horizontalFlip === 1 ? -1 : 1
        },
        setVerticalFlip() {
            this.verticalFlip = this.verticalFlip === 1 ? -1 : 1
        },
        resetData() {
            this.$reset()
        }
    }
})
