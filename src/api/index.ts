import axios from "axios";

export const axiosClient = axios.create(
    {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }
)

axiosClient.interceptors.request.use((config) => {
    return config;
})

axiosClient.interceptors.response.use(
    (respone) => {
        return respone;
    },
    async (error) => {
        //handle if error
        throw error;
    }
)