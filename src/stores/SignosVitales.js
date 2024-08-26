import { defineStore } from "pinia"
import {ref} from 'vue'
export const useSignisVitalesStore=defineStore("signisVitales",()=>{
   
    const signisVitales_id=ref(null)
    const setSignisVitales = (id)=>{  
        signisVitales_id.value=id
            console.log(signisVitales_id)
    }
    return{
        signisVitales_id,
        setSignisVitales
    }
})

//view see watch localStorage.getItem("nombres")
//save localStorage.setItem("nombres")
