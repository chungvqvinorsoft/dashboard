import { axiosClient } from ".."
import { FilterParams, NewUserInfo } from "../../types/manageUser"

export const accountsApi = {
    get: (params: FilterParams) => {
        return axiosClient.get('users', {
            params
        })
    },
    post: (userInfo: NewUserInfo) => {
        return axiosClient.post('users', userInfo)
    },
    put: (userInfo: NewUserInfo, id?: number) => {
        return axiosClient.put(`users/${id}`, userInfo )
    },
    delete: ( id?: number) => {
        return axiosClient.delete(`users/${id}` )
    }
}