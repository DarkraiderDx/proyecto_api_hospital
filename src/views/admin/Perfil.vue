<template>
    <Suspense>
<template #default>
    <div class="card">
    <h1>Perfil</h1>
    <Toolbar class=" mb-3">
    <template #start>
       <label>Cambiar Contraseña</label>
    </template>
    <template #end>
        <span class="p-input-icon-left">
            <Button icon="pi pi-unlock" class="mr-2" @click="showModal()" autofocus />
        </span>
    </template>

</Toolbar>
    <div class="card flex flex-wrap p-fluid">
        <div class="col-12">
            <label class=" font-bold">Usuario: </label>
            {{ user.username }}
        </div><div class= "col-12">
            <label class="font-bold" >CI: </label>
            {{ user.ci }} {{ user.complement }}
        </div><div class="col-12 ">
            <label class="font-bold">Nombre(s) y Apellido(s): </label>
            {{ user.names }} {{ user.paternal }} {{ user.Maternal }}
        </div>
    </div>
    <Dialog v-model:visible="visible" modal header="Cambiar Contraseña" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" class="p-fluid">
    <h1></h1>
    <div class="card flex flex-wrap p-fluid justify-content-center">
        <div class="col-12">
            <label for="password">Contraseña</label>
            <Password id="password" v-model="user.password"  placeholder="Contraseña.." :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }" ></Password>
            <small id="password" v-if="submitted && !permission.nombre">Ingrese su contraseña.</small>
        </div>
        <div class="col-12">
            <label for="repassword">Repita Contraseña</label>
            <Password id="repassword" v-model="user.repassword" placeholder="Contraseña.." :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
            <small id="repassword" v-if="submitted && !permission.nombre">Repita la contraseña.</small>
        </div>
        <div class="col-12">
    <div class="flex flex-wrap justify-content-center">
        <div class="col-12 md:col-6 sm:w-100">
            <Button label="Cerrar" icon="pi pi-sign-out" class="p-button-help" @click="visible = false" />
    </div>
    <div class="col-12 md:col-6 sm:w-100">
            <Button label="Guardar" icon="pi pi-save"  class="p-button-danger" @click="password()" />
    </div>
    </div>
</div>
    </div>
</Dialog>
    </div>

</template>
<template #fallback> Loading... </template>
</Suspense>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import UserServices from "./../../service/AuthService"
 
const user= ref({ })
const visible = ref(false);

onMounted(() => {
    getUser()
})
const getUser = async () =>{
    try{
    const {data}=await UserServices.profile()
    user.value=data.data
    }   
    catch(data){
        console.log("ERROR AL BUSCAR PERFIL", data.response.data)
    }
    }

const  showModal = () =>{
    visible.value=true
}

const password = async () => {
try{
     await UserServices.changePassword({id:user.value.id, password:user.value.password, repassword:user.value.repassword})
     getUser()
     visible.value=false
    }
catch(data){
    console.log("ERROR AL CAMBIAR PASSWORD", data.response.data)
}
}

</script>
<style>
    
</style>