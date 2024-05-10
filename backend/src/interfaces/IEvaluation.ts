import {Evaluation} from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library"


export interface IEvaluation{
    create(id_indicator : string, user_id:string, date_evaluation : Date, valueNum : Decimal, valueBol: boolean ):Promise<Evaluation>
}
