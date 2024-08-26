import { defineStore } from "pinia"
import {ref} from 'vue'

export const useRegisterPatientStore=defineStore("registerPatient",()=>{
    const registerPatient=ref(false);
    const patient=ref(null);
    const setRegisterPatient = (client)=>{
        patient.value=client
        registerPatient.value=true
    }
    return{
        registerPatient,
        patient,
        setRegisterPatient
    }
})

