export interface PayType {
    id: string,
    createdAt: string,
    stt?: number,
    payValue: string,
    payCode: string,
    status: boolean,
    payMess: string,
    userId?: string
}

export interface FilterParams {
    payCode?: string
}