// import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/user.entity';
import { decode, JwtPayload, verify } from 'jsonwebtoken';
import {  jwtVerification } from 'utils';
// import { SECRET } from '../config';
import { Request, Response, NextFunction } from 'express';
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

// function handleAuthHeader(authHeader: string | undefined) {
//   if (!authHeader) {
//     throw new APIError({
//       status: 401,
//       message: "No authorization header set",
//     });
//   }

//   return authHeader;
// }



// export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
//   let token: string | undefined;
//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   if (!token) {
//     return res.status(401).send('You are not authorized! 🚨');
//   }

//   const decodedToken: any = jwt.verify(token as string, process.env.SECRET as string);
//   const user = await User.findOne({ email: decodedToken.email });
//   req.user = user;

//   next();
// }