import { sign } from 'jsonwebtoken';
import { SECRET } from '../config/config';
import { User } from '../entity/user';

export function createToken(user: User) {
    return sign({ id: user.id }, SECRET, { expiresIn: '1d' });
}

export function hashPassword(password: string) {
    // Use a library such as bcrypt to hash the password
    return password;
}

export function comparePassword(password: string, hash: string) {
    // Use a library such as bcrypt to compare the password and the hash
    return password === hash;
}
