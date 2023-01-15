// import request from 'supertest';
// import { DATABASE_CONNECTION } from './config';
// import { User } from './entity/User';
// import { createToken } from './utils';
// import app from './app';

// describe('User', () => {
//     let token: string;
//     let user: User;

//     beforeAll(async () => {
//         await DATABASE_CONNECTION;
//         user = await User.create({
//             name: 'John Doe',
//             email: 'johndoe@example.com',
//             password: 'password',
//         }).save();
//         token = createToken(user);
//     });

//     afterAll(async () => {
//         await User.delete({ id: user.id });
//     });

//     it('should create a new user', async () => {
//         const response = await request(app)
//             .post('/api/users')
//             .send({
//                 name: 'Jane Doe',
//                 email: 'janedoe@example.com',
//                 password: 'password',
//             });

//         expect(response.status).toBe(201);
//         expect(response.body.user).toHaveProperty('id');
//     });

//     it('should return a user', async () => {
//         const response = await request(app)
//             .get(`/api/users/${user.id}`)
//             .set('Authorization', `Bearer ${token}`);

//         expect(response.status).toBe(200);
//         expect(response.body.user).toHaveProperty('id', user.id);
//     });

//     it('should update a user', async () => {
//         const response = await request(app)
//             .put(`/api/users/${user.id}`)
//             .set('Authorization', `Bearer ${token}`)
//             .send({ name: 'Jane Smith' });

//         expect(response.status).toBe(200);
//         expect(response.body.user).toHaveProperty('name', 'Jane Smith');
//     });

//     it('should delete a user', async () => {
//         const response = await request(app)
//             .delete(`/api/users/${user.id}`)
//             .set('Authorization', `Bearer ${token}`);

//         expect(response.status).toBe(204);
//     });
// });
