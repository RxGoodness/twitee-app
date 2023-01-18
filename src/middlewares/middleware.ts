// import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/user.entity';
import { decode, JwtPayload, verify } from 'jsonwebtoken';
import {  jwtVerification } from 'utils';
// import { SECRET } from '../config';
import { Request, Response, NextFunction } from 'express';
import * as z from 'zod';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
export interface IDecoded {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

interface Requests {
  decoded?: {
    id: string;
    role: string;
  }
}

export async function authenticate(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    if(!req.headers.authorization) {
      res.send('No authorization header set');
    }
    const authHeader = req.headers["authorization"];
    // const bearerToken = handleAuthHeader(authHeader);

    const token = authHeader.split(" ")[1];
    const decoded: any = await jwtVerification.decode({ token });
console.log("decoded", decoded)
const userRepository = getRepository(User);

const user = await userRepository.findOne({where: { id: decoded.id}});

    // req.decoded = { id: decoded.id};
    req.body.user = user;
    next();
  // } 
}catch (error) {
    next(error);
  }
}
// }

export const authValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(255).required()
});

export const contentValidation = Joi.object({
  content: Joi.string().max(280).required()
});
