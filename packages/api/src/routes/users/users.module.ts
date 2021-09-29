import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../../entities';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {JwtStrategy} from '../auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({secret: 'hard!to-guess_secret'})],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [
    PassportModule,
    JwtModule
  ]

})
export class UsersModule {
}
