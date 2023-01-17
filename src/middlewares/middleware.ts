import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/user.entity';
import { decode, JwtPayload, verify } from 'jsonwebtoken';
// import { SECRET } from '../config';

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      let  token: string | undefined;
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      }
        // console.log(req.headers.authorization)
        // const token = req.headers.authorization as string;
        // const decoded = verify(token, SECRET);
        // const decodedToken = decode(token) as JwtPayload;
        // console.log(decoded)
        if (!token) {
            return res.status(401).send('You are not authorized! 🚨');
          }
        const decoded = verify(token, process.env.SECRET as string);
        
          console.log(decoded)
        const userRepository = getRepository(User);
        // const user = await userRepository.findOne({ where: { id: decoded.id } });
        const user = await userRepository.findOne({ where: { id: (decoded as JwtPayload).id } });
        if (!user) {
            return res.status(401).send('Unauthorized');
        }

        // req.user = user;
        (req as any).user = user;
        next();
    } catch (error) {
        res.status(401).send('Unauthorized');
    }
}

