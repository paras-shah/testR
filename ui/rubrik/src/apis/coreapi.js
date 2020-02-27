import axios from "axios";
import { VISION_CORE_URL, JWT_AUTH_HEADER_PREFIX, LOCAL_STORAGE, JWT_API_CALL_INTERVAL } from "./config";

export function getToken() {
    const  auth = localStorage.getItem(LOCAL_STORAGE.SESSION);
    return auth;
}

const axiosJwtTokenAPI = isAuthenticated => {
    if (isAuthenticated) {
        return axios.create({
            baseURL: VISION_CORE_URL,
            timeout: JWT_API_CALL_INTERVAL,
            headers: {
                Authorization: `${JWT_AUTH_HEADER_PREFIX}${" "}${getToken()}`,
                "Content-Type": "application/json"
            }
        });
    } else {   
        return axios.create({
            baseURL: VISION_CORE_URL,
            timeout: JWT_API_CALL_INTERVAL,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
};

export default axiosJwtTokenAPI;