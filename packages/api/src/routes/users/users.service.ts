import {Injectable} from '@nestjs/common';
import {ConnectUserDto, CreateUserDto, UpdateUserDto} from './dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, UpdateResult} from 'typeorm';
import {User} from '../../entities';
import {JwtService} from '@nestjs/jwt';

const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>,
              private readonly jwtService: JwtService) {
  }

  find(id: string):
    Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  list(ids: string[]): Promise<User[]> {
    return this.usersRepository.findByIds(ids);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.identifier = createUserDto.identifier;
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.token = bcrypt.hashSync(createUserDto.password, 10);
    return this.usersRepository.save(user);
  }

  async connect(connectUserDto: ConnectUserDto): Promise<any> {
    const user = await this.usersRepository.findOne({
      identifier: connectUserDto.identifier
    });
    if (user) {
      if (await bcrypt.compare(connectUserDto.password, user.token)) {
        const authToken = await this.jwtService.signAsync({
          id: user.id
        })
        return {
          auth: authToken
        }
      }
    }
    throw new Error();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    if (updateUserDto.token) {
      throw new Error('Cannot update token');
    }
    if (updateUserDto.password) {
      updateUserDto.token = await bcrypt.hashSync(updateUserDto.password, 10);
      delete updateUserDto.password;
    }
    return await this.usersRepository.update(id, updateUserDto);
  }
}
