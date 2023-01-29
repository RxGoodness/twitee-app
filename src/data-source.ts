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

// import { createConnection, DataSourceOptions } from 'typeorm';
// import { DataSource } from 'typeorm';
// import {User, Tweet, Like} from './entity'

//     export const AppDataSource = new DataSource({
//       type: 'postgres',
//       port: 5432,
//         host: "dpg-cf4648mn6mpos6v3fn50-a",
//         username: "rxgoodness",
//         password: "OVNxBujUsoolINm34H5FuUN25T0JtQdW",
//         database: "rxgoodness",
//     entities: [
//         // User, Tweet, Like
//         __dirname + '/../**/*.entity.{js,ts}'
//     ],
//     synchronize: true,
//     "migrations": [
//         "src/migration/**/*.ts"
//       ],
//       "subscribers": [
//         "src/subscriber/**/*.ts"
//       ],
// })


// import { createConnection, DataSourceOptions } from 'typeorm';
// import { DataSource } from 'typeorm';
// import {User, Tweet, Like} from './entity'

//     export const AppDataSource = new DataSource({
//       type: 'postgres',
//       port: 5432,
//         host: "localhost",
//         username: "rxgoodness",
//         password: "287693@Ata",
//         database: "rxgoodness2",
//     entities: [
//         // User, Tweet, Like
//         __dirname + '/../**/*.entity.{js,ts}'
//     ],
//     synchronize: true,
//     "migrations": [
//         "src/migration/**/*.ts"
//       ],
//       "subscribers": [
//         "src/subscriber/**/*.ts"
//       ],
// })


// export const SECRET = "yoursecretkey";




import { createConnection, DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';
import {User, Tweet, Like} from './entity'

    export const AppDataSource = new DataSource({
      type: 'mysql',
  port: 3306,
    host: "sql.freedb.tech",
    username: "freedb_rxgoodness",
    password: "%Q#7cEVvef#cHxU",
    database: "freedb_rxgoodness",
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
})


export const SECRET = "yoursecretkey";
