import { defineStore } from "pinia"
import {onMounted,ref} from 'vue'
export const useAuthPatientStore=defineStore("authPatient",()=>{
    const authPatient=ref(false);
    const patient=ref(null);

    const setAuthPatient = (client)=>{
        
        if(client){
            localStorage.setItem("patient", JSON.stringify(client))
            authPatient.value=true
        }
        if(localStorage.getItem("patient")){
            patient.value=JSON.parse(localStorage.getItem("patient"))    
            authPatient.value=true
        }

    }
    return{
        authPatient,
        patient,
        setAuthPatient
    }
})
