import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { ConnectUserDto, CreateUserDto, UpdateUserDto } from './dto';
import { UsersService } from './users.service';
import { UpdateResult } from 'typeorm';
import { User } from '../../entities';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async find(@Param('id') id: string): Promise<User> {
    return await this.usersService.find(id);
  }

  @Get()
  list(@Query() ids?: string[]): Promise<User[]> {
    if (ids.length > 0) {
      return this.usersService.list(ids);
    } else {
      return this.usersService.findAll();
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Post('/login')
  async connect(@Body() connectUserDto: ConnectUserDto): Promise<string> {
    return await this.usersService.connect(connectUserDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.usersService.update(id, updateUserDto).catch((err) => {
      throw new HttpException(err.message, 400);
    });
  }
}
