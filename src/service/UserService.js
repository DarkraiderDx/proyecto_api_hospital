import HttpClient from "./HttpClient"

export default{
    index:(q='')=>{
        return HttpClient().get("/v1/users?q="+q);
    },
    store:(data, roles)=>{
        data.roles=roles
      
        return HttpClient().post("/v1/users",data);
    },
    show:(id)=>{
        return HttpClient().get("/v1/users/"+id);
    },
    update:(id, data, roles)=>{
        data.roles=roles
        return HttpClient().put("/v1/users/"+id,data);
    },
    delete:(id)=>{
        return HttpClient().delete("/v1/users/"+id);
    },
}