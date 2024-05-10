import { IndicatorRepository } from "../repositories/IndicatorRepository";
import { Request, Response } from "express";
import prisma from "../database";


export default {
  async createIndicator(request: Request, response: Response) {

    try{
      const {description , objective, dimension , type_Indicator, sources } = request.body;

      const createIndicator = new IndicatorRepository();
  
      const indicator = await createIndicator.create( description , objective, dimension , type_Indicator, sources);

      return response.status(201).json({ indicator });
    }catch(e){
      return response.json(e)
    }
    
  },
    //getEvaluations
    async getIndicators(request: Request, response: Response) {
      try {
  
        const allIndicators = await prisma.indicator.findMany({
      
        });
  
        return response.status(200).json({
          data:
            allIndicators
        });
  
      } catch (error) {
        return response.json({ message: error });
      }
    },
  // getIndicatorById
  async getIndicatorById(request: Request, response: Response) {
    try {
      const indicatorId = request.params.id;

      const indicator = await prisma.indicator.findUnique({
        where: {
          id: indicatorId,
        },
      });

      response.status(200).json({ data: indicator });
    } catch (e) {
      console.log(e);
    }
  },// updateUnit
  async updateIndicator(request: Request, response: Response) {
    try {
      const indicatorId = request.params.id;
      const { description , objective, dimension , type_Indicator, sources } = request.body;

      const indicator = await prisma.indicator.update({
        where: {
          id: indicatorId,
        },
        data: {
          description , objective, dimension , type_Indicator, sources 
        },
      });

      response.status(200).json({ data: indicator });
    } catch (e) {
      console.log(e);
    }
  },

  // deleteUnit
  async deleteIndicator(request: Request, response: Response) {
    try {
      const indicatorId = request.params.id;
       await prisma.indicator.delete({
        where: {
          id: indicatorId,
        },
      });

      response.status(200).json({ data: { message: "Indicador Deletado!" } });
    } catch (e) {
      console.log(e);
    }
  }
};