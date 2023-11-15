import axios from 'axios'
import Cookies from "js-cookie";




const API_URL = 'http://localhost:5000'
export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },

})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${Cookies.get('token')}`
    return config
})
$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config

    console.log(error)
    if (error.response.status == 401 && error.config && !error.config.isRetry) {
        originalRequest.isRetry = true
        console.log(12)
        try {
            const response = await axios.get(`${API_URL}/admin/refresh`, {withCredentials : true})
            return $api.request(originalRequest)
        } catch (e) {
            console.log('Error auth', e)
        }
    }
})