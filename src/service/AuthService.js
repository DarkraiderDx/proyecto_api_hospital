//import [funcion],[{constante}] from [direccion]htnpfgenmhospital de tercer nivel potosihospitalpotosi
import HttpClient from "./HttpClient"

export default{
    login:(credenciales)=>{
        return HttpClient().post("/v1/auth/login",credenciales);
    },
    register:(datos)=>{
        return HttpClient().post("/v1/auth/register",datos);
    },
    profile:()=>{
        return HttpClient().get("/v1/auth/profile");
    },
    logout:()=>{
        return HttpClient().post("/v1/auth/logout");
    },
    changePassword:(data)=>{
        return HttpClient().post("/v1/auth/change-password",data);
    }
}