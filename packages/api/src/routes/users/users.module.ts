import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../../entities';
import {JwtModule} from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({secret: 'hard!to-guess_secret'})],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {
}
