
import { createConnection, DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';
import {User, Tweet, Like} from '../entity'

export const DATABASE_CONNECTION = 
createConnection
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
})
export const AppDataSource = new DataSource({
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
// });
})
