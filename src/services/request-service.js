import httpCommon from "@/http-common";
class RequestService{
    getAll(params){
        return httpCommon.get("/request", {params});
    }

    getRequest(id){
        return httpCommon.get(`/request/${id}`);
    }

}

export default new RequestService()