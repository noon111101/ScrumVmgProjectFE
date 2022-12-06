import httpCommon from "@/http-common";
class RequestService{
    getAll(params){
        return httpCommon.get("/request", {params});
    }

}

export default new RequestService()