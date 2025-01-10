import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { User } from './models/user.entity';
import { DatabaseModule, LoggerModule } from '@app/common';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([User]), LoggerModule],
  controllers: [UsersController],
  providers: [UsersRepository, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
