import {RoleInterface} from "./role.interface";

export interface UserInterface {
    id: number,
    email: string,
    string: string,
    verified: boolean,
    image: string,
    roles: RoleInterface[] | []
}