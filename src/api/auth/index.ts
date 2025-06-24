import axios from "axios"
import {  UserInfo } from "../../types/login"
import { axiosClient } from ".."
import { NewUserInfo } from "../../types/manageUser"

export const authApi = {
    login: (user:UserInfo) => {
        return axios.get(process.env.REACT_APP_BASE_URL + 'users', {
            params: {
                username: user.username,
                password: user.password
            }
        })
    },
    register: (newUser: NewUserInfo) => {
        return axiosClient.post('auth/register', newUser)
    },
}