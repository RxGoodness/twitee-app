// // import express from 'express';
// // import { DATABASE_CONNECTION } from './src/config';
// // // import { User } from './entity/User';
// // // import { Tweet } from './entity/Tweet';
// // // import { Like } from './entity/Like';
// // // import { Comment } from './entity/Comment';
// // import twitRoutes from './src/routes/tweet';
// // import userRoutes from './src/routes/user';
// // import { authenticate } from './src/middlewares';
// // import dotenv from 'dotenv';
// // dotenv.config();
// // // const test = dotenv.config();
// // // console.log(test)
// // // require('dotenv').config();

// // // Connect to the database
// // DATABASE_CONNECTION
// //     .then(async connection => {
// //         console.log("Connected to the database!");
// //         // create the express app
// //         const app = express();

// //         // console.log(DATABASE_CONNECTION)
// //         // Register the middleware
// //         app.use(express.json());

// //         // app.use(authenticate);
// // console.log("starting point")
// //         // Register the routes
// //         app.use('/api', userRoutes);
// //         app.use('/api', authenticate, twitRoutes);

// //         // Start the server
// //         app.listen(3000, () => console.log('Server started on port 3000'));
// //     })
// //     .catch(error => console.log('Error: ', error));



// import express from 'express';
// import { DATABASE_CONNECTION } from './src/config/config';
// // import { datasource } from './src/config/config';
// // import { User } from './entity/User';
// // import { Tweet } from './entity/Tweet';
// // import { Like } from './entity/Like';
// // import { Comment } from './entity/Comment';
// import twitRoutes from './src/routes/tweet';
// import userRoutes from './src/routes/user';
// import { authenticate } from './src/middlewares';
// import dotenv from 'dotenv';
// import { AppDataSource } from 'data-source';
// // import { AppDataSource } from 'config/datasource.config';

// dotenv.config();
// // const test = dotenv.config();
// // console.log(test)
// // require('dotenv').config();

// // Connect to the database
// async () => {
//     try {
//     //     await AppDataSource.connect();
//     //     console.log('Connected to the database!');
//     // }
//     await DATABASE_CONNECTION;
//     }
//     catch (error) {
//         console.log('Error: ', error);
//     }
// // catch((error:any) => console.log('Error: ', error));

// }
// // }
// // )
//         // create the express app
//         // const app = express();
//     console.log("Connected to the database!");
//         // create the express app
//         const app = express();

//         // console.log(DATABASE_CONNECTION)
//         // Register the middleware
//         app.use(express.json());

//         // app.use(authenticate);
// console.log("starting point")
//         // Register the routes
//         app.use('/api', userRoutes);
//         app.use('/api', authenticate, twitRoutes);

//         // Start the server
//         app.listen(3000, () => console.log('Server started on port 3000'));
//     // }
//     // )
//     // .catch((error:any) => console.log('Error: ', error));




import express from 'express';
import { DATABASE_CONNECTION } from './src/config/config';
// import { datasource } from './src/config/config';
// import { User } from './entity/User';
// import { Tweet } from './entity/Tweet';
// import { Like } from './entity/Like';
// import { Comment } from './entity/Comment';
import twitRoutes from './src/routes/tweet';
import userRoutes from './src/routes/user';
import { authenticate } from './src/middlewares';
import dotenv from 'dotenv';
import { AppDataSource } from 'data-source';
// import { AppDataSource } from 'config/datasource.config';

dotenv.config();
// const test = dotenv.config();
// console.log(test)
// require('dotenv').config();

// Connect to the database
AppDataSource.initialize()
//     .then(() => {
// DATABASE_CONNECTION
        // create the express app
        // const app = express();
DATABASE_CONNECTION
    .then(async connection => {
        console.log("Connected to the database!");
    console.log("Connected to the database!");
        // create the express app
        const app = express();

        // console.log(DATABASE_CONNECTION)
        // Register the middleware
        app.use(express.json());

        // app.use(authenticate);
console.log("starting point")
        // Register the routes
        app.use('/api', userRoutes);
        app.use('/api', authenticate, twitRoutes);

        // Start the server
        app.listen(3000, () => console.log('Server started on port 3000'));
    })
    .catch((error:any) => console.log('Error: ', error));
