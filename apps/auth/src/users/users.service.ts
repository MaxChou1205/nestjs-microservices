import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './models/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.isUserExist(createUserDto.email))
      throw new UnprocessableEntityException('User already exists');
    const user = new User({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
    return this.usersRepository.create(user);
  }

  async isUserExist(email: string) {
    try {
      const user = await this.usersRepository.findOne({ email });
      return !!user;
    } catch (_err) {
      return false;
    }
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async getUser(userId: number) {
    const user = await this.usersRepository.findOne({ id: userId });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
