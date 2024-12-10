<script setup>
import { ref } from 'vue';
import { useAbility } from '@casl/vue';
const { can }=useAbility();
import AppMenuItem from './AppMenuItem.vue';
const model = ref([
    {
        label: 'Hostpital',
        items: [
                { label: 'Formulario D8', icon: 'pi pi-fw pi-book', to: '/admin/formulario-d8', visible:true },
                { label: 'Formulario P8', icon: 'pi pi-fw pi-book', to: '/admin/formulario-p8', visible:true },
                { label: 'Formulario D100', icon: 'pi pi-fw pi-book', to: '/admin/formulario-d100', visible:true },
                { label: 'Formulario P100', icon: 'pi pi-fw pi-book', to: '/admin/formulario-p100', visible:true },

            ]
    },
   
  
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
