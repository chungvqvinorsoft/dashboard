import { axiosClient } from ".."
import { FilterParams } from "../../types/historyPay"

export const conversationsApi = {
    
    get: (id?: string, params?: FilterParams) => {
        return axiosClient.get(`users/${id}/message`, {
            params
        })
    },
    deleteById: (idPay?: string, idUser?: string) => {
        return axiosClient.delete(`users/${idUser}/message${idPay}`)
    },
}