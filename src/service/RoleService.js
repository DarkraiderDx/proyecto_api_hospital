import HttpClient from "./HttpClient"

export default{
    index:(q='')=>{
        return HttpClient().get("/v1/roles?q="+q);
    },
    store:(data)=>{
        return HttpClient().post("/v1/roles",data);
    },
    show:(id)=>{
        return HttpClient().get("/v1/roles/"+id);
    },
    update:(id, data)=>{
        return HttpClient().put("/v1/roles/"+id,data);
    },
    delete:(id)=>{
        return HttpClient().delete("/v1/roles/"+id);
    },
}