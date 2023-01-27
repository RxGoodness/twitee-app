
// import { createConnection, DataSourceOptions } from 'typeorm';
// import { DataSource } from 'typeorm';
// import {User, Tweet, Like} from '../entity'

// export const DATABASE_CONNECTION = 
// createConnection
// ({
//     type: 'postgres',
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
// export const AppDataSource = new DataSource({
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: '287693@Ata',
//   database: 'google_oauth2_app',
// entities: [
//     // User, Tweet, Like
//     __dirname + '/../**/*.entity.{js,ts}'
// ],
// synchronize: true,
// "migrations": [
//     "src/migration/**/*.ts"
//   ],
//   "subscribers": [
//     "src/subscriber/**/*.ts"
//   ],
// //   "cli": {
// //     "entitiesDir": "src/entity",
// //     "migrationsDir": "src/migration",
// //     "subscribersDir": "src/subscriber"
// //   }
// // });
// })









import { createConnection, DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';
import {User, Tweet, Like} from '../entity'

export const DATABASE_CONNECTION = 
createConnection
({
  type: 'postgres',
  port: 5432,
    host: "localhost",
    username: "rxgoodness",
    password: "287693@Ata",
    database: "rxgoodness",
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
export const AppDataSource = new DataSource({
  type: 'postgres',
  port: 5432,
    host: "localhost",
    username: "rxgoodness",
    password: "287693@Ata",
    database: "rxgoodness",
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
// });
})
