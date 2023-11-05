import Model from "sequelize/types/model";
import {RoleInterface} from "./role.interface";

export interface UserInterface extends Model{
    id: number,
    email: string,
    string: string,
    verified: boolean,
    image: string,
    roles: RoleInterface[] | []
}