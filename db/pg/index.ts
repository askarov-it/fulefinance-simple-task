import { TypeOrmModuleOptions } from '@nestjs/typeorm'

const env = process.env;
const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: env.POSTGRES_HOST,
  port: +env.POSTGRES_PORT,
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  logging: env.ENV === 'development' ? true : false as boolean,
  synchronize: true,
  entities: [
    __dirname + '/../../**/src/**/*.entity{.ts,.js}',
  ],
  migrations: ['dist/db/pg/migrations/*{.ts,.js}'],
  migrationsRun: true,
}

export = config
