// import request from 'supertest';
// import { DATABASE_CONNECTION } from './config';
// import { User, Tweet } from '../entities/user';
// // import { Tweet } from './entity/Tweet';
// import { createToken } from './utils';
// import app from '../app';

// describe('Tweet', () => {
//     let token: string;
//     let user: User;
//     let tweet: Tweet;

//     beforeAll(async () => {
//         await DATABASE_CONNECTION;
//         user = await User.create({
//             name: 'John Doe',
//             email: 'johndoe@example.com',
//             password: 'password',
//         }).save();
//         token = createToken(user);
//         tweet = await Tweet.create({
//             userId: user.id,
//             content: 'Hello, World!'
//         }).save();
//     });

//     afterAll(async () => {
//         await Tweet.delete({ id: tweet.id });
//         await User.delete({ id: user.id });
//     });

//     it('should create a new tweet', async () => {
//         const response = await request(app)
//             .post('/api/tweets')
//             .set('Authorization', `Bearer ${token}`)
//             .send({ content: 'Hello, Tweeter!' });

//         expect(response.status).toBe(201);
//         expect(response.body.tweet).toHaveProperty('id');
//     });

//     it('should return a tweet', async () => {
//         const response = await request(app)
//             .get(`/api/tweets/${tweet.id}`)
//             .set('Authorization', `Bearer ${token}`);

//         expect(response.status).toBe(200);
//         expect(response.body.tweet).toHaveProperty('id', tweet.id);
//     });

//     it('should update a tweet', async () => {
//         const response = await request(app)
//             .put(`/api/tweets/${tweet.id}`)
//             .set('Authorization', `Bearer ${token}`)
//             .send({ content: 'Hello, Updated Tweeter!' });

//         expect(response.status).toBe(200);
//         expect(response.body.tweet).toHaveProperty('content', 'Hello, Updated Tweeter!');
//     });

//     it('should delete a tweet', async () => {
//         const response = await request(app)
//             .delete(`/api/tweets/${tweet.id}`)
//             .set('Authorization', `Bearer ${token}`);

//         expect(response.status).toBe(204);
//     });
// });
