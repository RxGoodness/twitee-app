import express from 'express';
import { DATABASE_CONNECTION } from './config';
// import { User } from './entity/User';
// import { Tweet } from './entity/Tweet';
// import { Like } from './entity/Like';
// import { Comment } from './entity/Comment';
import twitRoutes from './routes/tweet';
import userRoutes from './routes/user';
import { authenticate } from './middlewares';

// Connect to the database
DATABASE_CONNECTION
    .then(async connection => {
        // create the express app
        const app = express();

        // Register the middleware
        app.use(express.json());

        // app.use(authenticate);

        // Register the routes
        app.use('/api', userRoutes);
        app.use('/api', authenticate, twitRoutes);

        // Start the server
        app.listen(3000, () => console.log('Server started on port 3000'));
    })
    .catch(error => console.log('Error: ', error));
