import axios from "axios"

const axiosConfig=axios.create({
    baseURL:"http://localhost:6001",
    withCredentials: true,
})
export default axiosConfig