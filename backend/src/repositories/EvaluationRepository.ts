import {IEvaluation} from"../interfaces/IEvaluation"
import { Evaluation } from "@prisma/client";
import prisma from "../database";
import { Decimal } from "@prisma/client/runtime/library";

class EvaluationRepository implements IEvaluation {
  public async create(
    id_indicator : string,
    user_id : string,
    date_evaluation : Date,
    valueNum : Decimal, 
    valueBol : boolean
  
  ): Promise<Evaluation> {
    let evaluationExists = await prisma.evaluation.findFirst({
      where: {
        date_evaluation,
      },
    });
    if (evaluationExists) {
      throw new Error("Erro: Avaliação ja existente!");
    }

    const evaluation = await prisma.evaluation.create({
      data: {
        id_indicator,
        user_id,
        date_evaluation,
        valueNum,
        valueBol
      }
    });

    return evaluation;
  }
}

export { EvaluationRepository };
