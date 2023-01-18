import { decode, sign, verify } from 'jsonwebtoken';
// import { SECRET } from '../config/config';
import { User } from '../entity/user.entity';
import { compare, hash } from 'bcrypt';
// import dotenv from 'dotenv';
// dotenv.config();
// import { SECRET } from 'data-source';
import { Request, Response, NextFunction } from 'express';

export function createToken(user: User) {
    return sign({ id: user.id }, process.env.SECRET as string, { expiresIn: '1d' });
}

export function createRefreshToken(user: User) {
    return sign({ id: user.id }, process.env.SECRET as string, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
    return verify(token, process.env.SECRET as string);
}

export function decodeToken(token: string) {
    return decode(token);
}
export function unsignToken(token: string) {
    // return design(token);
    // destroy(token);
}

// export async decode(params: { token: string }): Promise<IDecoded> {
//     return new Promise((resolve, reject) => {
//       const { token } = params;
//       verify(token, jwt_secret, (error, decoded) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(decoded as IDecoded);
//         }
//       });
//     });
//   },
export interface IDecoded {
    id: string;
    role: string;
    iat: number;
    exp: number;
  }
// export async function decoding(params: { token: string },
//     req: Request,
//     res:Response,
//     next:NextFunction
//     ): Promise<IDecoded> {
//     return new Promise((resolve, reject) => {
//       const { token } = params;
//       verify(token, process.env.SECRET as string, (error, decoded) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(decoded as IDecoded);
//         }
//       });
//     });
//   }

// export async function verifyAcessToken(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) {
//     try {
//       const authHeader = req.headers["authorization"];
//       if (!authHeader) {
//         return res.status(401).send('You are not authorized! 🚨');
//         }
//     //   const bearerToken = handleAuthHeader(authHeader);
  
//       const token = authHeader.split(" ")[1];
//       const decoded: IDecoded = await decode({ token });
  
//       req.decoded = { id: decoded.id, role: decoded.role };
//       next();
//     } catch (error) {
//       next(error);
//     }
//   }
  
//   function handleAuthHeader(authHeader: string | undefined, 
//     req: Request,
//     res: Response,
//     // next: NextFunction
//   ) {
//     if (!authHeader) {
//     return res.status(401).send('You are not authorized! 🚨');
//     }
  
//     return authHeader;
//   }
export const jwtVerification = {

    async encode(params: { id: string, role?: string }): Promise<string> {
        return new Promise((resolve, reject) => {
          sign(params, process.env.SECRET as string, { expiresIn: '1d' }, (error, token) => {
            if (error) {
              reject(error);
            } else {
              resolve(token as string);
            }
          });
        });
      },

async decode(params: { token: string }): Promise<IDecoded> {
    return new Promise((resolve, reject) => {
      const { token } = params;
      verify(token, process.env.SECRET as string, (error, decoded) => {
        if (error) {
          reject(error);
        } else {
          resolve(decoded as IDecoded);
          console.log(decoded)
        }
      });
    });
  } 
}



export function hashPassword(password: string) {
    // Use a library such as bcrypt to hash the password
    const hashedPassword = hash(password, 10);
    return hashedPassword;
}
    // return password;
// }

export function comparePassword(password: string, hash: string) {
    // Use a library such as bcrypt to compare the password and the hash
   const comparedPassword = compare(password, hash);
    return comparedPassword;
}
//     return password === hash;
// }

export function generateEmailToken(email: string){
    // console.log(123)
    // console.log("email", email)      
    // console.log(process.env.JWT_EMAIL_KEY)
    const emailToken = sign({ email }, process.env.JWT_EMAIL_KEY as string, {
      expiresIn: '1d',
    });
    // console.log(1)
    // console.log(emailToken)
    return emailToken;
  };
  
