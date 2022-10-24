import httpCommon from "@/http-common";

class LogdtailService{
    getAll(params){
       return  httpCommon.get("/log/logList", {params});
    }

    getByUsers(params){
        return  httpCommon.get("/log/byUser", {params});
    }

    getByDate(params){
        return  httpCommon.get("/log/byDate", {params});
    }
    getDepartment(){
        return httpCommon.get("departments");
    }

}

export default new LogdtailService();
