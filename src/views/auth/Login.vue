<template>

<div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-column align-items-center justify-content-center">
        <!-- <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" /> -->
        <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
            <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                <div class="text-center mb-5">
                    <img src="/layout/images/HTNP-FGENM.png" alt="Image" height="50" class="mb-3" />
                    <div class="text-900 text-3xl font-medium mb-3">¡Bienvenidol!</div>
                    <span class="text-600 font-medium">Inicio de Sección</span>
                </div> 
                <div>
                    <form @submit="login">
                    <label for="username" class="block text-900 text-xl font-medium mb-2">Ususario</label>
                    <InputText id="username" name="username" type="text" placeholder="Usuario..." autocomplete="off" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="user.username" />

                    <label for="password" class="block text-900 font-medium text-xl mb-2">Contraseña</label>
                    <Password id="password" name="password" v-model="user.password" placeholder="Contraseña.." :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

                    <div class="flex align-items-center justify-content-between mb-5 gap-5">
                        <div class="flex align-items-center">
                            <Checkbox v-model="checked" id="rememberme"  binary class="mr-2"></Checkbox>
                            <label for="rememberme">Recordar</label>
                        </div>
                        <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">¿Has olvidado tu contraseña?</a>
                    </div>
                    <Button label="Ingresar" type="submit" class="w-full p-3 text-xl"></Button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<!-- <AppConfig simple /> -->

<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed} from 'vue'
import authService from "./../../service/AuthService"
import { useRouter } from 'vue-router'
import ability from '../../casl/ability'
import Swal from 'sweetalert2'

// import AppConfig from '@/layout/AppConfig.vue';
const { layoutConfig } = useLayout();

const checked = ref(false);

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'HTNP-FGENM' : 'HTNP-FGENM'}.png`;
});


const router=useRouter()
const user=ref({ username: "", password: ""});
const errores=ref({})
const login= async (e)=>{
    e.preventDefault();
    try {
        const {data}= await authService.login(user.value)
        localStorage.setItem("access_token", data.access_token)
        localStorage.setItem("permissions", JSON.stringify(data.user.permissions))
        localStorage.setItem("ci", data.user.ci)
        localStorage.setItem("establecimiento", data.user.establishment)
        localStorage.setItem("establecimiento_cod", data.user.establishment_id)
        localStorage.setItem("nombres", data.user.names || '')
        localStorage.setItem("paternal", data.user.paternal || '')
        localStorage.setItem("maternal", data.user.maternal || '')
        ability.update(data.user.permissions)
        router.push({name: 'Admin' })
    } catch (error) {
        Swal.fire({
        title: "ERROR!!!",
        text: "Usuario o contraseña Incorrecta.",
        icon: "error",
        confirmButtonColor: "#900C3E"
        });
        user.value=ref({ username: "", password: ""});
       console.log("ERROR EN COMPONENTE LOGIN", error.response.data)
           errores.value= error.response.data.message
    }   
}
</script>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>