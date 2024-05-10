import { UserRepository } from "../repositories/UserRepository";
import { Request, Response } from "express";
import prisma from "../database";
import { hash } from "bcrypt";
export default {
  async createUser(request: Request, response: Response) {

    try {
      const { name, cpf, password, id_unit, office, type_user } = request.body;

      const createUser = new UserRepository();

      const user = await createUser.create(name, cpf, password, id_unit, office, type_user);

      return response.status(201).json({ user });

    } catch (e) {
      return response.json(e)
    }

  },
  async getUsers(request: Request, response: Response) {
    try {

      const allUsers = await prisma.user.findMany({
        include: {
          evaluations: true,
          unit:true
        }
      });

      return response.status(200).json({
        data:
          allUsers
      });

    } catch (error) {
      return response.json({ message: error });
    }
  },
  async getUserById(request: Request, response: Response) {
    try {

      const userId = request.params.id;
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          evaluations: true,
        },
      });

      response.status(200).json({ data: user });
    } catch (e) {
      return response.json({ message: e });
    }
  },
  async updateUser(request: Request, response: Response) {
    try {
      const userId = request.params.id;
      const { name, cpf, password, id_unit, office } = request.body;

      const HashPassword = await hash(password, 8)

      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name, cpf, password: HashPassword, id_unit, office
        },
      });

      response.status(200).json({ data: user });
    } catch (e) {
      return response.json({ message: e });
    }
  },

  // deleteUser
  async deleteUser(request: Request, response: Response) {
    try {
      const userId = request.params.id;
      const user = await prisma.user.delete({
        where: {
          id: userId,
        },
      });

      response.status(200).json({ data: { message: "Usuário Deletado!" } });
    } catch (e) {
      return response.json({ message: e });
    }
  }
};
