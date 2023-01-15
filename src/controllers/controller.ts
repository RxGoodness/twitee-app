import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
// import { User } from './entity/User';
// import { Tweet } from './entity/Tweet';
// import { Like } from './entity/Like';
// import { Comment } from './entity/Comment';
import {User, Tweet, Comment, Like } from '../entity/user';
export async function createUser(req: Request, res: Response) {
    // create user and generate jwt token

    try {
        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
    //    console.log(user)
        const userRepository = getRepository(User);
        // console.log(userRepository)
        await userRepository.save(user);
        console.log(userRepository)

        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
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
        console.log(1)
        // console.log(req.body)
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({where: {email: req.body.email}});
        console.log(req.body)

        if (!user) {
            return res.status(404).send("User not found");
        }
        console.log(2)
        if (user.password !== req.body.password) {
            return res.status(401).send("Incorrect password");
        }
        console.log(3)
        res.send(user);
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

        await userRepository.remove(user);

        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
}

export const createTweet = async (req: Request, res: Response) => {
    const { content } = req.body;
    const user = await getRepository(User).findOne(req.body.userId);
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

