import httpCommon from "@/http-common";

class LogdtailService{
    getAll(params){
       return  httpCommon.get("/log/logList", {params});
    }

    getByUsers(params){
        return  httpCommon.get("/log/byUser", {params});
    }

    getByDate(params) {
        return httpCommon.get("/log/byDate", {params});
    }
    getByDepartment(params) {
        return httpCommon.get("/log/byDepartment", {params});
    }
    getAllByUser(params){
        return  httpCommon.get("/log/allByUser", {params});
    }
    getAllByMonthAndDepartment(params){
        return httpCommon.get("/log/allByMonthAndDepartment",{params})
    }

    getDepartment() {
        return httpCommon.get("department");
    }

    getLogsByDate_Department(params){
        return httpCommon.get("/log/byDate_Department", {params});
    }

    getByDate_UserCode(params){
        return httpCommon.get("/log/byDate_Usercode", {params});
    }

    getAllBySearch(params){
        return httpCommon.get("/log/search", {params});
    }

}

export default new LogdtailService();
