import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import {ConnectUserDto, CreateUserDto, UpdateUserDto} from './dto';
import {UsersService} from './users.service';
import {UpdateResult} from 'typeorm';
import {User} from '../../entities';
import {AuthGuard} from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async find(@Param('id') id: string): Promise<User> {
    return await this.usersService.find(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Post('/login')
  async connect(@Body() connectUserDto: ConnectUserDto): Promise<string> {
    return await this.usersService
      .connect(connectUserDto)
      .catch(() => {
        throw new UnauthorizedException('Wrong credentials');
      });
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string,
         @Body() updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.usersService.update(id, updateUserDto).catch((err) => {
      throw new HttpException(err.message, 400);
    });
  }
}
