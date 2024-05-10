
import { Request, Response } from "express";
import { EvaluationRepository } from "../repositories/EvaluationRepository"
import prisma from "../database";

export default {
  async createEvaluation(request: Request, response: Response) {
    try {
      const { id_indicator, user_id, date_evaluation, valueNum, valueBol } = request.body;

      const createEvaluation = new EvaluationRepository();

      const evaluation = await createEvaluation.create(id_indicator, user_id, date_evaluation, valueNum, valueBol);

      return response.status(201).json({ evaluation });
    } catch (e) {
      console.log(e)
    }

  },
  //getEvaluations
  async getEvaluations(request: Request, response: Response) {
    try {

      const allEvaluations = await prisma.evaluation.findMany({
    
      });

      return response.status(200).json({
        data:
          allEvaluations
      });

    } catch (error) {
      return response.json({ message: error });
    }
  },

  // getEvaluationById
  async getEvaluationtById(request: Request, response: Response) {
    try {
      const evaluationId = request.params.id;

      const evaluation = await prisma.evaluation.findUnique({
        where: {
          id: evaluationId,
        },
      });

      response.status(200).json({ data: evaluation });
    } catch (e) {
      console.log(e);
    }
  },// updateEvaluation
  async updateEvaluation(request: Request, response: Response) {
    try {
      const evaluationId = request.params.id;
      const { id_indicator, user_id, date_evaluation, valueNum, valueBol } = request.body;

      const evaluation = await prisma.evaluation.update({
        where: {
          id: evaluationId,
        },
        data: {
          id_indicator, user_id, date_evaluation, valueNum, valueBol
        },
      });

      response.status(200).json({ data: evaluation });
    } catch (e) {
      console.log(e);
    }
  },

  // deleteEvaluation
  async deleteEvaluation(request: Request, response: Response) {
    try {
      const evaluationId = request.params.id;
      await prisma.evaluation.delete({
        where: {
          id: evaluationId,
        },
      });

      response.status(200).json({ data: { message: "Avaliação Deletada!" } });
    } catch (e) {
      console.log(e);
    }
  }
};

