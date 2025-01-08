import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [],
})
export class DatabaseModule {
  static forRoot(models: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(models);
  }
}
