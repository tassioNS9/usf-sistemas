
import { AuthRepository } from "../repositories/AuthRepository";
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import prisma from "../database";
export default {
  async authUser(request: Request, response: Response) {
    const { cpf, password } = request.body;

    const authUser = new AuthRepository();

    const user = await authUser.auth(cpf, password);

    return response.json({ user })
  },

  async authverifyUser(request: Request, response: Response) {

    const authToken = request.headers.authorization

    if (!authToken) {
      return response.status(401).json({ error: "Token nao ofericido!" })
    }

    const [, token] = authToken.split(" ");

    try {
      const decoded = verify(token, process.env.SECRET);
      //console.log(authToken)
      return response.status(200).json({ user: decoded });

    } catch (error) {
      //console.log(authToken)
      return response.status(401).json({ erroor: "Token inválido!" })
    }
  },

   async logout(request: Request, response: Response) {
     const authToken = request.headers.authorization
     if(authToken){
       const refreshToken = await prisma.refreshToken.deleteMany({})
     };

     response.send({
       message: 'success'
     });
   }
}
