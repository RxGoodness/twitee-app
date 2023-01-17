import { Request, Response, NextFunction } from 'express';
import { decode, JwtPayload, verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
// import { User } from './entity/User';
// import { Tweet } from './entity/Tweet';
// import { Like } from './entity/Like';
// import { Comment } from './entity/Comment';
import {User, Tweet, Comment, Like } from '../entity/user.entity';
import sendEmail from '../utils/email';
import {comparePassword, createToken, generateEmailToken, hashPassword} from '../utils/jwt';


export async function createUser(req: Request, res: Response) {
    // create user and generate jwt token

    try {
      let {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).send('Please provide the email and password')
        }
        const user = new User();
        // user.name = req.body.name;
       const name =  email.split("@")[0]
       user.name = name;
        user.email = email;
        // user.password = req.body.password;
    //    console.log(user)
       //write logic to hash this password
        user.password = await hashPassword(password);
        user.isVerified = false;
        console.log(user)

        console.log(getRepository)
        const userRepository = getRepository(User);
        await userRepository.save(user);
        // await userRepository.save(user);
        console.log("This",userRepository)

        console.log(user)
  const emailToken = generateEmailToken(user.email);
    console.log(emailToken)
//   if (process.env.NODE_ENV === 'test') {
//     return res.status(200).json({
//       status: 'success',
//       user,
//       emailToken,
//     });
//   } else {
    sendEmail(
      user.email,
      'Email Verification',
      `<p>Hello ${user.name},</p><p>Thank you for signing up for a Twitter account.
       In order to access your Twitee account,</p>
       Click
       <button><a href= http://localhost:3000/api/users/verify/${emailToken}>here</a></button>
       to verify your email. Thanks`,
    )
      .then(() => {
        console.log('email sent');
      })
      .catch((err) => {
        console.log(err);
      });
    // }

    res.status(201).send(user);
        // res.status(201).send("Token sent to mail");
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function confirmEmail (req: Request, res: Response, next: NextFunction){
    const emailToken: any = verify(
      req.params.token as string,
      process.env.JWT_EMAIL_KEY as string,
    );
    console.log(emailToken)
    // decode the token
    //  const decodedToken = decode(req.params.token) as JwtPayload;
    //  console.log(decodedToken)
    if (!emailToken || !emailToken.email) {
        return res.status(404).send('Invalid Token. Please SignUp!');
    }
    
    //console.log(decodedToken)
    // if (decodedToken.email !== emailToken.email) {
    //     return res.status(404).send('Invalid Token. Please SignUp!');
    // }
    
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({where: {email:emailToken.email}});
    if (!user) {
        return res.status(404).send('We were unable to find a user for this verification. Please SignUp!');
    } else {
      user.isVerified = true;
      await userRepository.save(user);
    }
  
    const token = createToken(user);
    // if (process.env.NODE_ENV === 'test') {
    //   return res.status(201).json({
    //     message: 'success',
    //     emailToken,
    //     data,
    //   });
    // } else {
        return res.status(201).send({user, token})
    //   return res.redirect(200, 'http://localhost:3000/api/login');
    // }
  }

export async function getAllUsers(req: Request, res: Response) {
    try {
        const userRepository = getRepository(User);
        const users = await userRepository.find();
        console.log(users)

        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(
            {where: {id: parseInt(req.params.id, 10)}}
            // req.params.id
            );

        if (!user) {
            return res.status(404).send("User not found");
        }

        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;

        await userRepository.save(user);

        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({where: {id: parseInt(req.params.id, 10)}}
        );

        if (!user) {
            return res.status(404).send("User not found");
        }

        await userRepository.remove(user);

        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function login(req: Request, res: Response) {
    try {
        const {email, password} = req.body;

        console.log(1)
        // console.log(req.body)
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({where: {email}});
        console.log(req.body)

        if (!user) {
            return res.status(404).send("User not found, please sign up or check if the email is correct");
        }
        if(user.isVerified === false){
            return res.status(404).send("User not verified, please verify your email");
        }
        const comparedPassword = comparePassword(password, user.password);
        if (!comparedPassword) {
            return res.status(401).send("Incorrect password");
        }
        const token = createToken(user);
        // const userVerified = await userRepository.findOne({where: {email, isVerified: true}});
        res.status(200).send({user, token});
    } catch (error) {
        res.status(500).send(error);
}
}

export async function logout(req: Request, res: Response) {
    try {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({where: {id: parseInt(req.params.id, 10)}}
        );

        if (!user) {
            return res.status(404).send("User not found");
        }

        // await userRepository.remove(user);

        res.status(204).send("User logged out");
    } catch (error) {
        res.status(500).send(error);
    }
}

export const createTweet = async (req: Request, res: Response) => {
    const { content, id } = req.body;
    // const {user} = req
    // console.
    // const verifyToken = verifyToken(req);
    const user = await getRepository(User).findOne(id);
    const tweetRepository = getRepository(Tweet);

    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }

    try {
        const tweet = tweetRepository.create({
            user,
            content,
        });
        await tweetRepository.save(tweet);
        res.status(201).json({ tweet });
    } catch (error) {
        res.status(500).json({ error });
    }
};
// export async function getAllTweets(req:
export async function getAllTweets(req: Request, res: Response) {
    try {
        const tweetRepository = getRepository(Tweet);
        const tweets = await tweetRepository.find({ relations: ["user"] });

        res.send(tweets);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function updateTweet(req: Request, res: Response) {
    try {
        const tweetRepository = getRepository(Tweet);
        const tweet = await tweetRepository.findOne( {relations: ["user"], where: {id: parseInt(req.params.id, 10)}} )
        // (req.params.id, { relations: ["user"] });

        if (!tweet) {
            return res.status(404).send("Tweet not found");
        }

        tweet.content = req.body.content;

        await tweetRepository.save(tweet);

        res.send(tweet);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function deleteTweet(req: Request, res: Response) {
    try {
        const tweetRepository = getRepository(Tweet);
        const tweet = await tweetRepository.findOne({where: {id: parseInt(req.params.id, 10)}}
        );

        if (!tweet) {
            return res.status(404).send("Tweet not found");
        }

        await tweetRepository.remove(tweet);

        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function addLike(req: Request, res: Response) {
    const tweet = await getRepository(Tweet).findOne(req.body.tweetId);
    const user = await getRepository(User).findOne(req.body.userId);
    const likeRepository = getRepository(Like);

    if (!tweet) {
        res.status(404).json({ error: 'Tweet not found' });
        return;
    }
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }

    try {
        const like = likeRepository.create({
            tweet,
            user,
        });
        await likeRepository.save(like);
        res.status(201).json({ like });
    } catch (error) {
        res.status(500).json({ error});
    }
}

export async function addComment(req: Request, res: Response) {
    const { content } = req.body;
    const tweet = await getRepository(Tweet).findOne(req.body.tweetId);
    const user = await getRepository(User).findOne(req.body.userId);
    const commentRepository = getRepository(Comment);

    if (!tweet) {
        res.status(404).json({ error: 'Tweet not found' });
        return;
    }
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }

    try {
        const comment = commentRepository.create({
            tweet,
            user,
            content,
        });
        await commentRepository.save(comment);
        res.status(201).json({ comment });
    } catch (error) {
        res.status(500).json({ error});
    }
}

