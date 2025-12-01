import { RES_MSG, RES_TYPE } from "../constants/server.constants"

export interface ResData<T = any> {
    message: RES_MSG | string,
    body?: T,
    type: RES_TYPE
}