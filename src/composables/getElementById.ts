import { ref, onMounted } from "vue";

export default function getElementById(elementId: string) {
    const element = ref<HTMLInputElement>()

    onMounted(() => {
        element.value = document.getElementById(elementId) as HTMLInputElement
    })

    return element
}