
<template>
    <Toast />
<div class="card">
        <h1>Usuario</h1>
    <Toolbar>
        <template #start>
            <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText placeholder="Buscar" @keyup.enter="searchUser()" v-model="q" />
            </span>
        </template>
        <template #end>
            <Button icon="pi pi-plus" class="mr-2" @click="showModal()" autofocus />
        </template>
    </Toolbar>
    <DataTable :value="users" tableStyle="min-width: 50 rem">
            <Column field="id" header="ID"></Column>
            <Column field="ci" header="CI"></Column>
            <Column field="username" header="USUARIO"></Column>
            <Column field="names" header="NOMBRE(s)"></Column>
            <Column field="paternal" header="PATERNO"></Column>
            <Column field="maternal" header="MATERNO"></Column>
            <Column header="ROLES">
                <template #body="slotProps">
                    <ul>
                        <li v-for="rol in slotProps.data.roles">{{ rol.nombre }}</li>
                    </ul>
                </template>
            </Column>
            <Column headerStyle="min-width:10rem;">
            <template #body="slotPrors">
                <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="updateUser(slotPrors.data)" />
                <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mr-2" @click="deleteUser(slotPrors.data)" />
            </template>
            </Column>
    </DataTable>
</div>

<Dialog v-model:visible="visible" modal header="USUARIO" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" class="p-fluid">
<form>
    <div class="card flex flex-wrap p-fluid">
        <div class="col-12">
            <label for="username">Usuario</label>
            <InputText id="username" v-model="user.username" aria-describedby="username" autofocus />
            <small id="username">Ingrese su nombre de usuario.</small>
        </div>
        <div class="col-8">
            <label for="ci">CI.</label>
            <InputNumber  id="ci" v-model="user.ci" aria-describedby="ci" inputId="withoutgrouping" :useGrouping="false" />
            <small id="ci">Se Requiere CI.</small>
        </div>
        <div class="col-4">
            <label for="complement">Complemento</label>
            <InputText id="complement" v-model="user.complement" aria-describedby="complement" />
        </div>  
        <div class="col-12">
            <label for="names">Nombre(s)</label>
            <InputText id="names" v-model="user.names" aria-describedby="names" />
            <small id="names">Ingrese su nombre(s).</small>
        </div>
        
        <div class="col-12">
            <label for="paternal">Paterno</label>
            <InputText id="paternal" v-model="user.paternal" aria-describedby="paternal" />
            <small id="paternal">Ingrese su apellido Paterno.</small>
        </div>
        <div class="col-12">
            <label for="maternal">Materno</label>
            <InputText id="maternal" v-model="user.maternal" aria-describedby="maternal" />
            <small id="maternal">Ingrese su apellido Materno.</small>
        </div>
        <div class="col-12">
            <label for="email">Email</label>
            <InputText type="email" id="email" v-model="user.email" aria-describedby="email" />
            <small id="maternal">Ingrese su apellido Materno.</small>
        </div>
        <div class="col-12">
            <label>Roles</label>
            <MultiSelect v-model="selectRol" :options="roles" optionLabel="nombre" placeholder="Select Roles" :maxSelectedLabels="100" class="w-full" />    
        </div>
    <div class="col-12">
    <div class="flex flex-wrap justify-content-center">
        <div class="col-6">
            <Button label="Cerrar" icon="pi pi-sign-out" class="p-button-help" @click="visible = false" />
        </div>
        <div class="col-6">
            <Button label="Guardar" icon="pi pi-save"  class="p-button-danger" @click="saveUser()" />
        </div>
    </div>
    </div>
    </div>
</form>
</Dialog>


</template>

<script setup>
import { ref, onMounted } from 'vue';
import UserServices from "../../../service/UserService"
import RoleServices from "../../../service/RoleService"
import { useToast } from "primevue/usetoast"
const toast = useToast();
const visible = ref(false);
const users= ref([]);
const roles = ref([]);
const selectRol= ref([]);
const user= ref({username:"",ci:null,complement:"",names:"",paternal:"",maternal:"",email:"",password:"",repassword:""})
const q=ref('');
const sc=ref([]);

onMounted(() => {
    getUsers()
    getRoles()
})

const  showModal = () =>{
    visible.value=true
    user.value= {username:"",ci:null,complement:"",names:"",paternal:"",maternal:"",email:"",password:"",repassword:""}
}

const getRoles = async () =>{
    try{
        const {data}=await RoleServices.index()
        roles.value=data.data
    }catch(data){
        console.log("ERROR NO SE ENCUENTRA LOS ROLES", data.response)
    }
    
}


const getUsers = async () =>{
    try{
        const {data}=await UserServices.index()
        users.value=data.data      
    }catch(data){
        console.log("ERROR EN BUSQUEDA DE USUSARIO", data.response.data, selectRol.value)
    }
    
}

const saveUser =async() =>{
    try{

    if(user.value.id){ 
        await UserServices.update(user.value.id, user.value, selectRol.value) 
        //await UserServices.update(user.value.id, user.value, selectRol.value,restestablishments.value)
    }
    else{
        await UserServices.store(user.value, selectRol.value);
        user.value= {username:"",ci:null,complement:"",names:"",paternal:"",maternal:"",cargo:"",cel:null,email:"",password:"",repassword:""}
        
    }
        visible.value=false
        getUsers()
    }catch(data){       
        console.log("ERROR GUARDAR USUARIO", data.response.data)   
    }
    
}
const updateUser = (us) =>{
    selectRol.value=[];
    us.ci=parseInt(us.ci)
    user.value=us
    visible.value=true
    us.roles.forEach(ro => {
        const { pivot,...rest}=ro
        selectRol.value.push(rest);
    }); 

}
const deleteUser = async (us) =>{
    if(confirm("¿Esta seguro de eliminar al usuario?")){
        try{
            await UserServices.delete(us.id)
            getUsers()
        }catch(error){
            console.log(error)
        }
    }
}

const searchUser = async() =>{
    try{
        const {data}=await UserServices.index(q.value)
        users.value=data.data
    }catch(data){
        console.log("ERROR BUSCAR", data.response.data)
    }
}
</script>

<style>
    
</style>