<template>

<div class="card">
    
        <Toolbar>
       <template #start>
        <h3>Rol: <InputText v-model=role.nombre></InputText></h3>
         
        </template>
        <template #center>
    <h3>Detalle: <InputText v-model=role.detalle></InputText></h3>
           
        </template>
        <template #end>
            <!-- <Button icon="pi pi-print" class="mr-2" /> -->
            <Button icon="pi pi-save" class="mr-2" @click="updateRole()" />    
            <!-- <Button icon="pi pi-save" class="mr-2" @click="saveRole()" />     -->
        </template>
    </Toolbar>
    <div class="card flex flex-wrap justify-content-left">
        <div class="flex align-items-center  md:col-3" v-for="permission in permissions" :key="permission.id" >
        
            <label  class="ml-2"> {{permission.nombre}}&nbsp;</label><Checkbox v-model="selectPermissions" :value="permission.id" />
        </div>
    </div>
</div>

<!-- {{ permissions }} -->
</template>
<script setup>
 import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import RoleService from '../../../service/RoleService';
import PermissionService from '../../../service/PermissionService';
const router=useRoute()
const role_id= router.params.id
const role=ref({})
const permissions=ref([])
const selectPermissions=ref([])

onMounted(()=>{
    getRole()
    getPermission()
})
const getRole=async()=>{
    const {data}=await RoleService.show(role_id)
    role.value=data
    data.permissions.forEach(per=>{
        selectPermissions.value.push(per.id)
    });
    selectPermissions.value
}
const getPermission=async()=>{
    const {data}=await PermissionService.index(1,200,'')
    permissions.value=data.data
}
const updateRole = async () =>{
    if(confirm("¿Esta seguro de Guardar los datos?")){
        role.value.new_permissions=selectPermissions.value
    const {data} = await RoleService.update(role_id, role.value)
    
    alert('se actualizaron los datos')
    }
}
</script>