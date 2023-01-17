// import { createConnection } from 'typeorm';

// export const secret = "yoursecretkey";

// createConnection({
//     type: 'mysql',
//     host: 'localhost',
//     port: 3306,
//     username: 'your_username',
//     password: 'your_password',
//     database: 'your_database_name',
//     entities: [User, Tweet, Like, Comment],
//     synchronize: true,
// }).then(connection => {
//     console.log('Connection to the database established!');
// }).catch(error => {
//     console.log(error);
// });

import { createConnection } from 'typeorm';
// import { DataSource } from 'typeorm';
import {User, Tweet, Like} from '../entity'

export const DATABASE_CONNECTION = createConnection
// new DataSource
({
    type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '287693@Ata',
      database: 'google_oauth2_app',
    entities: [
        // User, Tweet, Like
        __dirname + '/../**/*.entity.{js,ts}'
    ],
    synchronize: true,
    "migrations": [
        "src/migration/**/*.ts"
      ],
      "subscribers": [
        "src/subscriber/**/*.ts"
      ],
    //   "cli": {
    //     "entitiesDir": "src/entity",
    //     "migrationsDir": "src/migration",
    //     "subscribersDir": "src/subscriber"
    //   }
});

// export const SECRET = "yoursecretkey";
