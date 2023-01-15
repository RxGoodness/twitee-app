import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/user';
import { JwtPayload, verify } from 'jsonwebtoken';
import { SECRET } from '../config';

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization as string;
        const decoded = verify(token, SECRET);
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

