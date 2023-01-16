import { sign } from 'jsonwebtoken';
import { SECRET } from '../config/config';
import { User } from '../entity/user.entity';
// import dotenv from 'dotenv';
// dotenv.config();



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
  
