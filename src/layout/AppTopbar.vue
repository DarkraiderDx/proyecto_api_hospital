<template>
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" />
            <span>HTNP "FGENM"</span>
        </router-link>

        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>
        <p class=" m-5">HTNP "FGENM"</p>
        <!-- lara-dark-purple, lara-light-purple -->
        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <h6 class=" p-3">{{ person.nombres }} {{ person.paternal }} {{ person.maternal }}</h6>
            <button class="p-link layout-topbar-button" v-if="!isTheme"  @click="onChangeTheme('lara-light-purple', 'light')">
                <i class="pi pi-moon"></i>
            </button>
            <button class="p-link layout-topbar-button" v-if="isTheme" @click="onChangeTheme('lara-dark-purple', 'dark')">
                <i class="pi pi-sun"></i>
            </button>
            <button @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
                <i class="pi pi-user"></i>
                <span>Perfil</span>
            </button>
            <button @click="exit" class="p-link layout-topbar-button bg-red-300">
                <i class="pi pi-power-off"></i>
                <span>cerrar sesión</span>
            </button>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import authService from '../service/AuthService';

const { changeThemeSettings, layoutConfig, onMenuToggle } = useLayout();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();

onMounted(() => {
    persona()
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});
const person=ref({nombres:'',paternal:'',maternal:''});
const persona = () => {
  person.value.nombres = localStorage.getItem("nombres") !== 'null' ? localStorage.getItem("nombres") : '';
  person.value.paternal = localStorage.getItem("paternal") !== 'null' ? localStorage.getItem("paternal") : '';
  person.value.maternal = localStorage.getItem("maternal") !== 'null' ? localStorage.getItem("maternal") : '';
}

const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
    router.push({name:'Perfil'});
};

const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;
    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');
    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
const exit = () =>{
    Swal.fire({
            title: "¿Esta segura de Cerrar Sesión",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Cerrar Sesión",
            confirmButtonColor: "#900C3E",
            denyButtonText: `No guardar`
            }).then( async (result) =>{
                if (result.isConfirmed) {
                    await authService.logout();
                    localStorage.clear();
                        Swal.fire({
                        title: "Exito",
                        text: "Se Cerro Su Sesión Exitosamente",
                        icon: "success",
                        confirmButtonColor: "#0C902D"
                        });
                            router.push('/')
                } 
                });    
}
const isTheme = ref(true);

const onChangeTheme = (theme, mode) => {
    const elementId = 'theme-css';
    const linkElement = document.getElementById(elementId);
    const cloneLinkElement = linkElement.cloneNode(true);
    const newThemeUrl = linkElement.getAttribute('href').replace(layoutConfig.theme.value, theme);
    cloneLinkElement.setAttribute('id', elementId + '-clone');
    cloneLinkElement.setAttribute('href', newThemeUrl);
    cloneLinkElement.addEventListener('load', () => {
        linkElement.remove();
        cloneLinkElement.setAttribute('id', elementId);
        changeThemeSettings(theme, mode === 'dark');
    });
    linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
    isTheme.value = !isTheme.value;
    console.log(theme, mode);
};

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'HTNP-FGENM' : 'HTNP-FGENM'}.png`;
});

const perfil =() =>{
    router.push({name:'Perfil'});
}
</script>

<style lang="scss" scoped></style>
