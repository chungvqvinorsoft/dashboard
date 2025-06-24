export interface UserType {
    stt?: number,
    name: string,
    username: string,
    createdAt?: string,
    id: number,
    password?: string
}

export interface NewUserInfo {
    name?: string,
    username?: string,
    password?: string
}

export interface FilterParams {
    account_id?: string,
    name?: number,
    username?: number
}