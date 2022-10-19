// import httpCommon from "@/http-common";
import axios from 'axios';


class ExcelService{
    exportExcel(){
        // return httpCommon.get("/excel/export");
        axios.get(`http://localhost:8080/api/excel/export?id=1`, {
            responseType: 'blob',
        }).then((response) => {
            const url = URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute(
                'download',
                `Employee-${new Date().toLocaleDateString()}.xlsx`
            )
            document.body.appendChild(link)
            link.click()
        })
    }

}




export default new ExcelService()