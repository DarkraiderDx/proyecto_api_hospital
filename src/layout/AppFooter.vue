<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';


const { setScale, layoutConfig } = useLayout();

const scales = ref([12, 13, 14, 15, 16]);

const decrementScale = () => {
    setScale(layoutConfig.scale.value - 1);
    applyScale();
};
const incrementScale = () => {
    setScale(layoutConfig.scale.value + 1);
    applyScale();
};

const applyScale = () => {
    document.documentElement.style.fontSize = layoutConfig.scale.value + 'px';
};

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'HTNP-FGENM-WHITE' : 'HTNP-FGENM-P'}.png`;
});
</script>

<template>
    <footer class="container-footer">
        <div class="content-footer">
            <div class="item-footer left-footer">
                
            </div>
            <div class="item-footer center-footer">
                <div class="footer-layout">
                    <img :src="logoUrl" alt="Logo" height="20" class="mr-2" />
                    por
                    <span class="font-medium ml-2">HTNP-FGENM</span>
                </div>
            </div>
            <div class="right-footer">
               
                <div class="flex align-items-center"> <strong>Escala: </strong>
                    <Button icon="pi pi-minus" type="button" @click="decrementScale()" class="p-button-text p-button-rounded w-2rem h-2rem mr-2" :disabled="layoutConfig.scale.value === scales[0]"></Button>
                    <div class="flex gap-2 align-items-center">
                        <i class="pi pi-circle-fill text-300" v-for="s in scales" :key="s" :class="{ 'text-primary-500': s === layoutConfig.scale.value }"></i>
                    </div>
                    <Button icon="pi pi-plus" type="button" pButton @click="incrementScale()" class="p-button-text p-button-rounded w-2rem h-2rem ml-2" :disabled="layoutConfig.scale.value === scales[scales.length - 1]"></Button>
                </div>
            </div>
        </div>
  </footer>
</template>
<style lang="scss" scoped>
</style>

