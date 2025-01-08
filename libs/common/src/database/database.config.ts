import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'sqlite',
    database: './dev.db',
    synchronize: process.env.APP_ENV === 'local' ? true : false,
    logging: process.env.APP_ENV === 'local' ? true : false,
    autoLoadEntities: true,
  }),
);
