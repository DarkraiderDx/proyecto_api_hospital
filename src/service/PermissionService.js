import HttpClient from "./HttpClient"

export default{
    index:(page=1,limit=10,q='')=>{
        return HttpClient().get("/v1/permissions?page="+page+"&limit="+limit+"&q="+q);
    },
    store:(data)=>{
        return HttpClient().post("/v1/permissions",data);
    },
    show:(id)=>{
        return HttpClient().get("/v1/permissions/"+id);
    },
    update:(id, data)=>{
        return HttpClient().put("/v1/permissions/"+id,data);
    },
    delete:(id)=>{
        return HttpClient().delete("/v1/permissions/"+id);
    },
}