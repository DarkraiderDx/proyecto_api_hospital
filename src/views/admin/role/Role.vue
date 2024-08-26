<template>
    <div class="card">
            <h1>Roles</h1>
        <Toolbar>
        <template #start>
            <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText placeholder="Buscar" @keyup.enter="searchRole()" v-model="q" />
            </span>
            
        </template>
        <template #end>
            <Button icon="pi pi-plus" class="mr-2" @click="showModal()" autofocus />
            
        </template>
    </Toolbar>
            <DataTable :value="roles" tableStyle="min-width: 50 rem">
              
                    <Column field="id" header="ID"></Column>
                    <Column field="nombre" header="NOMBRE"></Column>
                    <Column field="detalle" header="DETALLES"></Column>
                    
                    <Column headerStyle="min-width:10rem;">
                    <template #body="slotPrors">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editRole(slotPrors.data)" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mr-2" @click="deleteRole(slotPrors.data)" />
                    </template>
                    </Column>
            </DataTable>
        </div>
    <Dialog v-model:visible="visible" modal header="ROL" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" class="p-fluid">
    <form>
        <div class="card flex flex-wrap p-fluid">
            <div class="col-12">
                <label for="nombre">Nombre Rol</label>
                <InputText id="nombre" v-model="rol.nombre" aria-describedby="nombre" autofocus />
                <small id="nombre">Ingrese su nombre de usuario.</small>
            </div>
            <div class="col-12">
                <label for="detalle" >detalle.</label>
                <Textarea v-model="rol.detalle" rows="3" aria-describedby="detalle" />
                <small id="detalle">Se Requiere detalle.</small>
            </div>
        
            <div class="col-12">
        <div class="flex flex-wrap justify-content-center">
            <div class="col-6">
                <Button label="Cerrar" icon="pi pi-sign-out" class="p-button-help" @click="visible = false" />
        </div>
        <div class="col-6">
                <Button label="Guardar" icon="pi pi-save"  class="p-button-danger" @click="saveRol()" />
        </div>
        </div>
        
        </div>
        </div>
    </form>
    </Dialog>   
</template>
    
<script setup>
    import { ref, onMounted, Text } from 'vue';
    import { useRouter } from 'vue-router';
    import RoleService from "../../../service/RoleService"
    const router = useRouter()
    const roles = ref([]);
    const q=ref('');
    const rol= ref({nombre:"",detalle:""})
    const visible = ref(false);
    onMounted(() => {
        getRoles()
    })

    const getRoles = async () =>{
        try{
            const {data}=await RoleService.index()
            roles.value=data.data
        }catch(data){
            console.log("ERROR NO SE ENCUENTRA LOS ROLES", data.response)
        }
    }

    const searchRole = async() =>{
        try{
        const {data}=await RoleService.index(q.value)
        roles.value=data.data
        }catch(data){
            console.log("ERROR BUSCAR", data.response.data)
        }

    }
    const editRole = (r) => {
        router.push(`/admin/role/${r.id}`)
    }

    const  showModal = () =>{
    visible.value=true
    rol.value= ref({nombre:"",detalle:""}) 
    }

    const saveRol =async() =>{
    try{
        if(confirm("¿Esta seguro de Guardar los datos?")){
        await RoleService.store(rol.value)
        rol.value= ref({nombre:"",detalle:""}) 
        visible.value=false
        getRoles()
    }
    }catch(data){
        console.log("ERROR GUARDAR ROL", data.response.data)
    }
}
</script>