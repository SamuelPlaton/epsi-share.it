import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ConfirmConnectUserDto,
  ConnectUserDto,
  CreateUserDto,
  UpdateUserDto,
} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../../entities';
import { JwtService } from '@nestjs/jwt';
import { sendMail } from '../helpers/mailHandler';
import { connexionTemplate } from '../helpers/connexionTemplate';

const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  find(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  list(ids: string[]): Promise<User[]> {
    return this.usersRepository.findByIds(ids);
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    const user = new User();
    user.identifier = createUserDto.identifier;
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.token = bcrypt.hashSync(createUserDto.password, 10);
    const alreadyExistUser = await this.usersRepository.findOne({
      identifier: createUserDto.identifier,
    });
    if (alreadyExistUser) {
      throw new UnauthorizedException(
        'Account already exist for this identifier',
      );
    }
    const newlyCreatedUser = await this.usersRepository.save(user);
    const authToken = await this.jwtService.signAsync({
      id: newlyCreatedUser.id,
    });
    return {
      auth: authToken,
    };
  }

  async connect(connectUserDto: ConnectUserDto): Promise<any> {
    const user = await this.usersRepository.findOne({
      identifier: connectUserDto.identifier,
    });
    if (user) {
      if (await bcrypt.compare(connectUserDto.password, user.token)) {
        // setup a security, send a mail and send it to the user
        const securityCode = Math.floor(
          100000 + Math.random() * 900000,
        ).toString();
        await sendMail(
          user.email,
          'Confirmation Code',
          securityCode,
          connexionTemplate(connectUserDto.identifier, securityCode),
        ).catch((err) => {
          return err;
        });
        await this.usersRepository.save({
          ...user,
          securityCode: securityCode,
        });
        return true;
      } else {
        throw new UnauthorizedException('Wrong credentials');
      }
    }
    throw new UnauthorizedException('User not found');
  }

  async confirmConnexion(
    confirmConnectUserDto: ConfirmConnectUserDto,
  ): Promise<any> {
    const user = await this.usersRepository.findOne({
      identifier: confirmConnectUserDto.identifier,
      securityCode: confirmConnectUserDto.securityCode,
    });
    if (user) {
      await this.usersRepository.save({
        ...user,
        securityCode: null,
      });
      const authToken = await this.jwtService.signAsync({
        id: user.id,
      });
      return {
        auth: authToken,
      };
    }
    throw new UnauthorizedException('User not found');
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    if (updateUserDto.token) {
      throw new Error('Cannot update token');
    }
    if (updateUserDto.password) {
      updateUserDto.token = await bcrypt.hashSync(updateUserDto.password, 10);
      delete updateUserDto.password;
    }
    return await this.usersRepository.update(id, updateUserDto);
  }

  async findByPayload(payload: any): Promise<User> {
    if (!payload) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return await this.usersRepository.findOne({ id: payload.id });
  }
}
