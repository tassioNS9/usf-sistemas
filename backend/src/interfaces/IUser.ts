import {TypeUsers, User , Evaluation} from "@prisma/client"


export interface IUser{
    create(name : string, cpf : string, password : string, id_unit: string, office: string, type_user:TypeUsers ):Promise<User>
  

}