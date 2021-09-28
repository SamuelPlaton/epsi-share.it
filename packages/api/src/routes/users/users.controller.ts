import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query, UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/entities';
import { ConnectUserDto, CreateUserDto, UpdateUserDto } from './dto';
import { UsersService } from './users.service';
import { UpdateResult } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  find(@Param('id') id: string): Promise<User> {
    return this.usersService.find(id).then((user) => user);
  }

  @Get()
  list(@Query() ids: string[]): Promise<User[]> {
    return this.usersService.list(ids);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.create(createUserDto);
  }

  @Post()
  connect(@Body() connectUserDto: ConnectUserDto): Promise<string> {
    const token = this.usersService
      .connect(connectUserDto)
      .then((user) => user.token)
      .catch(() => {
        throw new UnauthorizedException('Wrong credentials');
      });
    return token;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.usersService.update(id, updateUserDto);
  }
}
