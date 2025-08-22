import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './features/user/entities/user.entity';
import { DataSourceOptions } from 'typeorm/browser';

export const dataSourceOptions: DataSourceOptions = {
    type: process.env.DB_TYPE as "mysql",
    host: process.env.DB_HOST as string,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 3306) : undefined,
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASE as string,
    migrations: ['./migrations/*{.ts,.js}'],
    migrationsTableName: '_migrations',
    migrationsRun: false,
    entities: [
        User
    ]
};

const mySqlDataSource = new DataSource(dataSourceOptions);

export default mySqlDataSource;