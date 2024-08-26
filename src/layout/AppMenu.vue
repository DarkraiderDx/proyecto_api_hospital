<script setup>
import { ref } from 'vue';
import { useAbility } from '@casl/vue';
const { can }=useAbility();
import AppMenuItem from './AppMenuItem.vue';
const model = ref([
    {
        label: 'Inicio',
        items: [{ label: 'Inicio', icon: 'pi pi-fw pi-home', to: '/admin', visible:true }
                ,{ label: 'Perfil', icon: 'pi pi-fw pi-user-edit', to: '/admin/perfil', visible:true }]
    },
    {
        label: 'Gestion Roles y Permisos',
        items: [
            { label: 'Usuario', icon: 'pi pi-fw pi-id-card', to: '/admin/user' , visible:can('index', 'user')},
            { label: 'Roles', icon: 'pi pi-fw pi-check-square', to: '/admin/role', visible:can('index', 'role')},
            { label: 'Permisos', icon: 'pi pi-fw pi-bookmark', to: '/admin/permission', visible:can('index', 'permission') },
        ],
        
    }
  
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
        <!-- <li>
            <a href="https://www.primefaces.org/primeblocks-vue/#/" target="_blank">
                <img src="/layout/images/banner-primeblocks.png" alt="Prime Blocks" class="w-full mt-3" />
            </a>
        </li> -->
    </ul>
</template>

<style lang="scss" scoped></style>
