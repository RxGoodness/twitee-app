import { decode, sign, verify } from 'jsonwebtoken';
// import { SECRET } from '../config/config';
import { User } from '../entity/user.entity';
import { compare, hash } from 'bcrypt';
// import dotenv from 'dotenv';
// dotenv.config();
// import { SECRET } from 'data-source';


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
  
