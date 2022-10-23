import httpCommon from "@/http-common";

class LogdtailService{
    getAll(params){
       return  httpCommon.get("/log/logList", {params});
    }

    getByUsers(params){
        return  httpCommon.get("/log/byUser", {params});
    }
    getAllByUser(params){
        return  httpCommon.get("/log/allByUser", {params});
    }
    getDepartment(){
        return httpCommon.get("department");
    }

}

export default new LogdtailService();
