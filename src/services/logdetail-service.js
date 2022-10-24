import httpCommon from "@/http-common";

class LogdtailService{
    getAll(params){
       return  httpCommon.get("/log/logList", {params});
    }

    getByUsers(params){
        return  httpCommon.get("/log/byUser", {params});
    }
    getDepartment(){
        return httpCommon.get("departments");
    }
    getBySearch(params){
        return  httpCommon.get("/log/search", {params});
    }

}

export default new LogdtailService();
