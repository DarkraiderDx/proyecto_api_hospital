<template>
    <h1>PERMISOS</h1>
    <div class="card">
        <Toolbar>
    <template #start>
        <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText placeholder="Buscar" @keyup.enter="getPermission()" v-model="buscar" />
        </span>
        
    </template>

    <template #end>
        <Button icon="pi pi-plus" class="mr-2" @click="showModal()" autofocus />
    </template>
</Toolbar>
        <DataTable :value="permissions" paginator :rows="10" :rowsPerPageOptions="[10, 20, 50]" lazy :loading="loading" ref="dt" @page="onPage($event)" :totalRecords="totalRecords" tableStyle="min-width: 50rem">
            <Column field="nombre" header="NOMBRE(S)" ></Column>
            <Column field="action" header="ACCION" ></Column>
            <Column field="subject" header="SUBJECT" ></Column>
            <Column header="ROLES" :exportable="false" style="min-width:8rem">
                <template #body="slotProps">
                    <ul>
                        <li v-for="rol in slotProps.data.roles" :key="index">
                            {{rol.nombre}}
                        </li>
                    </ul>
                </template>
            </Column>
            <Column field="detalle" header="DETALLE" ></Column>
        </DataTable>
    </div>

<Dialog v-model:visible="visible" modal header="PERMISOS" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" class="p-fluid">
<form>
    <div class="card flex flex-wrap p-fluid">
        <div class="col-12">
            <label for="nombre">Nombre Permisos</label>
            <InputText id="nombre" v-model.trim="permission.nombre" aria-required="true" autofocus :class="{'p-invalid':submitted && !permission.nombre}" />
            <small id="nombre" v-if="submitted && !permission.nombre">Ingrese nombre de permiso.</small>
        </div>
        <div class="col-12">
            <label for="action">Action</label>
            <InputText id="action" v-model.trim="permission.action" aria-required="true" autofocus :class="{'p-invalid':submitted && !permission.action}" />
            <small id="action" v-if="submitted && !permission.action">Ingrese action.</small>
        </div>
        <div class="col-12">
            <label for="subject">Subject</label>
            <InputText id="subject" v-model.trim="permission.subject" aria-required="true" autofocus :class="{'p-invalid':submitted && !permission.subject}" />
            <small id="subject" v-if="submitted && !permission.subject">Ingrese subject.</small>
        </div>
        <div class="col-12">
            <label for="detalle">Detalle</label>
            <InputText id="detalle" v-model.trim="permission.detalle" aria-required="true" autofocus :class="{'p-invalid':submitted && !permission.detalle}" />
            <small id="detalle" v-if="submitted && !permission.detalle">Ingrese su detalle.</small>
        </div>

        <div class="col-12">
    <div class="flex flex-wrap justify-content-center">
        <div class="col-6">
            <Button label="Cerrar" icon="pi pi-sign-out" class="p-button-help" @click="visible = false" />
    </div>
    <div class="col-6">
            <Button label="Guardar" icon="pi pi-save"  class="p-button-danger" @click="savePermission()" />
    </div>
    </div>
    
    </div>
    </div>
</form>
</Dialog> 

</template>
<script setup>

import { ref, onMounted } from 'vue';
import PermissionService from '../../../service/PermissionService';

const permissions=ref([])
const permission=ref([])
const loading=ref(false)
const totalRecords=ref()
const lazyParams=ref({})
const buscar=ref('')
const visible = ref(false);
onMounted(() => {
    getPermission()
})
const getPermission= async ()=>{
    loading.value = true;
    let page=lazyParams.value.page+1
    let limit=lazyParams.value.rows
    const {data} = await PermissionService.index(page,limit,buscar.value)
    
    permissions.value=data.data
    loading.value=false
    totalRecords.value=data.total;
}
const onPage = (event) => {
    lazyParams.value = event;
    getPermission();
};

const  showModal = () =>{
    visible.value=true
    permission.value= ref({nombre:"",detalle:""}) 
    }

    const savePermission =async() =>{
    try{
        if(confirm("¿Esta seguro de Guardar los datos?")){
        await PermissionService.store(permission.value)
        permission.value= ref({nombre:"",detalle:""}) 
        visible.value=false
        getPermission()
    }
    }catch(data){
        console.log("ERROR GUARDAR PERMISOS", data.response.data)
    }
}
</script>