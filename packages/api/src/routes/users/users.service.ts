import { Injectable } from '@nestjs/common';
import { User } from 'src/entities';
import {ConnectUserDto, CreateUserDto, UpdateUserDto} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  find(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  list(ids: string[]): Promise<User[]> {
    return this.usersRepository.findByIds(ids);
  }

  create(createUserDto: CreateUserDto): User {
    return this.usersRepository.create(createUserDto);
  }

  connect(connectUserDto: ConnectUserDto): Promise<User> {
    return this.usersRepository.findOne(connectUserDto);
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.usersRepository.update(id, updateUserDto);
  }
}
