import { UnitRepository } from "../repositories/UnitRepository";
import { Request, Response } from "express";
import prisma from "../database";

export default {
  async createUnit(request: Request, response: Response) {

    try{
      const { name, tel, address, neighborhood, city, state } = request.body;

      const createUnit = new UnitRepository();
  
      const unit = await createUnit.create(
        name,
        tel,
        address,
        neighborhood,
        city,
        state
      );
      return response.status(201).json({ unit });

    }catch(e){
      return response.json(e)
    }
   
  },
  async getUnits(request: Request, response: Response) {
    try {
      const allUnits = await prisma.unit.findMany({
        include: {
          users_unit: true,
        },
      });

      return response.status(200).json({ data: allUnits });
    } catch (error) {
      return response.json({ message: error });
    }
  },
  // getUnitById
  async getUnitById(request: Request, response: Response) {
    try {
      const unitId = request.params.id;
      const unit = await prisma.unit.findUnique({
        where: {
          id: unitId,
        },
        include: {
          users_unit: true,
        },
      });

      response.status(200).json({ data: unit });
    } catch (e) {
      return response.json({ message: e });
    }
  },// updateUnit
   async updateUnit(request: Request, response: Response){
    try {
      const unitId = request.params.id;
      const {name, tel, address, neighborhood, city , state } = request.body;
  
      const unit = await prisma.unit.update({
        where: {
          id: unitId,
        },
        data: {
          name, tel, address, neighborhood, city , state
        },
      });
  
      response.status(200).json({ data: unit });
    } catch (e) {
      return response.json({ message: e });
    }
  },
  
  // deleteUnit
  async deleteUnit(request: Request, response: Response){
    try {
      const unitId = request.params.id;
      const unit = await prisma.unit.delete({
        where: {
          id: unitId,
        },
      });
  
      response.status(200).json({ data: {message:"unidade Deletada!"} });
    } catch (e) {
      return response.json({ message: e });
    }
  }
};