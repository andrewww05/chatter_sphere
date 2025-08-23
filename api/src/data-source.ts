import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './features/user/entities/user.entity';
import { DataSourceOptions } from 'typeorm/browser';
import { UserProfile } from './features/user/entities/user-profile.entity';
import { CreateUserTables1755977403112 } from '../migrations/1755977403112-CreateUserTables';

export const dataSourceOptions: DataSourceOptions = {
    type: process.env.DB_TYPE as "mysql",
    host: process.env.DB_HOST as string,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 3306) : undefined,
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASE as string,
    migrationsTableName: '_migrations',
    migrationsRun: false,
    entities: [
        User,
        UserProfile
    ],
    migrations: [
        CreateUserTables1755977403112
    ],
};

const mySqlDataSource = new DataSource(dataSourceOptions);

export default mySqlDataSource;